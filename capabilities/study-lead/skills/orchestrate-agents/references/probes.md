# Probes: testing what the plan rests on

A probe tries one theory or one approach in a fresh context. Test the riskiest
assumption first, before you lock a protocol on it: that a dataset exists and covers the
population the frame names, that a method or an instrument measures what the claim
needs, that a theorem's statement is the intended one.

## Contents
- What a probe can test
- A closed question
- Competing approaches
- A probe never checks its own claim
- Every child's model: the floor, then a different one
- What it is worth

## What a probe can test
- **A theory:** does a claim the plan rests on hold (a cause, how a source or a service
  behaves, that a limit holds)? Name the result that would refute it before the probe
  runs. It tries small, concrete cases first, tries as hard to break the claim as to
  confirm it, and reports each case it ran with its result.
- **An approach:** does this method or design work? The smallest spike or run that
  answers it.
- **A use case:** does the plan hold for this population, input or case?
- **A plan or a design, adversarially:** what breaks in it?
- **An alternative:** what would the other way cost, and what would it give?

Two questions are two probes.

## A closed question
A question is closed when you can write its possible answers before you send it (yes or
no, which of these, a figure in a range, the cases that fail) and say what each would
change in the plan. "Look into X", "what do you think of Y" and "how should we do Z" are
open: the child then decides for itself what you meant. An open question is yours to
frame, since you hold the problem: the claim or decision it serves, what "answered"
means, and the hypotheses, each a closed question (`/plan-the-study`).

**Exploration with bounds is a closed task too.** Where you can't frame the hypotheses
yet (it needs sources or a field you don't know), send one probe to explore, with four
things: the claim or decision it serves; where to look, never in the study's data; when
to stop (a number of sources or attempts, or the first sufficient answer); and what to
send back (its findings as things you can open, what it did not look at, and the closed
questions that decide the matter, with what each would change). What it returns frames
the study; it is not evidence for a claim until an arm of the locked protocol has tested
it and the study reviewers have checked it.

## Competing approaches
When the plan can go more than one way and the choice matters, don't pick on reasoning
alone:
1. **List them,** usually 2 to 4. Include the one you doubt, the opposite of what you
   expect, and "this already exists".
2. **One probe per approach, in parallel,** each with that approach as its one question,
   none told about the others, varied by model where you can. Each runs the smallest
   test that shows whether its approach works, and reports what it found along the way,
   not only a verdict.
3. **Compare on the evidence.** A second round may carry the first round's useful
   findings to the approaches still in the lead. Drop a dead end as soon as it is one.
4. **Record every approach tried,** and why each was dropped, on the study's record: the
   denominator, not just the winner.

<!-- adapt: How many probes may a lead run in parallel for one decision? -->
At most 4 probes run in parallel for one decision. Analysts count as probes here: this is
also the cap on analysts running in parallel for one study. Beyond it, ask your person
first.

## A probe never checks its own claim
A claim the plan rests on, a probe's included, is checked by a different probe with a
fresh context, briefed to find its gaps and to check what it cites, on another model
where one is available (below). Where a mechanical check exists (a test, a re-run by a
comparison rule, a formal proof check), use it, with a statement you wrote or approved,
never the probe's own. A check a probe can pass without being right (a leaky test, a
judge on the same model) proves nothing. You never check your own claims either: a run
record and the claims in a claim package go to study reviewers.

## Every child's model: the floor, then a different one
<!-- adapt: Which model families does this organisation have for analysts and study reviewers? -->
**The floor comes first** (your landing rules' house rules; `/landing-rules-detail`, "The
model floor"). Check the model each child would launch on against it before anything
below, the effective one from the preview as much as one you pass, and a native
subagent's too. A smaller, faster or cheaper model is not a different one, and a family
with no model at or above the floor is not one to vary across.

Then diversity. Agents of one model share blind spots, so their agreement is not
independent:
- vary the analysts of a study across the families the organisation has;
- each study reviewer runs on a model other than the analyst's whose work it checks, and
  the replicator on a family none of the arm's analysts runs on, where there is one;
- a probe that checks work or validates an idea runs on a model other than its author's:
  you, for your plan; the probe that made it, for a probe's claim.

How to compare:
1. The author's model is `launch.model` in its `instance.json`.
2. The child's is `launch.effective.model` in `oats spawn <soul> --preview --json`: what
   this machine will launch (a `launch.from` of `local` is this machine's override of the
   soul's preference).
3. Compare models, not harnesses: a provider prefix names a route, so `<provider>/<model>`
   and `<model>` are one model. An unknown model (`null`, absent, a harness's native
   default) counts as a match.
4. Both known and different: spawn without `--harness` or `--model`.
5. A match: spawn with `--harness <h> --model <m>`, or a launch configuration this host
   defines (`oats launch-config list`), on a model you know differs. Your harness
   reports your own.
6. No other family has a model at or above the floor, or you can't establish its tier:
   use your own model, and say where you use the answer that diversity was lost; with
   one family only, say so in the claim package's limits.

Record each child's model in your instance state: the study reviewers' picks need them.

## What it is worth
The fan-out fits what the decision is worth. Most decisions need one probe, a claim that
is cheap to get wrong needs one arm, and a choice that is cheap to reverse needs no probe.
