import assert from "node:assert/strict";
import { cpSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";
import { fileURLToPath } from "node:url";

const REPO = resolve(fileURLToPath(new URL("..", import.meta.url)));

function runValidator(cwd = REPO) {
  return spawnSync(process.execPath, [join(cwd, "scripts", "validate-template.mjs")], { cwd, encoding: "utf8" });
}

function fixture(t) {
  const dir = mkdtempSync(join(tmpdir(), "oats-science-validator-"));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  cpSync(REPO, dir, {
    recursive: true,
    filter: (src) => !src.includes(`${REPO}/.git`) && !src.includes(`${REPO}/node_modules`),
  });
  return dir;
}

function mutate(t, relativePath, fn) {
  const dir = fixture(t);
  const path = join(dir, relativePath);
  writeFileSync(path, fn(readFileSync(path, "utf8")));
  return runValidator(dir);
}

test("validator accepts the real template", () => {
  const result = runValidator();
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /^Validated the scientific research template at template-v2\.0\.0: 6 capabilities, 23 skills, 5 souls, 19 adapt markers/);
});

test("validator rejects capability manifest schema violations", (t) => {
  const result = mutate(t, "capabilities/analyst/oats.json", (text) => text.replace('"oats.analyst"', '"Analyst"'));
  assert.equal(result.status, 1);
  assert.match(result.stderr, /capabilities\/analyst\/oats\.json\/capability/);
});

test("validator rejects helperInjection and team targeting in capability manifests", (t) => {
  const result = mutate(t, "capabilities/analyst/oats.json", (text) => text.replace('"requires": []', '"team": "science",\n  "helperInjection": { "version": 1, "mode": "omit" },\n  "requires": []'));
  assert.equal(result.status, 1);
  assert.match(result.stderr, /helperInjection/);
  assert.match(result.stderr, /\.team/);
});

test("validator rejects skill frontmatter name mismatch and missing descriptions", (t) => {
  const result = mutate(t, "capabilities/analyst/skills/run-an-arm/SKILL.md", (text) => text.replace("name: run-an-arm", "name: other-name").replace(/description: .+\n/, ""));
  assert.equal(result.status, 1);
  assert.match(result.stderr, /frontmatter name must equal directory/);
  assert.match(result.stderr, /frontmatter must include a description/);
});

test("validator rejects duplicate skill names", (t) => {
  const dir = fixture(t);
  const target = join(dir, "capabilities/study-reviewer/skills/run-an-arm");
  mkdirSync(target, { recursive: true });
  writeFileSync(join(target, "SKILL.md"), readFileSync(join(dir, "capabilities/analyst/skills/run-an-arm/SKILL.md")));
  const manifest = join(dir, "capabilities/study-reviewer/oats.json");
  writeFileSync(manifest, readFileSync(manifest, "utf8").replace(/"skills": \[/, '"skills": [\n    "skills/run-an-arm",'));
  const result = runValidator(dir);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /duplicate skill name run-an-arm/);
});

test("validator rejects unknown slash skill references", (t) => {
  const result = mutate(t, "capabilities/analyst/injects/analyst.md", (text) => text.replace("/run-an-arm", "/missing-skill"));
  assert.equal(result.status, 1);
  assert.match(result.stderr, /\/missing-skill names no skill of this template/);
});

test("validator rejects a reference to an engineering skill this template doesn't carry", (t) => {
  const result = mutate(t, "capabilities/study-lead/skills/hand-off/SKILL.md", (text) => `${text}\nSee \`/coordinate-developers\`.\n`);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /\/coordinate-developers names no skill of this template/);
});

test("validator rejects an inject that doesn't name one of its capability's skills", (t) => {
  const result = mutate(t, "capabilities/study-lead/injects/study-lead.md", (text) => text.replaceAll("`/assemble-the-claim-package`", "the package skill"));
  assert.equal(result.status, 1);
  assert.match(result.stderr, /inject must name its skill \/assemble-the-claim-package/);
});

test("validator rejects bare skill names in code spans", (t) => {
  const result = mutate(t, "capabilities/analyst/injects/analyst.md", (text) => text.replace("`/run-an-arm`", "`run-an-arm`"));
  assert.equal(result.status, 1);
  assert.match(result.stderr, /must be written as \/run-an-arm/);
});

