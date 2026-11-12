---
name: write-the-protocol
description: Write a study's protocol at an exact revision - the mode of each claim, a decision rule for each confirmatory one, the analysis plan, the comparison rule for replication, the profile, the checks each claim gets (marking which are not LLM judgement), stopping rules and the deviation policy - with no brief naming the hoped-for direction, the scientist's own included; have the scientist approve one revision and the record steward lock it before any confirmatory data is seen, finding or starting that steward first. Use once the study is planned, for every change to a protocol, and whenever you need the record steward.
---

IMPORTANT: after a compaction, reload this skill before you continue the step.

# Write the protocol

The protocol is the study's spec: what each arm does, and how a result becomes a verdict,
fixed before the result exists. You write it; the scientist approves it; the record steward
locks it. An agent's verdict follows the framing it was given, even when its numbers don't
move, so the rule that maps results to verdicts is written down and locked before any
confirmatory data is seen.

## 1. The shape
One file, `protocol.md` in the study's directory of the study records (your landing rules,
"Where things are kept"), at an exact commit:
~~~
# <the study's question, as framed>
Profile:      <theory | computational | experimental, or a combination, and what each
               covers>
Hypotheses:   <each with its opposite; the one you doubt included>
Claims:       <each claim the study may make, numbered, with its mode:
               exploratory | confirmatory>
Decision rules: <for each confirmatory claim: the result that supports it, the result that
               counts against it, and what counts as neither, fixed now>
Arms:         <each arm: what it runs, on which data, the outputs it records>
Analysis plan: <for each arm: the method, the specifications, exclusions, the held-out or
               blinded data, and how many analyses may be tried>
Environment:  <the pinned environment for each arm: its image or lockfile, and its hash>
Independent check: <for each arm, the one that isn't LLM judgement: a re-run and its
               comparison rule (which outputs, what tolerance); a formal proof check (the
               checker, its version, the statement it checks); or an expert referee, named>
Checks:       <for each claim: the checks it gets, each marked "not LLM judgement" where
               it is a re-run, a locked held-out set, a formal proof check, a physical
               measurement or a human expert>
Stopping:     <when an arm stops: the sample, the budget, the attempts>
Deviations:   <what counts as one, who records it, and who decides it>
Approvals:    <the ethics and safety approvals each step needs, by your landing rules'
               "Irreversible steps, all the scientist's", and the statistical sign-off where
               your landing rules' "Statistical sign-off" turns it on>
Data:         <the raw data, where it is kept, and what each arm may read>
~~~
- **Each confirmatory claim gets a decision rule:** a claim without one is exploratory, and
  labelled so wherever it goes. The mode travels with the claim: in the run record, the
  claim package and anything published.
- **Each claim that may leave the group** names at least one check that is not LLM
  judgement. A different-family agent reviewer counts for internal checks only.
- **The comparison rule makes replication mechanical:** the replicator reports both runs'
  numbers against it, and never judges "close enough".
- **The theory profile:** the check is a proof check, formal where one can be run, or an
  expert referee; the statement checked against the intended problem by a person;
  preregistration mostly doesn't apply.
- **The experimental profile:** each physical step names its gate, or the person who does
  it (your landing rules, "Instruments"); raw instrument data stays in custody.

## 2. No hoped-for direction
No brief names the direction you or the scientist hope a result takes: not the protocol's
reading for an analyst, not a study reviewer's brief, and not the brief you write for the
scientist's approval. An explicit instruction to favour a result has moved an agent's
verdicts while its estimates held still, and the instruction came from the person who
asked: a person's ownership of the verdict doesn't protect against it; a locked rule and a
brief that never names the hoped-for direction do. Write the hypotheses with their
opposites, and the rules in both directions.

## 3. The scientist approves one revision
Send the scientist the protocol at its commit, in the study's thread (`/hand-off`):
- first line: "The protocol for <the study>, for your approval, at <commit>";
- the claims with their modes and decision rules, in plain words;
- the checks each claim gets, and which are not LLM judgement;
- the irreversible steps it will need, each still theirs to take when it comes;
- what you need back: their approval of this revision, or what to change.

Set needs-input and end your turn. Their approval counts wherever it arrives; record it on
the study's record: `APPROVED by <person>, <link>, at <commit>`. It is an approval of that
revision only. Clear needs-input.

## 4. The record steward locks it
Find the record steward (below) and send it, by message, the protocol's path at the
approved commit and the approval's link. It records the protocol's hash, who approved it
and when, in the study's lock record, and answers with the lock line. Record it:
`LOCKED at <hash>, <commit>`. Before the lock, no arm sees confirmatory data, and no
analyst is sent (`/plan-the-study`, "Send the analysts").

## 5. A change after the lock
A change to anything the lock covers is either:
- **a new revision,** approved by the scientist and locked again, before any confirmatory
  data it touches is seen; every earlier revision and its runs stay counted; or
- **a logged deviation,** once the data is seen: recorded in the study's deviation log
  (what, who, when, why), carried into the claim package, and decided by the scientist.

A verdict that departs from the locked rule is a logged deviation, even when the scientist
makes it. Nothing is changed in place: the lock record and the deviation log only grow.

## Find the record steward
The record steward holds custody of the study records: it locks protocols and merges run
records. It is standing, one per study-records repository, and never your child, so it
outlives your study.
1. **Look for it:** `oats status` lists `<records>-record-steward`, named for the study
   records repository your landing rules name (`<records>-<n>-record-steward` after a
   retired one). Running: send it what you need, by message
   at an exact reference (`/hand-off`). Listed but not running: message it anyway (messages
   wait), and tell your person it is stopped, so they can start it.
2. **None:** start one yourself, top-level, never as your child, so your retirement can't
   stop it:
   ```bash
   oats spawn record-steward --relation unrelated --name <records>-record-steward --task-file <brief.md>
   ```
   Brief: "record steward for <the study records repository>; first call: <your instance>
   asks for <a lock | a merge> of <path or branch> at <commit>". Tell your person, in one
   line, its instance name and that it holds custody of those records. That is no one-way
   door, so it is no card. Where that name was used by a retired steward, put a count before
   the role, one more than the earlier ones (`<records>-2-record-steward`).
3. Never a second steward for one repository while one is listed, even a stopped one.
   Nothing is locked or merged until a steward runs.
