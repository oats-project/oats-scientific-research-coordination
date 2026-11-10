---
name: keep-the-records
description: Check that a change to the study records keeps what must not change, in every commit it brings in and not only at its ends - no file under any study's raw data modified, deleted or renamed (the files and their hash manifests alike), and every notebook, deviation log, lock record and arm's attempt and deviation log only grown, each old version a byte prefix of the new one - with exact git and standard-tool commands whose output is the evidence; refuse on any failure; and merge a study's other records (its status, notebook, deviations and claims) on its lead's call. Use on every record you merge, and whenever a lead asks you to check or merge one.
---

IMPORTANT: after a compaction, reload this skill before you continue the step.

# Keep the records

Two rules, checked by commands, on every change you merge. `<base>` is the commit the
change would land on (`origin/<default>`, fetched), `<head>` the commit you are checking,
and `<tree>` your own tree on the records repository. Fetch first:
```bash
git -C <tree> fetch origin
git -C <tree> merge-base --is-ancestor <base> <head>   # the change starts from the tip
```
That last check failing means the branch is behind the default branch: ask for it to be
updated from the default branch (a merge, which leaves the change's own diff as it was),
and check again at the new head.

## 1. Every commit, not only the ends
A change can edit a record and restore it before its head, or add a file and edit it later:
the two ends then look clean, yet the records' history would carry the edit. So the rules
below hold for every commit the change brings in, against each of its parents, merges
included. List them:
```bash
git -C <tree> rev-list --parents <base>..<head>     # each line: a commit, then its parents
```
Run sections 2 and 3 for each pair of a commit `C` and one of its parents `P` on those
lines. A merge commit whose two sides both appended to the same log fails section 3
against one parent: ask for that branch to be rebased onto the default branch instead,
which keeps each step an append, and check again at the new head.

## 2. Raw data is write-once
Under any study's `raw/`, a commit may add files and nothing else. That holds for the data
files and for hash manifests alike: a manifest kept in place of data that lives in custody
elsewhere (one line per file: `<path>`, a tab, `<size in bytes>`, a tab, `<sha256>`) is
never edited either; new data gets a new manifest file.
```bash
git -C <tree> diff --no-renames --name-status --diff-filter=MDT P C -- ':(glob)studies/*/raw/**'
```
Its output must be empty for every pair: each line it prints is a file changed (`M`),
deleted (`D`) or changed in type (`T`), and a rename shows as a deletion. Where a new
manifest names data in custody you can read, check it against the files:
```bash
awk -F'\t' '{print $3"  "$1}' <manifest> | (cd <custody root> && sha256sum -c -)
while IFS=$'\t' read -r p n h; do [ "$(stat -c %s "<custody root>/$p")" = "$n" ] || echo "size differs: $p"; done < <manifest>
```
Any line that isn't `OK`, or any "size differs", is a failure. Custody you can't read: say
so in your answer, beside the manifest.

## 3. The logs only grow
These are append-only, each study's and each arm's:
- `studies/<study>/notebook.md`, `studies/<study>/deviations.md` and
  `studies/<study>/locks.md`;
- `studies/<study>/runs/<arm>/attempts.md` and `studies/<study>/runs/<arm>/deviations.md`;
- `holds.md` at the repository's root, where the records have no forge.

The pathspecs, used below as `<logs>`:
```
':(glob)studies/*/notebook.md' ':(glob)studies/*/deviations.md' ':(glob)studies/*/locks.md' ':(glob)studies/*/runs/*/attempts.md' ':(glob)studies/*/runs/*/deviations.md' 'holds.md'
```
For each pair, none may be deleted:
```bash
git -C <tree> diff --no-renames --name-status --diff-filter=DT P C -- <logs>
```
must print nothing. Then, for each log the pair touches
(`git -C <tree> diff --name-only P C -- <logs>`), the old version must be a byte prefix of
the new one. A count of deleted lines alone misses a line inserted at the top, so compare
the bytes:
```bash
old=$(mktemp); new=$(mktemp)
git -C <tree> show P:<file> > "$old" 2>/dev/null || : > "$old"   # a new file starts empty
git -C <tree> show C:<file> > "$new"
cmp -s -n "$(stat -c %s "$old")" "$old" "$new" && [ "$(stat -c %s "$new")" -ge "$(stat -c %s "$old")" ] && echo "append-only: <file>" || echo "REWRITTEN: <file>"
rm -f "$old" "$new"
```
A correction is a new line that says what it corrects, never an edit.

## 4. The answer
Pass: every command above printed what it must, for every pair. Fail: name each file and
commit, and paste the command's output. A failure is a no for the whole change, whoever
asks and whatever else holds: the change is fixed on its branch (a new branch from the
default branch where the bad commit is in its history: a later commit can't undo one) and
checked again. Never fix a record yourself, and never merge part of a change.

## A study's other records
A lead's change to a study's `README.md` (its status), `notebook.md`, the study's
`deviations.md` or its `claims/` merges on the lead's call at an exact head, once this
skill passes and no hold covers it (your landing rules, "Where things are kept"), through
the forge's merge guarded by that head, or a merge of that commit with no forge
(`/land-a-run-record`, "Merge it"). It may touch nothing else: a protocol or a lock lands
only by `/lock-the-protocol`, and a run record only by `/land-a-run-record`:
```bash
git -C <tree> diff --no-renames --name-status <base>...<head> \
  | grep -v -E "^[AM]\sstudies/[^/]+/(README\.md|notebook\.md|deviations\.md|claims/)"   # must print nothing
```

## Holds without a forge
Where the records have no forge, a hold is a line in `holds.md` at the repository's root,
and a later line lifts it (your landing rules, "Where things are kept"). Each is one line:
```
<time, UTC, ISO 8601> | hold <id> | scope: <a change at its head, or the default branch> | reason: <why> | lifted by: <who> | called by <who>, <link>
<time, UTC, ISO 8601> | lifts <id> | called by <who>, <link>
```
A change that adds such lines merges on its caller's message at an exact head, even while
a hold stands: it changes nothing a hold covers. Check it:
```bash
git -C <tree> diff --no-renames --name-status <base>...<head> \
  | grep -v -E "^[AM]\sholds\.md$"                                   # must print nothing
git -C <tree> diff <base>...<head> -- holds.md | grep '^+[^+]'       # the lines it adds
```
- Sections 1 and 3 pass: the file only grows.
- Each added line has one of the two forms above, and its `called by` is who sent you the
  call; a line that names anyone else is a no.
- **To place a hold,** the caller is a study lead or a person your landing rules name.
- **To lift one,** the line names the hold it lifts, and its caller is the one that hold
  names in `lifted by`, or a person your landing rules name. A lead lifts only a hold it
  placed itself, never one a person placed.
- Nothing else rides with it: any other change goes by its own route.

Adapted from the engineering template's maintainer, template-v2.2.0; new for a study's
records.
