---
name: land-a-run-record
description: Merge one arm's run record into the study records only when its landing conditions hold at its exact head, checked from the record itself and never from a lead's note alone - the protocol's lock hash matches, it can be re-run from its record, every attempt is logged, the independent check agrees by the protocol's rule and the methods review passed (their verdicts in the record), the verdict follows the locked rule or the departure is a logged deviation, the records rules pass, and through a forge CI is green at that head; then merge that head. Use before every merge of a run record.
---

IMPORTANT: after a compaction, reload this skill before you continue the step.

# Land a run record

A run record lands when someone other than its author could re-run it from the record, and
its checks agree. You check that from the record, at one head. In what follows, `<tree>` is
your own tree on the records repository, `<default>` its default branch, `<s>` the study's
directory (`studies/<study>`), `<arm>` the arm's directory under `<s>/runs/`, and `H` the
head you were asked to merge.

## 1. The call
A study lead asks you, by message, to merge the run record of `<arm>` at `H` (a PR's head
where the records repository is on a forge, or a branch's commit where it isn't). The
lead's `VERIFIED at H` says it has checked the record; it is not your check. Fetch, and read
the record at `H`, not a checkout of the branch's latest:
```bash
git -C <tree> fetch origin
git -C <tree> merge-base --is-ancestor origin/<default> H   # else: ask for an update from the default branch
git -C <tree> diff --name-only origin/<default>...H         # what this record would land
```
A run record lands only its own arm. Everything it would land must be one of:
- a file under `<s>/runs/<arm>/`;
- a new file under `<s>/raw/` (data or a hash manifest an experimental arm brings in);

and nothing else: no change to `<s>/protocol.md` or `<s>/locks.md` (they land only by
`/lock-the-protocol`), to another arm, to `<s>/claims/`, or to the study's `README.md`,
`notebook.md` or `deviations.md` (the lead's, by `/keep-the-records`, "A study's other
records"). Check it:
```bash
git -C <tree> diff --no-renames --name-status origin/<default>...H \
  | grep -v -E "^[AM]\s<s>/runs/<arm>/|^A\s<s>/raw/"                 # must print nothing
```
Any line it prints is a no: that change goes by its own route.

## 2. The conditions, each from the record
Every one must hold at `H`. Each failure is a no, with the evidence.
1. **The protocol it ran under is locked, and unchanged.** The record names the lock hash
   it ran under; that hash is a line of `<s>/locks.md`; and the protocol file at that
   lock's commit still hashes to it:
   ```bash
   git -C <tree> show H:<s>/locks.md | grep -F "sha256 <hash>"
   git -C <tree> show <the lock line's commit>:<s>/protocol.md | sha256sum
   ```
2. **It can be re-run from its record.** The record holds the arm's code at its commit, the
   pinned environment (a lockfile, an image digest), the seeds, and the commands in their
   order. A missing one is a no, whatever the reviews say.
3. **Every attempt is logged.** The record's attempt log lists every run of the arm,
   failures and abandoned runs included, each with its outcome. Its count matches what the
   record and the reviews say was run.
4. **The checks agree, and their verdicts are in the record.** Under `<arm>/reviews/`, each
   review names the head it read, and says:
   - the methods review: the last round of the analyst's loop, `APPROVE` or
     `APPROVE WITH NITS`;
   - the independent check the protocol names for this arm: a re-run whose verdict is
     `AGREES` by the protocol's comparison rule, with both runs' numbers; or the protocol's
     other check that isn't LLM judgement (a formal proof check's output with its exit
     status, a locked held-out evaluation, a physical measurement, a human expert's signed
     verdict). A check that judged agreement instead of applying the rule is not one;
   - where the arm is confirmatory, or its claim is to leave the group: the leakage and
     selection review, `CLEAN`, or each concern answered in the record (a fix the methods
     review read again, or a logged deviation).

   Each review names the head it read, an ancestor of `H`
   (`git -C <tree> merge-base --is-ancestor <reviewed head> H`). What may have changed since
   depends on what it reviewed:
   - **The methods review** read the code and the method, on a confirmatory arm before
     unblinding. Since its head, the analysis and how it runs are unchanged; only the run's
     evidence (appended attempts and deviations, new outputs, traces, the result, the
     reviews) has grown:
     ```bash
     git -C <tree> diff --name-only <methods head> H -- <s>/runs/<arm>/code/ <s>/runs/<arm>/environment/ <s>/runs/<arm>/README.md
     ```
     must print nothing.
   - **The independent check and the leakage and selection review** read the run as it
     lands, its result and its inputs included. Nothing of the arm but its reviews has
     changed since, and nothing in the study's raw data either, whichever arm added it:
     ```bash
     git -C <tree> diff --name-only <reviewed head> H -- <s>/runs/<arm>/ <s>/raw/ ':(exclude)<s>/runs/<arm>/reviews/**'
     ```
     must print nothing.

   A change the first command shows is a new head for the methods review: a fresh round,
   and on a confirmatory arm after unblinding, a logged deviation in the arm's
   `deviations.md`. A change the second shows needs those checks again at the new head: a
new raw file can change what the arm's code reads, even with the arm unchanged.
5. **The verdict follows the locked rule.** Apply the protocol's decision rule, as written,
   to the numbers the record reports: the record's verdict must be the rule's. Where the
   verdict departs from it, the arm's `<s>/runs/<arm>/deviations.md` or the study's
   `<s>/deviations.md` holds a line for that departure (who, when, why), even when the
   scientist made it. A rule you can't apply mechanically is a no: ask
   the lead. An exploratory arm has no decision rule: its record says `exploratory`, and so
   does every result in it.
6. **The records rules pass:** `/keep-the-records` between `origin/<default>` and `H`.
7. **No hold, no RETURN:** read both places your landing rules keep holds ("Where things
   are kept"), before every merge: the PR's own hold, and a hold on the records' default
   branch, which binds every PR, opened before it or after.
8. **Through a forge, CI is green at `H`,** as your landing rules define it.

## 3. Merge it
Every route you merge by uses this section: a run record, a protocol and its lock line, a
study's other records, a hold's line.
- **Through a forge:** CI is green at `H`, as your landing rules define it, before any
  merge. Then merge with the forge's merge commit, never a squash or a rebase, guarded by
  `H`: the merge happens only if the PR's head is still `H`. A head that moved is a new
  call. The records point at their commits (each attempt's code, a lock's approved
  commit), so `H` must stay in the default branch's history:
  ```bash
  git -C <tree> fetch origin
  git -C <tree> merge-base --is-ancestor H origin/<default>   # after the merge; else tell the lead
  ```
  A forge that allows only a squash or a rebase on the records is a no: tell the lead, and
  merge nothing until it allows a merge commit.
- **No forge:** merge that commit, and push only the default branch:
  ```bash
  git -C <tree> checkout --detach origin/<default>
  git -C <tree> merge --no-ff -m "Land the run record of <arm> at H" H
  git -C <tree> push origin HEAD:refs/heads/<default>
  ```
  A push the remote refuses (the default branch moved) is a new check: fetch, and start at
  section 1.

## 4. Answer
Tell the lead, by message: merged, with the merge commit, or not, with each failing
condition and its evidence (the command and its output). A no is never partial: nothing of
the record lands until every condition holds at one head.

Adapted from the engineering template's maintainer, template-v2.2.0 (its read and merge at
an exact head, and the definition of CI green); changed where it named a pull request's
review and merge.
