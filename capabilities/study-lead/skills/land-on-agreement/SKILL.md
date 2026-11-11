---
name: land-on-agreement
description: Take your study from protocol to landed claims - the protocol approved by the scientist and locked by the record steward, each run record verified at its head with its reviews' verdicts in it and merged by the record steward, the claim package checked at one revision with any statistical sign-off your landing rules set, the hand-off to the scientist, whose acceptance of that revision lands it inside the group, a fresh check for a revision that changes a claim, every step outside the group and every irreversible step only on a person's yes - and retire what's finished, yourself last. Use whenever a protocol, a run record or a claim package is ready to land, while it waits, when a claim should leave the group, and when an instance you started, or your study, is finished.
---

IMPORTANT: after a compaction, reload this skill before you continue the step.

# Land on agreement

## Your landing rules
Your landing rules are in your briefing, with any change to them you recorded since (the
rules say how), which wins. They name the scientist for a study, what landed means for a
protocol, a run, a result and a claim inside and outside the group, when a human
statistician signs off, what CI green means, the irreversible steps and who takes them,
who decides publishing, where study records are kept and who opens one, and where findings
worth keeping go. Read them once per study, and again after a compaction. None in your
briefing: that is a block (`/findings-and-blocks`); lock no protocol, send no run record
to be merged and no claim package for acceptance until it is settled.

## 1. The protocol: approved and locked
You never approve your own protocol. Hand it at its revision to the scientist
(`/write-the-protocol`): an approval is of that revision only. Record it on the study's
record: `APPROVED by <scientist>, <link>, at <commit>`. Then the record steward locks that
revision: its hash, who approved it and when, in the lock record, before any confirmatory
data is seen (`/write-the-protocol`, "Find the record steward"). Record its lock line:
`LOCKED at <hash>, <commit>`. A change to a locked protocol is a new revision, approved and
locked again before the data it governs is seen; once that data is seen, the change is a
logged deviation, whoever makes it, the scientist included.

## 2. A run record: verified and merged
You never check your own work, and no analyst checks its own. An analyst reports its run
record once its review loop, the methods review, has converged at a head
(`/assemble-the-claim-package`). On a confirmatory arm that loop converges before
unblinding, and unblinding is the scientist's step (step 8). At the run record's head, send
the checks the protocol names for the arm (`/assemble-the-claim-package`): its independent
check (a re-run, a formal proof check or an expert referee), and the leakage and selection
review on every confirmatory arm and on every exploratory arm whose claim leaves the group.
Each verdict goes into the run record, at that head, with its Checked lines (what it read or
ran, and the attacks that found nothing): a verdict without them is not a check yet, and
goes back to that reviewer, or the check to a fresh one. When the reviews agree and the
record follows the locked protocol, write `VERIFIED at <head>: <the verdicts, one line
each>` on the study's record, and tell the analyst. The analyst then opens it for merging at
that head and sends you its link; you ask the record steward by message to merge it there,
and the steward merges it once its landing conditions hold there, checked from the record
itself, with CI green as your landing rules define it where it lands through a forge. You
never merge. A finding a review returns goes back to the analyst, and its new head gets the
reviews again, from fresh reviewers.

## 3. Statistical sign-off
Where your landing rules turn it on for this study, hand the claims that setting covers,
at the claim package's checked revision, to the statistician those rules name
(`/hand-off`), and wait for their verdict by message. Record it:
`SIGNED OFF by <statistician>, <link>: <their words>`. What they find you fix in a new
revision, which goes back through the checks where it changes a claim, and back to them
for the delta.

## 4. To the scientist
When every agreement holds at one revision of the claim package (each claim's checks
recorded, `CHECKED at <revision>`, and the sign-off where step 3 applies), hand it to the
scientist (`/land-the-claims`). It is a hand-off, not a card: what they decide is whether
they accept these claims as theirs. Set needs-input, and wait.

