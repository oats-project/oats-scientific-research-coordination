#!/usr/bin/env node
import { existsSync, lstatSync, readdirSync, readFileSync, realpathSync, statSync } from "node:fs";
import { basename, dirname, extname, isAbsolute, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const capabilitiesRoot = join(repoRoot, "capabilities");
const soulsRoot = join(repoRoot, "souls");
const errors = [];
const report = (at, message) => errors.push(`${at}: ${message}`);

const pointerKey = (key) => key.replace(/~/g, "~0").replace(/\//g, "~1");
const isObject = (value) => value !== null && typeof value === "object" && !Array.isArray(value);
const typeOf = (value) => value === null ? "null" : Array.isArray(value) ? "array" : Number.isInteger(value) ? "integer" : typeof value;
const show = (value) => value === undefined ? "undefined" : JSON.stringify(value);
const regexCache = new Map();
const regexOf = (pattern) => regexCache.get(pattern) ?? regexCache.set(pattern, new RegExp(pattern, "u")).get(pattern);

function readJson(path, label = relative(repoRoot, path)) {
  try { return JSON.parse(readFileSync(path, "utf8")); }
  catch (error) { report(label, `invalid JSON (${error.message})`); return undefined; }
}

function deref(root, ref) {
  if (!ref.startsWith("#/")) throw new TypeError(`only local $ref is supported: ${ref}`);
  let node = root;
  for (const part of ref.slice(2).split("/")) node = node?.[part.replace(/~1/g, "/").replace(/~0/g, "~")];
  if (node === undefined) throw new TypeError(`unresolvable $ref ${ref}`);
  return node;
}
function typeMatches(value, type) {
  const actual = typeOf(value);
  if (type === "number") return actual === "number" || actual === "integer";
  return actual === type;
}
function validateAgainst(schema, value, { root = schema, path = "" } = {}) {
  const problems = [];
  const push = (p, message) => problems.push({ path: p, message });
  const check = (s, v, p) => {
    if (!s || typeof s !== "object") return;
    if (s.$ref) s = { ...deref(root, s.$ref), ...Object.fromEntries(Object.entries(s).filter(([k]) => k !== "$ref" && k !== "description")) };
    if (s.type !== undefined) {
      const types = Array.isArray(s.type) ? s.type : [s.type];
      if (!types.some((t) => typeMatches(v, t))) { push(p, `expected ${types.join(" | ")}, got ${typeOf(v)}`); return; }
    }
    if (s.const !== undefined && JSON.stringify(v) !== JSON.stringify(s.const)) { push(p, `expected ${show(s.const)}, got ${show(v)}`); return; }
    if (s.enum && !s.enum.some((e) => JSON.stringify(e) === JSON.stringify(v))) { push(p, `expected one of ${s.enum.map(show).join(", ")}, got ${show(v)}`); return; }
    if (s.anyOf || s.oneOf) {
      const branches = s.anyOf || s.oneOf;
      const results = branches.map((b) => validateAgainst(b, v, { root, path: p }));
      const passing = results.filter((r) => r.length === 0).length;
      if (passing === 0) { problems.push(...(results.find((r) => r.length) || [{ path: p, message: `matched no alternative` }])); return; }
      if (s.oneOf && passing > 1) { push(p, `matches ${passing} alternatives, expected exactly one`); return; }
    }
    if (s.not && validateAgainst(s.not, v, { root, path: p }).length === 0) { push(p, `must not match forbidden schema`); return; }
    if (typeof v === "string") {
      if (s.minLength !== undefined && v.length < s.minLength) push(p, `must be at least ${s.minLength} character(s)`);
      if (s.maxLength !== undefined && v.length > s.maxLength) push(p, `must be at most ${s.maxLength} character(s)`);
      if (s.pattern && !regexOf(s.pattern).test(v)) push(p, `${show(v)} does not match ${s.pattern}`);
    } else if (Array.isArray(v)) {
      if (s.minItems !== undefined && v.length < s.minItems) push(p, `must have at least ${s.minItems} item(s)`);
      if (s.maxItems !== undefined && v.length > s.maxItems) push(p, `must have at most ${s.maxItems} item(s)`);
      if (s.uniqueItems) {
        const seen = new Map();
        v.forEach((item, i) => { const k = JSON.stringify(item); if (seen.has(k)) push(`${p}/${i}`, `duplicates item ${seen.get(k)}`); else seen.set(k, i); });
      }
      if (s.items) v.forEach((item, i) => check(s.items, item, `${p}/${i}`));
    } else if (isObject(v)) {
      const keys = Object.keys(v);
      if (s.minProperties !== undefined && keys.length < s.minProperties) push(p, `must have at least ${s.minProperties} propert${s.minProperties === 1 ? "y" : "ies"}`);
      if (s.maxProperties !== undefined && keys.length > s.maxProperties) push(p, `must have at most ${s.maxProperties} propert${s.maxProperties === 1 ? "y" : "ies"}`);
      for (const req of s.required || []) if (!Object.hasOwn(v, req)) push(p, `missing required property ${show(req)}`);
      for (const key of keys) {
        const kp = `${p}/${pointerKey(key)}`;
        if (s.propertyNames) for (const pr of validateAgainst(s.propertyNames, key, { root, path: kp })) push(kp, `invalid key ${show(key)}: ${pr.message}`);
        let matched = false;
        if (s.properties && Object.hasOwn(s.properties, key)) { matched = true; check(s.properties[key], v[key], kp); }
        if (s.patternProperties) for (const [pat, sub] of Object.entries(s.patternProperties)) if (regexOf(pat).test(key)) { matched = true; check(sub, v[key], kp); }
        if (!matched) {
          if (s.additionalProperties === false) push(kp, `unknown property ${show(key)}`);
          else if (isObject(s.additionalProperties)) check(s.additionalProperties, v[key], kp);
        }
      }
    }
  };
  check(schema, value, path);
  return problems;
}

function safeResource(root, base, candidate, at, kind = "path") {
  if (typeof candidate !== "string" || !candidate.trim()) { report(at, `${kind} must be a non-empty string`); return null; }
  if (isAbsolute(candidate) || candidate.split(/[\\/]+/).includes("..")) { report(at, `${kind} must be relative and may not contain '..'`); return null; }
  const target = resolve(base, candidate);
  if (!existsSync(target)) { report(at, `${kind} does not exist: ${candidate}`); return null; }
  const realRoot = realpathSync(root);
  const realTarget = realpathSync(target);
  if (realTarget !== realRoot && !realTarget.startsWith(realRoot + sep)) report(at, `${kind} escapes ${relative(repoRoot, root) || "."} after symlink resolution`);
  return target;
}

function commandEntrypoint(spec) {
  const command = typeof spec === "string" ? spec : (spec && typeof spec === "object" ? spec.command : undefined);
  return typeof command === "string" ? command.trim().split(/\s+/)[0] : command;
}

// Split a flow mapping's body at its own commas, never at one inside a nested {} or [] or a
// quoted string.
function splitTopLevel(inner) {
  const parts = [];
  let depth = 0, quote = null, start = 0;
  for (let i = 0; i < inner.length; i++) {
    const c = inner[i];
    if (quote) { if (c === quote) quote = null; continue; }
    if (c === '"' || c === "'") quote = c;
    else if (c === "{" || c === "[") depth++;
    else if (c === "}" || c === "]") depth--;
    else if (c === "," && depth === 0) { parts.push(inner.slice(start, i).trim()); start = i + 1; }
  }
  parts.push(inner.slice(start).trim());
  return parts;
}
function parseInlineValue(raw) {
  const s = raw.trim();
  if (s === "") return {};
  if (s === "none") return "none";
  if (s === "true") return true;
  if (s === "false") return false;
  if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) return s.slice(1, -1);
  if (s.startsWith("{") && s.endsWith("}")) {
    const obj = {};
    const inner = s.slice(1, -1).trim();
    if (!inner) return obj;
    for (const part of splitTopLevel(inner)) {
      const idx = part.indexOf(":");
      if (idx < 0) return s;
      obj[part.slice(0, idx).trim()] = parseInlineValue(part.slice(idx + 1));
    }
    return obj;
  }
  if (/^-?(?:0|[1-9][0-9]*)$/.test(s)) return Number(s);
  return s;
}
function parseYamlSubset(text, label) {
  const root = {};
  const stack = [{ indent: -1, obj: root }];
  for (const [index, raw] of text.split(/\r?\n/).entries()) {
    if (!raw.trim() || raw.trimStart().startsWith("#")) continue;
    const indent = raw.length - raw.trimStart().length;
    const line = raw.trim();
    const colon = line.indexOf(":");
    if (colon < 0) { report(`${label}:${index + 1}`, "unsupported YAML line"); continue; }
    const key = line.slice(0, colon).trim();
    const value = line.slice(colon + 1).replace(/\s+#.*$/, "").trim();
    // A plain scalar can't hold ": " in YAML; the kernel's parser would reject the soul.
    if (!/^["'{]/.test(value) && /:(\s|$)/.test(value)) report(`${label}:${index + 1}`, "a plain YAML value can't contain \": \"; quote it or reword it");
    while (stack.length && indent <= stack[stack.length - 1].indent) stack.pop();
    const parent = stack[stack.length - 1]?.obj;
    if (!parent || !isObject(parent)) { report(`${label}:${index + 1}`, "invalid indentation"); continue; }
    parent[key] = value === "" ? {} : parseInlineValue(value);
    if (value === "") stack.push({ indent, obj: parent[key] });
  }
  return root;
}

function parseSkillFrontmatter(file) {
  const text = readFileSync(file, "utf8");
  if (!text.startsWith("---\n")) return { text, frontmatter: null };
  const end = text.indexOf("\n---", 4);
  if (end < 0) return { text, frontmatter: null };
  const fm = {};
  // The kernel parses this with a real YAML parser and drops a skill whose frontmatter fails.
  // So every line is held to a subset that always parses as a map of text: `key: value` on one
  // line (a space after the colon), each key once, and each value a plain scalar (no quotes, no
  // flow or block collection) starting with no YAML indicator, with no ": " or " #" inside,
  // and neither a word YAML reads as a boolean or null nor one that starts with a number. Any
  // other line fails.
  for (const [index, raw] of text.slice(4, end).split(/\r?\n/).entries()) {
    if (!raw.trim()) continue;
    const at = `${relative(repoRoot, file)}:${index + 2}`;
    const line = /^([A-Za-z][A-Za-z0-9_-]*): +(.*?)\s*$/.exec(raw);
    if (!line) { report(at, "a frontmatter line must be `key: value` on one line, with a space after the colon"); continue; }
    const key = line[1], value = line[2].trim();
    if (Object.hasOwn(fm, key)) report(at, `frontmatter key ${key} appears twice`);
    else if (value === "") report(at, "a frontmatter value must be on the same line as its key");
    else if (/^[-?:,[\]{}#&*!|>'"%@`]/.test(value)) report(at, `a frontmatter value can't start with ${value[0]}: write it as plain text`);
    else if (/:(\s|$)/.test(value)) report(at, "a plain YAML value can't contain \": \"; reword it");
    else if (/\s#/.test(value)) report(at, "a plain YAML value can't contain \" #\" (YAML reads a comment); reword it");
    else if (/^(true|false|yes|no|on|off|null|~|[-+]?\.(inf|nan))$/i.test(value) || /^[-+.]?\d/.test(value)) report(at, "a frontmatter value must read as text: not a boolean or null, and not starting with a number");
    if (!Object.hasOwn(fm, key)) fm[key] = value;
  }
  return { text, frontmatter: fm };
}
function walk(dir, predicate = () => true) {
  const out = [];
  if (!existsSync(dir)) return out;
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    const st = lstatSync(path);
    if (st.isDirectory()) out.push(...walk(path, predicate));
    else if (predicate(path)) out.push(path);
  }
  return out;
}

const capabilitySchema = readJson(join(repoRoot, "schemas", "capability-manifest.schema.json"));
const soulSchema = readJson(join(repoRoot, "schemas", "soul.schema.json"));
const dirsOf = (root) => existsSync(root) ? readdirSync(root).filter((name) => lstatSync(join(root, name)).isDirectory()).sort() : [];

// The template release: the latest `## template-v<version>` heading in CHANGELOG.md. Every
// capability records it, so a copy can tell which release it started from.
const changelogPath = join(repoRoot, "CHANGELOG.md");
const releaseMatch = existsSync(changelogPath) ? readFileSync(changelogPath, "utf8").match(/^## template-v(\d+\.\d+\.\d+)\b/m) : null;
if (!releaseMatch) report("CHANGELOG.md", "needs a `## template-v<version>` heading for the latest template release");
const templateVersion = releaseMatch?.[1];
const releaseLine = templateVersion ? `Copied from the scientific research template, template-v${templateVersion}.` : undefined;
for (const file of ["README.md", "ADAPTING.md"]) if (!existsSync(join(repoRoot, file))) report(file, "missing");

const rawFiles = walk(repoRoot, (p) => !p.includes(`${sep}.git${sep}`) && !p.includes(`${sep}node_modules${sep}`));
for (const file of rawFiles) {
  const rel = relative(repoRoot, file);
  const text = readFileSync(file, "utf8");
  if (/^\s*team\s*:/m.test(text)) report(rel, "team: is not allowed in this template (team model v2)");
}

const capabilities = [];
const skillNames = new Map();
const capabilityIds = new Set();
const floors = new Set();
if (!existsSync(capabilitiesRoot)) report("capabilities", "missing");
for (const name of dirsOf(capabilitiesRoot)) {
  const capabilityRoot = join(capabilitiesRoot, name);
  const relRoot = relative(repoRoot, capabilityRoot);
  const manifestPath = join(capabilityRoot, "oats.json");
  if (!existsSync(manifestPath)) { report(relRoot, "capability directory has no oats.json"); continue; }
  const manifest = readJson(manifestPath);
  if (!manifest) continue;
  const relManifest = relative(repoRoot, manifestPath);
  const entry = { manifest, root: capabilityRoot, skills: [] };
  capabilities.push(entry);
  if (manifest.capability) {
    if (capabilityIds.has(manifest.capability)) report(relManifest, `duplicate capability id ${manifest.capability}`);
    capabilityIds.add(manifest.capability);
  }
  if (capabilitySchema) for (const problem of validateAgainst(capabilitySchema, manifest)) report(`${relManifest}${problem.path}`, problem.message);
  for (const forbidden of ["team", "helperInjection", "global", "agent-types", "souls"]) if (Object.hasOwn(manifest, forbidden)) report(`${relManifest}.${forbidden}`, "not allowed in a capability manifest");
  if (templateVersion && manifest.version !== templateVersion) report(`${relManifest}.version`, `must be the template release ${templateVersion}`);
  if (releaseLine && !(typeof manifest.description === "string" && manifest.description.trimEnd().endsWith(releaseLine))) report(`${relManifest}.description`, `must end with "${releaseLine}"`);
  floors.add(manifest.compatibility?.oats);
  const ownSkills = [];
  for (const [resourceIndex, resource] of (manifest.skills || []).entries()) {
    const resourcePath = safeResource(capabilityRoot, capabilityRoot, resource, `${relManifest}.skills[${resourceIndex}]`, "skill path");
    if (!resourcePath) continue;
    const skillFile = statSync(resourcePath).isDirectory() ? join(resourcePath, "SKILL.md") : resourcePath;
    if (!existsSync(skillFile)) { report(relative(repoRoot, resourcePath), "skill path has no SKILL.md"); continue; }
    const dirName = basename(dirname(skillFile));
    ownSkills.push(dirName);
    entry.skills.push(dirName);
    const { frontmatter } = parseSkillFrontmatter(skillFile);
    if (!frontmatter) { report(relative(repoRoot, skillFile), "missing YAML frontmatter"); continue; }
    if (frontmatter.name !== dirName) report(relative(repoRoot, skillFile), `frontmatter name must equal directory (${dirName})`);
    if (!frontmatter.description) report(relative(repoRoot, skillFile), "frontmatter must include a description");
    if (skillNames.has(dirName)) report(relative(repoRoot, skillFile), `duplicate skill name ${dirName} (also ${skillNames.get(dirName)})`);
    else skillNames.set(dirName, relative(repoRoot, skillFile));
  }
  for (const skillDir of dirsOf(join(capabilityRoot, "skills"))) if (!ownSkills.includes(skillDir)) report(relative(repoRoot, join(capabilityRoot, "skills", skillDir)), "skill directory is not listed in its capability's oats.json");
  if (manifest.inject) {
    const injectPath = safeResource(capabilityRoot, capabilityRoot, manifest.inject, `${relManifest}.inject`, "injection path");
    // The always-loaded inject is what makes an agent load its skills: it names every one.
    if (injectPath && existsSync(injectPath)) {
      const injectText = readFileSync(injectPath, "utf8");
      for (const skill of ownSkills) if (!injectText.includes(`\`/${skill}\``)) report(relative(repoRoot, injectPath), `inject must name its skill /${skill}`);
    }
  }
  for (const [cmd, command] of Object.entries(manifest.commands || {})) safeResource(capabilityRoot, capabilityRoot, commandEntrypoint(command), `${relManifest}.commands.${cmd}`, "command entrypoint");
  for (const [event, hook] of Object.entries(manifest.hooks || {})) safeResource(capabilityRoot, capabilityRoot, commandEntrypoint(hook), `${relManifest}.hooks.${event}`, "hook entrypoint");
}
if (floors.size > 1) report("capabilities", `every capability must name the same compatibility floor (found ${[...floors].map(show).join(", ")})`);

const soulNames = new Set();
const soulCapabilities = new Map(); // soul name -> the template capability ids it composes
if (!existsSync(soulsRoot)) report("souls", "missing");
for (const name of dirsOf(soulsRoot)) {
  const soulRoot = join(soulsRoot, name);
  const rel = relative(repoRoot, soulRoot);
  const soulYaml = join(soulRoot, "soul.yaml");
  const agents = join(soulRoot, "AGENTS.md");
  if (!existsSync(soulYaml)) { report(rel, "missing soul.yaml"); continue; }
  if (!existsSync(agents)) report(rel, "missing AGENTS.md");
  const parsed = parseYamlSubset(readFileSync(soulYaml, "utf8"), relative(repoRoot, soulYaml));
  if (soulSchema) for (const problem of validateAgainst(soulSchema, parsed)) report(`${relative(repoRoot, soulYaml)}${problem.path}`, problem.message);
    if (parsed.name !== name) report(relative(repoRoot, soulYaml), "soul name must equal its directory name");
  // The lead picks its children's models at spawn; a copy pins its own (ADAPTING.md, section 3).
  if (Object.hasOwn(parsed, "launch")) report(relative(repoRoot, soulYaml), "the template's souls declare no launch; a copy pins its own models");
  soulNames.add(parsed.name);
  const composed = new Set();
  for (const [capability, choice] of Object.entries(parsed.capabilities || {})) {
    if (choice !== "off" && choice?.from === "here" && !capabilityIds.has(capability)) report(relative(repoRoot, soulYaml), `from: here names ${capability}, which is not a capability of this template`);
    if (choice !== "off" && capabilityIds.has(capability)) composed.add(capability);
  }
  soulCapabilities.set(parsed.name, composed);
}

const knownSkills = new Set(skillNames.keys());
// A skill a text names must be loadable by every soul that composes the text's capability: a
// soul has only the skills of the capabilities it composes.
const skillsOfCapability = new Map(capabilities.map(({ manifest, skills }) => [manifest.capability, skills]));
function reachableSkills(capabilityId) {
  const souls = [...soulCapabilities].filter(([, composed]) => composed.has(capabilityId));
  if (!souls.length) return { skills: knownSkills, souls: [] };
  const sets = souls.map(([, composed]) => new Set([...composed].flatMap((id) => skillsOfCapability.get(id) || [])));
  return { skills: new Set([...sets[0]].filter((skill) => sets.every((set) => set.has(skill)))), souls: souls.map(([name]) => name) };
}
// These capabilities compose with any knowledge or messaging layer, or none, so their injects and
// skills issue no layer's command (and the schema keeps layers out of `requires`). This is the
// bounded rule oats-project/oats checks on its mirrors, applied before release. Neutrality as a whole
// is not machine-decidable: changes to these surfaces still need review.
const layerCommands = [[/\baw\b/i, "the aweb CLI"], [/\boats okf\b/i, "the OKF layer"]];
// The texts are neutral about the forge too: they say what the forge does, never its CLI.
const forgeCommands = [[/\bgh (?:pr|issue|api|run|repo|release|workflow)\b/, "the GitHub CLI"], [/\bglab\b/, "the GitLab CLI"]];
for (const { manifest, root } of capabilities) {
  const reachable = reachableSkills(manifest.capability);
  const markdown = [];
  if (manifest.inject) markdown.push(join(root, manifest.inject));
  for (const resource of manifest.skills || []) {
    const path = join(root, resource);
    // A skill is its SKILL.md and every Markdown file beside it (its references, say).
    if (existsSync(path)) markdown.push(...(statSync(path).isDirectory() ? walk(path, (p) => extname(p) === ".md") : [path]));
  }
  for (const file of markdown) {
    if (!existsSync(file)) continue;
    const rel = relative(repoRoot, file);
    const text = readFileSync(file, "utf8");
    for (const match of text.matchAll(/(?<!`)`([^`\n]+)`(?!`)/g)) {
      const code = match[1].trim();
      if (code.startsWith("/")) {
        if (!/^\/[a-z0-9][a-z0-9-]*$/.test(code)) report(rel, `skill reference ${show(code)} must be /<skill-name>`);
        else if (!knownSkills.has(code.slice(1))) report(rel, `skill reference ${code} names no skill of this template`);
        else if (!reachable.skills.has(code.slice(1))) report(rel, `skill reference ${code} is not a skill every soul composing ${manifest.capability} has (${reachable.souls.join(", ")})`);
      } else if (knownSkills.has(code)) {
        report(rel, `skill reference ${show(code)} must be written as /${code}`);
      }
    }
    for (const [index, line] of text.split("\n").entries()) {
      for (const [pattern, layer] of layerCommands) {
        if (pattern.test(line)) report(`${rel}:${index + 1}`, `commands ${layer}; say what the selected knowledge or messaging layer requires instead`);
      }
      for (const [pattern, cli] of forgeCommands) {
        if (pattern.test(line)) report(`${rel}:${index + 1}`, `commands ${cli}; say what the forge does instead`);
      }
    }
  }
}
// A run's or a review's report must still reach whoever started it when no messaging layer is
// active.
for (const [capability, inject] of [["analyst", "analyst.md"], ["study-reviewer", "study-reviewer.md"]]) {
  const path = join(capabilitiesRoot, capability, "injects", inject);
  if (!/messaging\s+layer if one is active[\s\S]*otherwise print it\s+as your final message/.test(existsSync(path) ? readFileSync(path, "utf8") : "")) {
    report(relative(repoRoot, path), `the report must fall back to the ${capability}'s own session when no messaging layer is active`);
  }
}

// Adapt markers: one form, `<!-- adapt: <the question to ask> -->`, alone on its line, in a
// capability's Markdown; ADAPTING.md lists each one under its file, and lists no other.
const markerForm = /^\s*<!-- adapt: (\S[^<>]*\?) -->\s*$/;
const markerLike = /<!--\s*adapt\b|\badapt\s*:.*-->/i;
const markers = [];
for (const file of walk(capabilitiesRoot, (p) => extname(p) === ".md")) {
  const rel = relative(repoRoot, file);
  for (const [index, line] of readFileSync(file, "utf8").split("\n").entries()) {
    if (!markerLike.test(line)) continue;
    const match = line.match(markerForm);
    if (!match) report(`${rel}:${index + 1}`, "malformed adapt marker: write `<!-- adapt: <the question to ask>? -->` alone on its line");
    else markers.push({ rel, question: match[1].trim() });
  }
}
// Anywhere else (a soul, a manifest, the README) a marker is never adapted or counted.
for (const file of [...walk(soulsRoot), ...walk(capabilitiesRoot, (p) => extname(p) !== ".md"), join(repoRoot, "README.md")]) {
  if (!existsSync(file)) continue;
  for (const [index, line] of readFileSync(file, "utf8").split("\n").entries()) {
    // Naming the marker's form in a code span is prose, not a marker.
    if (markerLike.test(line.replace(/`[^`]*`/g, ""))) report(`${relative(repoRoot, file)}:${index + 1}`, "adapt markers belong in a capability's injects and skills");
  }
}
const adaptingPath = join(repoRoot, "ADAPTING.md");
if (existsSync(adaptingPath)) {
  const listed = [];
  let inPoints = false;
  let current;
  for (const line of readFileSync(adaptingPath, "utf8").split("\n")) {
    if (/^## /.test(line)) { inPoints = /^## \d*\.?\s*Adaptation points\b/.test(line); current = undefined; continue; }
    if (!inPoints) continue;
    const heading = line.match(/^### `([^`]+)`/);
    if (heading) { current = heading[1]; continue; }
    const item = line.match(/^- \*\*(.+?\?)\*\*/);
    if (item) {
      if (!current) report("ADAPTING.md", `adaptation point ${show(item[1])} sits under no file heading`);
      else listed.push({ rel: current, question: item[1].trim() });
    }
  }
  const key = ({ rel, question }) => `${rel}\u0000${question}`;
  const listedKeys = new Set(listed.map(key));
  const markerKeys = new Set(markers.map(key));
  for (const marker of markers) if (!listedKeys.has(key(marker))) report(marker.rel, `adapt marker ${show(marker.question)} is not listed in ADAPTING.md under this file`);
  for (const point of listed) if (!markerKeys.has(key(point))) report("ADAPTING.md", `lists ${show(point.question)} for ${point.rel}, which has no such adapt marker`);
  if (!listed.length) report("ADAPTING.md", "needs an \"Adaptation points\" section listing every adapt marker");
}

// The texts name no harness, no model and no personal path: the organisation's adapt answers
// name its model families. Code (scripts/, test/) may name a harness it has to fake. The one
// exception is the evidence section of docs/how-the-work-flows.md: its cited findings are about
// particular models, and name them as their sources do.
const evidenceDoc = join(repoRoot, "docs", "how-the-work-flows.md");
const evidenceHeading = /^## The evidence the design rests on\s*$/;
const harnessNames = /\b(?:Claude Code|Codex|ultracode|pi(?:'s)?)\b/;
const modelNames = /\b(?:GPT-?\d[\w.-]*|Opus|Sonnet|Haiku|Fable|Astra|Gemini|Grok|Llama|Mistral|Qwen|DeepSeek|Copilot|Claude)\b|\b(?:gpt|claude)-[\w.-]+/i;
const personalPath = /(?:\/home\/[A-Za-z]|\/Users\/[A-Za-z]|[A-Za-z]:\\Users\\)/;
const texts = [...walk(capabilitiesRoot), ...walk(soulsRoot), ...walk(join(repoRoot, "docs")),
  ...["README.md", "ADAPTING.md", "CHANGELOG.md"].map((file) => join(repoRoot, file))].filter((p) => existsSync(p));
for (const file of texts) {
  const rel = relative(repoRoot, file);
  let inEvidence = false;
  for (const [index, line] of readFileSync(file, "utf8").split("\n").entries()) {
    if (file === evidenceDoc && /^## /.test(line)) inEvidence = evidenceHeading.test(line);
    const harness = inEvidence ? null : line.match(harnessNames);
    if (harness) report(`${rel}:${index + 1}`, `names a harness (${harness[0]}); say "your harness" instead`);
    else if (!inEvidence) {
      const model = line.match(modelNames);
      if (model) report(`${rel}:${index + 1}`, `names a model (${model[0]}); the adapt answers name model families`);
    }
    if (personalPath.test(line)) report(`${rel}:${index + 1}`, "names a personal path");
  }
}

const docs = [join(repoRoot, "README.md"), join(repoRoot, "ADAPTING.md"), ...walk(join(repoRoot, "docs"), (p) => extname(p) === ".md")].filter((p) => existsSync(p));
// The docs and the souls' AGENTS.md name only skills and souls the template has.
for (const file of [...docs, ...walk(soulsRoot, (p) => basename(p) === "AGENTS.md")]) {
  const rel = relative(repoRoot, file);
  const text = readFileSync(file, "utf8");
  for (const match of text.matchAll(/(?<!`)`(\/[a-z0-9][a-z0-9-]*)`(?!`)/g)) {
    if (!knownSkills.has(match[1].slice(1))) report(rel, `skill reference ${match[1]} names no skill of this template`);
  }
  // ADAPTING's drop lists name skills as "the skill `<name>`".
  for (const match of text.matchAll(/\bthe skill `([a-z0-9][a-z0-9-]*)`/g)) {
    if (!knownSkills.has(match[1])) report(rel, `names the skill ${match[1]}, which this template lacks`);
  }
}
// The dispatcher's roster lists souls the template has.
const dispatcherAgents = join(soulsRoot, "dispatcher", "AGENTS.md");
if (existsSync(dispatcherAgents)) {
  const roster = readFileSync(dispatcherAgents, "utf8").split(/^## /m).find((section) => section.startsWith("The expert souls")) || "";
  for (const match of roster.matchAll(/^- `([a-z0-9][a-z0-9-]*)`/gm)) {
    if (!soulNames.has(match[1])) report(relative(repoRoot, dispatcherAgents), `lists the soul ${match[1]}, which this template lacks`);
  }
}
const localIds = new Set([...capabilityIds, ...soulNames]);
for (const file of docs) {
  const rel = relative(repoRoot, file);
  const text = readFileSync(file, "utf8");
  for (const match of text.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)) {
    const target = match[1];
    if (/^(?:https?:|mailto:|#)/.test(target)) continue;
    const pathPart = target.split("#")[0];
    if (!pathPart) continue;
    const resolved = resolve(dirname(file), pathPart);
    if (!existsSync(resolved)) report(rel, `broken internal link ${target}`);
  }
  for (const match of text.matchAll(/(?<!`)`([^`\n]+)`(?!`)/g)) {
    const code = match[1].trim();
    const candidates = [code, code.split(/\s*:\s*/)[0]];
    for (const id of candidates) {
      if (/^oats\.(?:study-[a-z-]+|analyst|record-steward|dispatcher|landing-[a-z]+)$/.test(id) || ["dispatcher", "study-lead", "analyst", "study-reviewer", "record-steward"].includes(id)) {
        if (!localIds.has(id)) report(rel, `template-local id ${id} is named in docs but not defined`);
      }
    }
  }
}

if (errors.length) {
  process.stderr.write(`Template validation failed:\n- ${errors.join("\n- ")}\n`);
  process.exit(1);
}
process.stdout.write(`Validated the scientific research template at template-v${templateVersion}: ${capabilities.length} capabilities, ${skillNames.size} skills, ${soulNames.size} souls, ${markers.length} adapt markers.\n`);
