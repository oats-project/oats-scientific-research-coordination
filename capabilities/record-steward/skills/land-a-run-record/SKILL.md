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
Everything it would land is under `<s>/`. Anything else is a no.

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

   Each review read an ancestor of `H`, and the arm's content is unchanged since, apart from
   its reviews:
   ```bash
   git -C <tree> merge-base --is-ancestor <reviewed head> H
   git -C <tree> diff --name-only <reviewed head> H -- <s>/runs/<arm>/ ':(exclude)<s>/runs/<arm>/reviews/**'
   ```
   The second must print nothing. A change since is a new head, and its reviews start
   again.
5. **The verdict follows the locked rule.** Apply the protocol's decision rule, as written,
   to the numbers the record reports: the record's verdict must be the rule's. Where the
   verdict departs from it, `<s>/deviations.md` holds a line for that departure (who, when,
   why), even when the scientist made it. A rule you can't apply mechanically is a no: ask
   the lead. An exploratory arm has no decision rule: its record says `exploratory`, and so
   does every result in it.
6. **The records rules pass:** `/keep-the-records` between `origin/<default>` and `H`.
7. **No hold, no RETURN** is recorded on the PR or on the records' default branch, where
   your landing rules keep holds.
8. **Through a forge, CI is green at `H`,** as your landing rules define it.

## 3. Merge it
- **Through a forge:** merge with the forge's merge, guarded by `H`: the merge happens only
  if the PR's head is still `H`. A head that moved is a new call.
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
