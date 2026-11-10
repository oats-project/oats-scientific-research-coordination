import assert from "node:assert/strict";
import { chmodSync, cpSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";
import { fileURLToPath } from "node:url";

const REPO = resolve(fileURLToPath(new URL("..", import.meta.url)));
const OATS_URL = "https://github.com/oats-project/oats.git";
// The floor every capability's oats.json declares (the validator checks they agree).
const FLOOR = JSON.parse(readFileSync(join(REPO, "capabilities", "study-lead", "oats.json"), "utf8"))
  .compatibility.oats.replace(/^>=/, "");
// Kernel features the texts use with no fallback: checkpoints (schedule, wake-hold), what a
// waiter reads when one fires (instance-events, instance-git, status-liveness), retire plans,
// spawn previews with launch.declared/effective, launch configurations and --same-work, as in
// the engineering template the shared texts come from.
const FEATURES = ["schedule", "wake-hold", "instance-events", "instance-git", "status-liveness", "lifecycle-plans",
  "spawn-preview-2", "launch-config", "instance-same-work"];
const atLeast = (version, floor) => {
  const [a, b] = [version, floor].map((v) => v.split(/[.-]/).slice(0, 3).map(Number));
  for (let i = 0; i < 3; i++) if (a[i] !== b[i]) return a[i] > b[i];
  return true;
};

function run(cmd, args, options = {}) {
  const result = spawnSync(cmd, args, { encoding: "utf8", ...options });
  assert.equal(result.status, 0, `${cmd} ${args.join(" ")} failed\nstdout:\n${result.stdout}\nstderr:\n${result.stderr}`);
  return result;
}
function runJson(cmd, args, options = {}) {
  const result = run(cmd, args, options);
  const stdout = result.stdout.trim();
  const start = stdout.lastIndexOf("{\"schemaVersion\"");
  assert.notEqual(start, -1, `no OATS JSON envelope in stdout:\n${result.stdout}\nstderr:\n${result.stderr}`);
  const envelope = JSON.parse(stdout.slice(start));
  assert.equal(envelope.ok, true, envelope.error?.message || result.stderr);
  return envelope.result;
}
function makeRepo(dir, message = "commit") {
  run("git", ["init", "-q"], { cwd: dir });
  run("git", ["config", "user.email", "test@example.com"], { cwd: dir });
  run("git", ["config", "user.name", "Test"], { cwd: dir });
  run("git", ["add", "."], { cwd: dir });
  run("git", ["commit", "-q", "-m", message], { cwd: dir });
}
// A workspace whose member repository is a copy of the template, as ADAPTING.md says: its
// capabilities/ and souls/, composed `from: here`. No package is pinned.
function makeDeployment(t) {
  const tmp = mkdtempSync(join(tmpdir(), "oats-science-template-"));
  t.after(() => rmSync(tmp, { recursive: true, force: true }));

  const workspaceSrc = join(tmp, "workspace-src");
  mkdirSync(workspaceSrc);
  writeFileSync(join(workspaceSrc, "oats-workspace.yaml"), `schemaVersion: 2
name: science-template-probe
members:
  - file://${tmp}/member.git
defaults:
  knowledge: none
  messaging: none
  tasks: none
`);
  makeRepo(workspaceSrc, "workspace");
  const workspaceBare = join(tmp, "workspace.git");
  run("git", ["clone", "--bare", workspaceSrc, workspaceBare, "-q"]);

  const memberSrc = join(tmp, "member-src");
  mkdirSync(memberSrc);
  for (const dir of ["capabilities", "souls"]) cpSync(join(REPO, dir), join(memberSrc, dir), { recursive: true });
  // The copy's release record (ADAPTING.md, section 4): a plain file the kernel must ignore.
  writeFileSync(join(memberSrc, "capabilities", "TEMPLATE-RELEASE"), "template: oats-project/oats-scientific-research-coordination\nrelease: template-v2.0.0\n");
  writeFileSync(join(memberSrc, "oats-membership.yaml"), `schemaVersion: 2
workspace: file://${workspaceBare}
`);
  makeRepo(memberSrc, "member");
  run("git", ["clone", "--bare", memberSrc, join(tmp, "member.git"), "-q"]);

  const deploy = join(tmp, "deploy");
  mkdirSync(deploy);
  writeFileSync(join(deploy, "oats-local.yaml"), `schemaVersion: 2
workspace: file://${workspaceBare}
`);
    // Every soul here works in a directory; the clone is where OATS looks for the member.
  run("git", ["clone", "-q", join(tmp, "member.git"), join(deploy, "member")]);
  const bin = join(tmp, "bin");
  mkdirSync(bin);
    // Spawn previews refuse a harness whose binary is missing (E_HARNESS_UNAVAILABLE): pi is the
  // kernel's default harness, and no soul here declares another.
  for (const harness of ["pi"]) {
    const fake = join(bin, harness);
    writeFileSync(fake, `#!/usr/bin/env sh\necho fake ${harness} for spawn-preview tests >&2\n`);
    chmodSync(fake, 0o755);
  }
  return { deploy, env: { ...process.env, PATH: `${bin}:${process.env.PATH || ""}` } };
}
function kernelCli(t, label, ref) {
  if (process.env[`OATS_KERNEL_${label}`]) return process.env[`OATS_KERNEL_${label}`];
  const dir = join(mkdtempSync(join(tmpdir(), `oats-kernel-${label}-`)), "oats");
  t.after(() => rmSync(resolve(dir, ".."), { recursive: true, force: true }));
  run("git", ["clone", "--depth", "1", "--branch", ref, OATS_URL, dir, "-q"], { timeout: 120_000 });
  run("npm", ["install", "--omit=dev", "--silent"], { cwd: dir, timeout: 180_000 });
  return join(dir, "bin", "oats.mjs");
}
const sorted = (list) => [...list].sort();

async function checkKernel(t, label, ref) {
  const cli = kernelCli(t, label, ref);
  const version = JSON.parse(run(process.execPath, [cli, "version", "--json"]).stdout);
  if (ref === "main") {
    // main moves past each release; it must stay at or above the template's floor.
    assert.ok(atLeast(version.version, FLOOR), `${label} kernel version ${version.version} is below ${FLOOR}`);
  } else {
    assert.equal(version.version, ref.replace(/^v/, ""), `${label} kernel version ${version.version}`);
  }
  const missing = FEATURES.filter((f) => !(version.features || []).includes(f));
  assert.deepEqual(missing, [], `${label} kernel lacks features the texts rely on`);

  const { deploy, env } = makeDeployment(t);
  runJson(process.execPath, [cli, "sync", "--dir", deploy, "--json"], { timeout: 120_000, env });
  const preview = (soul) => runJson(process.execPath, [cli, "spawn", soul, "--dir", deploy, "--preview", "--json"], { timeout: 120_000, env });
  const modules = (p) => sorted(p.modules.map((m) => m.name));
  const skills = (p) => sorted(p.skills.map((s) => s.name));

  const dispatcher = preview("dispatcher");
  assert.deepEqual(modules(dispatcher), ["oats.dispatcher", "oats.landing-rules"]);
  assert.deepEqual(skills(dispatcher), ["dispatch"], "the dispatcher leads nothing: no expert or maintainer skills");

  const lead = preview("study-lead");
  assert.deepEqual(modules(lead), ["oats.landing-rules", "oats.study-lead"]);
  assert.deepEqual(skills(lead), ["across-people", "ask-a-person", "assemble-the-claim-package", "findings-and-blocks", "hand-off", "land-on-agreement", "land-the-claims", "plan-the-study", "send-a-helper", "write-the-protocol"]);

  // Every role composes the landing rules: they are the one home of the safety rules.
  const analyst = preview("analyst");
  assert.deepEqual(modules(analyst), ["oats.analyst", "oats.landing-rules"], "an analyst composes its own role and the landing rules");
  assert.deepEqual(skills(analyst), ["diagnose-before-fixing", "report-the-arm", "run-an-arm", "run-the-review-loop", "test-first"]);

  const reviewer = preview("study-reviewer");
  assert.deepEqual(modules(reviewer), ["oats.landing-rules", "oats.study-reviewer"], "a study reviewer composes its own role and the landing rules");
  assert.deepEqual(skills(reviewer), ["check-citations", "replicate", "review-for-leakage-and-selection", "review-methods"]);

  const steward = preview("record-steward");
  assert.deepEqual(modules(steward), ["oats.landing-rules", "oats.record-steward"], "the record steward composes its own role and the landing rules");
  assert.deepEqual(skills(steward), ["keep-the-records", "land-a-run-record", "lock-the-protocol"]);

  // The kernel reads each skill's description with its own YAML parser and gives null when the
  // frontmatter doesn't parse, as the harnesses would drop the skill.
  for (const capability of ["oats.dispatcher", "oats.study-lead", "oats.analyst", "oats.study-reviewer", "oats.record-steward", "oats.landing-rules"]) {
    const shown = runJson(process.execPath, [cli, "capabilities", "show", capability, "--dir", deploy, "--json"], { timeout: 120_000, env });
    const unparsed = (shown.skills || []).filter((s) => typeof s.description !== "string" || !s.description).map((s) => s.name);
    assert.deepEqual(unparsed, [], `${label}: ${capability} has skills whose frontmatter the kernel can't parse`);
  }

  // No soul names a model: the lead and the analyst pick their children's at spawn, or a copy
  // pins one.
  for (const [soul, p] of [["dispatcher", dispatcher], ["study-lead", lead], ["analyst", analyst], ["study-reviewer", reviewer], ["record-steward", steward]]) {
    assert.equal(p.launch.declared, null, `${soul} declares no launch preference`);
  }
}

test("the template's souls load in real OATS kernels (the floor and main)", { timeout: 420_000 }, async (t) => {
  await t.test(`OATS ${FLOOR}`, { timeout: 240_000 }, (tt) => checkKernel(tt, "FLOOR", `v${FLOOR}`));
  await t.test("OATS main", { timeout: 240_000 }, (tt) => checkKernel(tt, "MAIN", "main"));
});