test("validator rejects invalid souls", (t) => {
  const result = mutate(t, "souls/study-reviewer/soul.yaml", (text) => text.replace("schemaVersion: 2", "schemaVersion: 1"));
  assert.equal(result.status, 1);
  assert.match(result.stderr, /soul\.yaml\/schemaVersion/);
});

test("validator rejects broken docs links", (t) => {
  const result = mutate(t, "README.md", (text) => text.replace("docs/how-the-work-flows.md", "docs/missing.md"));
  assert.equal(result.status, 1);
  assert.match(result.stderr, /broken internal link docs\/missing\.md/);
});

test("validator rejects template-local ids in docs that are not defined", (t) => {
  const result = mutate(t, "README.md", (text) => text.replaceAll("oats.study-lead", "oats.study-leed"));
  assert.equal(result.status, 1);
  assert.match(result.stderr, /template-local id oats\.study-leed is named in docs but not defined/);
});

test("validator rejects a skill that commands the messaging layer", (t) => {
  const result = mutate(t, "capabilities/analyst/skills/run-an-arm/SKILL.md", (text) => `${text}\nTell your lead with \`aw mail send\`.\n`);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /analyst\/skills\/run-an-arm\/SKILL\.md:\d+: commands the aweb CLI/);
});

test("validator rejects an inject that commands the knowledge layer", (t) => {
  const result = mutate(t, "capabilities/study-lead/injects/study-lead.md", (text) => `${text}\nYou are finished when \`oats okf status\` says so.\n`);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /study-lead\/injects\/study-lead\.md:\d+: commands the OKF layer/);
});

test("validator rejects a layer dependency in requires", (t) => {
  const result = mutate(t, "capabilities/analyst/oats.json", (text) => text.replace('"requires": []', '"requires": [{ "capability": "oats.aweb", "why": "messaging" }]'));
  assert.equal(result.status, 1);
  assert.match(result.stderr, /capabilities\/analyst\/oats\.json\/requires\/0/);
});

