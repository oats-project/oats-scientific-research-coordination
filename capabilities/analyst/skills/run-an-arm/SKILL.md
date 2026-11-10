---
name: run-an-arm
description: The analyst's method for one arm of a locked protocol - read the protocol at its locked hash, make your own branch of the study records repository, pin the environment, log every attempt, failure and deviation as it happens, keep full traces wherever the runtime exposes them, read raw data and never change it, and on a confirmatory arm build and review on blinded, held-back or synthetic data and run on the real data only once the scientist unblinds it. Use from the brief to the last attempt of your arm.
---

IMPORTANT: after a compaction, reload this skill before you continue the step.

# Run an arm

Your run record is the arm's evidence: someone other than you must be able to repeat the
run from it alone, and read in it every attempt you made, not only the one that worked.

## 1. The protocol, at its lock
Your brief names the study, your arm, the protocol's commit and its locked hash. Before
anything else, check the protocol you read is the one that was locked: compute its hash at
that commit (`git show <commit>:studies/<study>/protocol.md | sha256sum`) and find it in
`studies/<study>/locks.md`. A mismatch, or no lock, stops the arm, exploratory or
confirmatory: tell your lead and run nothing. Exploratory mode changes how an arm may
iterate, never whether its protocol is approved and locked.

From the protocol, take your arm's:
- mode (exploratory or confirmatory), profile, and the analysis plan as written;
- the decision rule that maps its result to a verdict, for a confirmatory claim;
- the checks its claims get, and the comparison rule a replication is held to;
- the environment, the data it may read, and the stopping rule.

What the protocol leaves open you ask your lead; you never fill it in with what would work.

## 2. Your branch of the study records
Make your own tree on the records repository your brief names, from your home:
```bash
oats worktree add --purpose <arm> --branch <branch> --base origin/<default branch> \
  --repo <records clone> --preview
oats worktree add --purpose <arm> --branch <branch> --base origin/<default branch> \
  --repo <records clone>
```
Check the preview's start point against the remote first
(`git -C <records clone> ls-remote origin <default branch>`); if they differ, fetch the
clone's `origin/<default branch>` and preview again. Name the branch as the repository's
rules say, else `agents/<your instance>-<arm>`. Your run record lives in it, under
`studies/<study>/runs/<arm>/`:
~~~
README.md       the arm, the protocol's commit and lock hash, the mode, how to re-run it
environment/    the pinned environment: its lockfile, container digest or image reference
code/           the analysis code, at the commit each attempt ran
attempts.md     every attempt, appended: when, the code commit, the inputs, the outcome
deviations.md   every departure of this arm from the locked protocol, appended: what, when,
                why, who (the study's own deviations are the lead's, in the study's log)
outputs/        raw outputs of each attempt, never overwritten
traces/         full traces wherever the runtime exposes them
reviews/        each review round's verdict, at the head it reviewed
result.md       the result against the locked rule, and the mode label
~~~
You never push the default branch: the record steward merges your record, once it lands.

## 3. A pinned environment
Pin everything the run depends on: a lockfile with exact versions and hashes, a container
digest (never a moving tag), the language and tool versions, the seeds. Record it in
`environment/` before the first attempt, and rebuild from it, not from your host's state.
A package not in the pinned environment isn't used; adding one is a change to the
environment, logged in `attempts.md` and, where the protocol fixed the environment, in
`deviations.md`.

## 4. Raw data: read, never changed
Raw data lives under `studies/<study>/raw/`, as files or as a hash manifest (one line per
file: its path, its size, its sha256, separated by tabs) for data kept in custody elsewhere.
Either way it is write-once: you read it and never edit, move, rename, clean in place or
delete any of it. Before your first attempt, check what you read against the manifest's or
the repository's hashes, and record that you did. Anything you derive (a cleaned table, a
subsample, an imputed value) is new data, written under `outputs/` with the code that made
it. Never substitute, impute or synthesise data without the protocol naming it, and never
present derived data as raw. Human subjects' data and raw instrument data stay in custody:
they never leave the place your landing rules name.

## 5. Every attempt, failure and deviation
Append to `attempts.md` as each attempt runs, not afterwards: a crash, a bug, a run you
stopped, a specification you tried and dropped. The count is part of the result: a reader
can't weigh one success without the failures beside it. Anything that departs from the
locked protocol (another model, an exclusion, a changed threshold, a skipped step, an
extra analysis) goes in `deviations.md` with why, whether you think it matters or not.
Keep each attempt's raw outputs, and its full traces wherever the runtime exposes them.

## 6. A confirmatory arm: blind first
1. Build the analysis and write its tests (`/test-first`) on blinded, held-back or synthetic
   data the protocol names, never on the real outcome data.
2. Run your review loop on that (`/run-the-review-loop`): the code and the method against
   the locked protocol. Every fix comes before anyone sees the result.
3. Once the loop has converged, ask your lead for unblinding: it is the scientist's step,
   and you wait for it.
4. Run the reviewed code, unchanged, on the real data. Apply the decision rule as written.
   A change after unblinding, however small, is a logged deviation, and the result it
   gives is reported beside the planned one, never instead of it.

An exploratory arm iterates freely: every attempt is still logged, and every claim it
yields is labelled exploratory.

## 7. The result
Write `result.md`: the outputs the decision rule reads, the verdict the rule gives, and the
mode label. A verdict you think the rule gets wrong is a deviation for the scientist to
decide, never one you apply. Then report the arm (`/report-the-arm`).
