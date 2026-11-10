---
name: keep-the-records
description: Check that a change to the study records keeps what must not change - no file under any study's raw data modified, deleted or renamed (the files and their hash manifests alike), and every notebook, deviation log and lock record only grown, each old version a byte prefix of the new one - with exact git and standard-tool commands whose output is the evidence; refuse on any failure. Use on every record you merge, and whenever a lead asks you to check one.
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

## 1. Raw data is write-once
Under any study's `raw/`, a change may add files and nothing else. That holds for the data
files and for hash manifests alike: a manifest kept in place of data that lives in custody
elsewhere (one line per file: `<path>`, a tab, `<size in bytes>`, a tab, `<sha256>`) is
never edited either; new data gets a new manifest file.
```bash
git -C <tree> diff --no-renames --name-status --diff-filter=MDT <base>...<head> -- ':(glob)studies/*/raw/**'
```
Its output must be empty: each line it prints is a file changed (`M`), deleted (`D`) or
changed in type (`T`), and a rename shows as a deletion. Where a new manifest names data in
custody you can read, check it against the files:
```bash
awk -F'\t' '{print $3"  "$1}' <manifest> | (cd <custody root> && sha256sum -c -)
awk -F'\t' '{print $1, $2}' <manifest> | while read -r p n; do [ "$(stat -c %s "<custody root>/$p")" = "$n" ] || echo "size differs: $p"; done
```
Any line that isn't `OK`, or any "size differs", is a failure. Custody you can't read: say
so in your answer, beside the manifest.

## 2. The notebook, the deviation log and the lock record only grow
For each study's `notebook.md`, `deviations.md` and `locks.md`, a change may only append.
None may be deleted:
```bash
git -C <tree> diff --no-renames --name-status --diff-filter=DT <base>...<head> -- ':(glob)studies/*/notebook.md' ':(glob)studies/*/deviations.md' ':(glob)studies/*/locks.md'
```
must print nothing. Then, for each such file the change touches
(`git -C <tree> diff --name-only <base>...<head> -- <the same three pathspecs>`), the old
version must be a byte prefix of the new one. A count of deleted lines alone misses a line
inserted at the top, so compare the bytes:
```bash
old=$(mktemp); new=$(mktemp)
git -C <tree> show <base>:<file> > "$old" 2>/dev/null || : > "$old"   # a new file starts empty
git -C <tree> show <head>:<file> > "$new"
cmp -s -n "$(stat -c %s "$old")" "$old" "$new" && [ "$(stat -c %s "$new")" -ge "$(stat -c %s "$old")" ] && echo "append-only: <file>" || echo "REWRITTEN: <file>"
rm -f "$old" "$new"
```
A correction is a new line that says what it corrects, never an edit.

## 3. The answer
Pass: every command above printed what it must. Fail: name each file and paste the
command's output. A failure is a no for the whole change, whoever asks and whatever else
holds: the change is fixed on its branch (a new head) and checked again. Never fix a
record yourself, and never merge part of a change.

Adapted from the engineering template's maintainer, template-v2.2.0; new for a study's
records.