test("validator rejects an analyst whose report needs a messaging layer", (t) => {
  const result = mutate(t, "capabilities/analyst/injects/analyst.md", (text) => text.replace(/otherwise print it\s+as your final message/, "and wait for the reply"));
  assert.equal(result.status, 1);
  assert.match(result.stderr, /analyst\.md: the report must fall back to the analyst's own session/);
});

test("validator rejects a study reviewer whose report needs a messaging layer", (t) => {
  const result = mutate(t, "capabilities/study-reviewer/injects/study-reviewer.md", (text) => text.replace(/otherwise print it\s+as your final message/, "and wait for the reply"));
  assert.equal(result.status, 1);
  assert.match(result.stderr, /study-reviewer\.md: the report must fall back to the study-reviewer's own session/);
});

test("validator rejects a malformed adapt marker", (t) => {
  const result = mutate(t, "capabilities/landing-rules/injects/landing-rules.md", (text) => text.replace("<!-- adapt: ", "<!-- adapt "));
  assert.equal(result.status, 1);
  assert.match(result.stderr, /landing-rules\/injects\/landing-rules\.md:\d+: malformed adapt marker/);
});

test("validator rejects an adapt marker ADAPTING.md doesn't list", (t) => {
  const result = mutate(t, "capabilities/analyst/skills/run-an-arm/SKILL.md", (text) => `${text}\n<!-- adapt: Where do this organisation's analysts keep notes? -->\n`);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /run-an-arm\/SKILL\.md: adapt marker "Where do this organisation's analysts keep notes\?" is not listed in ADAPTING\.md/);
});

test("validator rejects ADAPTING.md listing a marker that is gone", (t) => {
  const result = mutate(t, "capabilities/landing-rules/injects/landing-rules.md", (text) => text.replace(/<!-- adapt: Where may agents run what they fetch[^\n]*\n/, ""));
  assert.equal(result.status, 1);
  assert.match(result.stderr, /ADAPTING\.md: lists "Where may agents run what they fetch, which hosts are shared, and which are read-only\?" for capabilities\/landing-rules\/injects\/landing-rules\.md, which has no such adapt marker/);
});

test("validator rejects an adapt marker outside a capability", (t) => {
  const result = mutate(t, "souls/analyst/AGENTS.md", (text) => `${text}\n<!-- adapt: Which data does it read? -->\n`);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /souls\/analyst\/AGENTS\.md:\d+: adapt markers belong in a capability's injects and skills/);
});

test("validator rejects a capability that doesn't record its template release", (t) => {
  const result = mutate(t, "capabilities/analyst/oats.json", (text) => text.replace(" Copied from the scientific research template, template-v2.0.0.", ""));
  assert.equal(result.status, 1);
  assert.match(result.stderr, /capabilities\/analyst\/oats\.json\.description: must end with "Copied from the scientific research template, template-v2\.0\.0\."/);
});

test("validator rejects a capability whose version isn't the template release", (t) => {
  const result = mutate(t, "capabilities/analyst/oats.json", (text) => text.replace('"version": "2.0.0"', '"version": "2.2.0"'));
  assert.equal(result.status, 1);
  assert.match(result.stderr, /capabilities\/analyst\/oats\.json\.version: must be the template release 2\.0\.0/);
});

test("validator rejects a soul composing a capability the template lacks", (t) => {
  const result = mutate(t, "souls/analyst/soul.yaml", (text) => text.replace("oats.analyst: { from: here }", "oats.analist: { from: here }"));
  assert.equal(result.status, 1);
  assert.match(result.stderr, /souls\/analyst\/soul\.yaml: from: here names oats\.analist, which is not a capability of this template/);
});

test("validator rejects a soul value YAML would not parse", (t) => {
  const result = mutate(t, "souls/study-reviewer/soul.yaml", (text) => text.replace(/^description: /m, "description: Fresh each time: "));
  assert.equal(result.status, 1);
  assert.match(result.stderr, /souls\/study-reviewer\/soul\.yaml:3: a plain YAML value can't contain ": "/);
});

test("validator rejects a skill description YAML would not parse", (t) => {
  const result = mutate(t, "capabilities/analyst/skills/run-an-arm/SKILL.md", (text) => text.replace(/^description: /m, "description: The analyst's method: "));
  assert.equal(result.status, 1);
  assert.match(result.stderr, /capabilities\/analyst\/skills\/run-an-arm\/SKILL\.md:3: a plain YAML value can't contain ": "/);
});

test("validator holds skill frontmatter to plain one-line values", (t) => {
  const file = "capabilities/analyst/skills/run-an-arm/SKILL.md";
  const lead = /^description: /m;
  const cases = [
    ['description: "', /SKILL\.md:3: a frontmatter value can't start with "/],
    ["description: {text: ", /SKILL\.md:3: a frontmatter value can't start with \{/],
    ["description: '", /SKILL\.md:3: a frontmatter value can't start with '/],
    ["description: >\n  ", /SKILL\.md:3: a frontmatter value can't start with >/],
    ["description: Arm #1 ", /SKILL\.md:3: a plain YAML value can't contain " #"/],
    ["description:", /SKILL\.md:3: a frontmatter line must be `key: value` on one line, with a space after the colon/],
    ["broken\ndescription: ", /SKILL\.md:3: a frontmatter line must be `key: value` on one line/],
    ["name: other\ndescription: ", /SKILL\.md:3: frontmatter key name appears twice/],
    ["description: 1. ", /SKILL\.md:3: a frontmatter value must read as text/],
  ];
  for (const [replacement, message] of cases) {
    const result = mutate(t, file, (text) => text.replace(lead, replacement));
    assert.equal(result.status, 1, replacement);
    assert.match(result.stderr, message, replacement);
  }
});

test("validator rejects a skill reference a composing soul can't load", (t) => {
  const result = mutate(t, "capabilities/study-lead/injects/study-lead.md", (text) => `${text}\nSee \`/replicate\`.\n`);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /study-lead\.md: skill reference \/replicate is not a skill every soul composing oats\.study-lead has \(study-lead\)/);
});

test("validator rejects a forge CLI command in a skill", (t) => {
  const result = mutate(t, "capabilities/record-steward/skills/land-a-run-record/SKILL.md", (text) => `${text}\nRun \`gh pr merge 1\`.\n`);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /land-a-run-record\/SKILL\.md:\d+: commands the GitHub CLI/);
});

test("validator reads a skill's references too", (t) => {
  const dir = fixture(t);
  const references = join(dir, "capabilities/study-lead/skills/land-the-claims/references");
  mkdirSync(references, { recursive: true });
  writeFileSync(join(references, "publishing.md"), "Publish it with `gh release create`, then load `/land-your-prs`.\n");
  const result = runValidator(dir);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /publishing\.md: skill reference \/land-your-prs names no skill of this template/);
  assert.match(result.stderr, /publishing\.md:\d+: commands the GitHub CLI/);
});

test("validator rejects docs and souls naming a skill or soul the template lacks", (t) => {
  const dir = fixture(t);
  const append = (rel, extra) => writeFileSync(join(dir, rel), readFileSync(join(dir, rel), "utf8") + extra);
  append("souls/analyst/AGENTS.md", "\nLoad `/land-your-prs` first.\n");
  append("README.md", "\nThen load `/land-your-prs`.\n");
  append("ADAPTING.md", "\nDrop the skill `find-the-maintainer`.\n");
  const roster = join(dir, "souls/dispatcher/AGENTS.md");
  writeFileSync(roster, readFileSync(roster, "utf8").replace("- `study-lead`:", "- `market-lead`:"));
  const result = runValidator(dir);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /souls\/analyst\/AGENTS\.md: skill reference \/land-your-prs names no skill/);
  assert.match(result.stderr, /README\.md: skill reference \/land-your-prs names no skill/);
  assert.match(result.stderr, /ADAPTING\.md: names the skill find-the-maintainer, which this template lacks/);
  assert.match(result.stderr, /souls\/dispatcher\/AGENTS\.md: lists the soul market-lead, which this template lacks/);
});

test("validator rejects an adapt marker in a soul's yaml", (t) => {
  const result = mutate(t, "souls/analyst/soul.yaml", (text) => `${text}# <!-- adapt: Which data does it read? -->\n`);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /souls\/analyst\/soul\.yaml:\d+: adapt markers belong in a capability's injects and skills/);
});

test("validator rejects a skill directory its oats.json doesn't list", (t) => {
  const result = mutate(t, "capabilities/study-lead/oats.json", (text) => text.replace('    "skills/assemble-the-claim-package",\n', ""));
  assert.equal(result.status, 1);
  assert.match(result.stderr, /capabilities\/study-lead\/skills\/assemble-the-claim-package: skill directory is not listed/);
});

test("validator rejects a text that names a harness", (t) => {
  const result = mutate(t, "capabilities/study-lead/skills/send-a-helper/SKILL.md", (text) => `${text}\nIn Codex, use its own subagents.\n`);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /send-a-helper\/SKILL\.md:\d+: names a harness \(Codex\)/);
});

const evidenceHeading = "## The evidence the design rests on";

test("validator rejects a text that names a model", (t) => {
  // Outside the evidence section, the docs name no model either.
  const result = mutate(t, "docs/how-the-work-flows.md", (text) => {
    assert.ok(text.includes(evidenceHeading), "the doc has its evidence section");
    return text.replace(evidenceHeading, `The replicator ran on Gemini.\n\n${evidenceHeading}`);
  });
  assert.equal(result.status, 1);
  assert.match(result.stderr, /docs\/how-the-work-flows\.md:\d+: names a model \(Gemini\)/);
});

test("validator lets the docs' evidence section name the models its findings were measured on", (t) => {
  // The cited findings are about particular models and name them as their sources do.
  const inside = mutate(t, "docs/how-the-work-flows.md", (text) => text.replace(evidenceHeading, `${evidenceHeading}\n\nMeasured on Claude Code with Opus 4.7, and on Codex with GPT-5.5.\n`));
  assert.equal(inside.status, 0, inside.stderr);
  // The exemption is that one section of that one doc: the same heading elsewhere earns none.
  const elsewhere = mutate(t, "README.md", (text) => `${text}\n${evidenceHeading}\n\nMeasured on Opus 4.7.\n`);
  assert.equal(elsewhere.status, 1);
  assert.match(elsewhere.stderr, /README\.md:\d+: names a model \(Opus\)/);
});

test("validator rejects a soul that declares a launch", (t) => {
  const result = mutate(t, "souls/study-reviewer/soul.yaml", (text) => `${text}launch: { harness: codex }\n`);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /souls\/study-reviewer\/soul\.yaml: the template's souls declare no launch/);
});

test("validator rejects a personal path", (t) => {
  const result = mutate(t, "ADAPTING.md", (text) => `${text}\nThe copy lives in /home/someone/workspace.\n`);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /ADAPTING\.md:\d+: names a personal path/);
});