## 5. A new revision
A revision of the claim package that changes a claim or adds one gets its checks again
(`/assemble-the-claim-package`), from fresh reviewers, never the ones that checked the old
wording, and a new `CHECKED at <revision>`. A revision that changes no claim (wording,
layout, a fixed link) carries the checks:
`CHECKED at <new revision>: delta since <old revision> read, no claim changed`. Direction
people already gave (the question, a card's answer) holds through a revision: nobody is
asked to decide it again. An acceptance, an author's approval and a yes to an irreversible
step are of one revision: a revision that changes or adds a claim after them goes back to
the scientist (step 4), and a yes never carries to another revision.

## 6. Landed
A claim has landed inside the group when the scientist accepts the claim package that holds
it, wherever that answer arrives. Record it on the study's record, at its revision:
`ACCEPTED by <scientist>, <link>, at <revision>: <their words>`. Each claim keeps its mode
label. Clear needs-input. An answer that the package isn't yet theirs, with why, goes back
to the plan or the protocol (`/plan-the-study`, `/write-the-protocol`); an analysis chosen
after seeing the results is exploratory unless a new protocol is approved and locked before
its data is seen. The next revision goes through steps 2 to 4 again.

## 7. After it lands
Write the findings worth keeping where your landing rules say (`/land-the-claims`), update
the record's status, and act on what the claims unblock.

## 8. Outside the group, and the irreversible steps
Each irreversible step your landing rules name (registering a preregistration, unblinding,
using up material, contacting human subjects, releasing data or code, making a claim public
in any form, submitting, spending above the threshold) and opening a study record are
one-way doors: the scientist's, with the bodies your landing rules name, on one card each
(`/ask-a-person`), never assumed from an approval or an acceptance. A claim leaves the group
only as `/land-the-claims` says: every human author's approval, AI use disclosed by stage,
no AI as an author, and at least one check that isn't LLM judgement. After their yes, take
that step as named, for that revision, as your landing rules say, and tell them in one line
that it is done. Never take it for a revision other than the one their yes named.

## Retire what's finished
Finished instances are retired without asking or telling a person. Spawning and retiring
never involve one: done lines go to the parent that retires the child.

An instance is **finished** when all of these hold:
- its work has landed: its run record merged, its claim package accepted, or the work
  explicitly dropped. Handed back is not landed: it may still be needed for a revision. A
  probe's work is its answer;
- nothing waits on it: no open protocol, run record, check, question, finding without an
  owner or hand-back of its own, and its own children are retired;
- with a duty to propose knowledge (your knowledge layer says whether you have one), its
  final knowledge checkpoint ("you finish a task") is run and its outcome recorded, as that
  layer says. A proposal it opened at any knowledge checkpoint is in the knowledge layer's
  hands from then on, not work above that must land: nobody waits for it.

- **The done report** says its final knowledge checkpoint's outcome in one of four lines,
  sent once the child has retired its own children and removed its extra worktrees:
  - "done, proposed: <PR URLs>": finished;
  - "done, nothing to propose: <reason>": finished;
  - "done, no duty to propose": finished;
  - "done, proposal pending: <slug and why>": not finished, its final proposal is not
    open yet. Retire nothing yet; it reports again, with one of the first three lines,
    once the proposal is settled.

  Ask for the line when a done report lacks it. A child whose work isn't a Git work tree
  also names each repository it used under its work, with its branch.
- **Before you retire it, check:**
  - `oats instance git <child>`: no uncommitted changes and no unpushed commits (a retire
    would keep such a work tree, not deliver it); otherwise the child finishes or hands its
    work over first. When its work isn't a Git work tree (`E_NO_WORKTREE`: directory or
    workspace mode), check each repository its done report names, read-only:
    `git -C <path> status --short --branch` shows a clean tree tracking its upstream, not
    ahead. An error, or a repository you can't see, is not clean: ask the child;
  - `oats retire <child> --plan`: no other instance is attached to its work tree;
    otherwise wait until that one is retired by its own parent.
- **Retire it** with `oats retire <child>`, and record it in your state (name, why). No
  acknowledgement is needed.
- **Only your own children.** Never retire another's child: tell its parent instead.
  Children are retired before their parent: a parent's retire stops and keeps its running
  children, and refuses with `E_CHILDREN_RUNNING` when one won't stop.
- **Never reuse a name:** a new instance never takes a retired one's name, which the
  records it left and the provenance of the knowledge it proposed still name.
- **Your analysts:** once their run record has merged, or their arm was dropped, with the
  checks above: the merge delivers their branch.
- **Your helpers:** a helper with a scoped piece of work once its artefact is on the
  study's record and your questions are answered. **Your study reviewers and other probes**
  (helpers with a question): once they have answered (`/send-a-helper`). A probe's work is
  its answer, and its scratch commits are not delivered: skip the `oats instance git`
  check, and where it has a work tree, retire it with
  `oats retire <probe> --discard-worktree`. Retire any probe that hasn't answered too.
- **The record steward** is standing and not your child: it holds the records across
  studies. Never retire it.
- **Yourself:** once your study is finished (its claim package accepted, or the study
  dropped, each finding with an owner, nothing waiting on you), retire your children, close
  the study's record, run your final checkpoint, and send your person one done note in the
  study's thread. Then, with an OATS parent, send it your done line, unprompted; it retires
  you. With none (spawned `--relation unrelated`, or started directly by a person), run the
  same checks on yourself and retire yourself with `oats retire "$OATS_INSTANCE" --self`
  (the instance name is required).

Taken from the research template's research-lead, template-v2.0.1, itself from the
engineering template's engineering-expert, template-v3.0.2; changed where it named a report,
a researcher or the verifier; rewritten for a study's landings, in research's order and
voice.
