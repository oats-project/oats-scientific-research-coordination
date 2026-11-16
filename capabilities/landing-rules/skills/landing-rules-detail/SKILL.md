---
name: landing-rules-detail
description: The exact definitions behind the landing rules - what CI green means for a record that lands through a forge, what VERIFIED asserts and what carries to a new head, a maintainer's green light where the landing rules ask for one, the model floor for children, the statistical sign-off, the profiles, publishing a claim, the findings worth keeping, and (in its references) the study records' layout, holds, who does which work and what happens after the rules change. Use before judging that an agreement holds at a head, before a merge or a lock, when a head moved after a verdict, before choosing a child's model, before publishing, opening a record or writing a finding, and whenever the landing rules in the briefing leave a case open.
---

# The landing rules, in detail

Your briefing's landing rules name the scientist, what landed means, the irreversible
steps and the house rules. This skill holds the definitions behind them. Where the two
differ, a change you recorded since your spawn wins, then the briefing.

## CI green
<!-- adapt: Which checks does the forge require on the default branch? -->
For a record that lands through a forge: at least one check ran at the head, every check
the forge requires is among them, and every check that ran succeeded: none failing, none
pending. A skipped check didn't run. A head where no check ran isn't green.

## VERIFIED, and what carries to a new head
- **`VERIFIED at <head>`** is the note of whoever specified the work: the lead (or the
  specialist of its area) for an analyst's run record, once its checks agree there and
  it follows the locked protocol. It lets the analyst open the run record for merging at
  that head. It asserts what was checked: each verdict, one line each.
- **A review carries** to a new head with no re-read through a rebase whose range-diff
  shows every commit unchanged, or an update from the default branch that leaves the
  record's own diff unchanged. A run record has two more, which the analyst's report and the
  record steward's checks spell out: the methods verdict carries to a head where only the
  run's evidence grew (on a confirmatory arm, the reviewed code's run on the real data
  adds its result, outputs and attempts), and every check's verdict carries through
  commits that only add verdicts under the arm's `reviews/`. Any other new head of a run
  record, a nit taken included, gets a fresh reviewer on the whole change: every round of
  an analyst's loop is fresh, and engineering's read of a minor's fix as a delta is not
  taken up here.
- **A `VERIFIED` note and a green light** carry with no re-read through the same
  unchanged rebase or update, and in no other way: at any other new head, whoever gave it
  reads the delta and gives it again at that head. A reviewer's verdict never stands in
  for either.
- **A claim package's checks** carry to a new revision only where it changes no claim
  (wording, layout, a fixed link): a revision that changes or adds a claim is checked
  again by fresh reviewers, and an acceptance or a yes never carries to it.

## A maintainer's green light
Only where your landing rules ask for it. "Green light" means only a lane maintainer's
verdict on a PR, at an exact head, by message to whoever called: `GREEN LIGHT at <head>`
with what it checked, `RETURN at <head>` with findings, or `ESCALATE`, a direction
question gone to whoever decides it. It judges the lane's direction, contracts,
coherence, the PR's scope against its task, and the evidence against its acceptance
criteria: never a second review of the lines.

## The model floor
The floor in your briefing binds every child, an OATS child or a native subagent, and it
is checked before model diversity.
- It binds the model a child would actually launch on, wherever that comes from: a soul's
  default or a machine's override that is below the floor is not used. Spawn that child
  on a model at or above the floor instead, your own by default, and tell your person
  once that the configuration is below the floor, naming the soul and the machine.
- A model whose tier you can't establish is below the floor.
- A child that checks work runs on another family's model only where one at or above the
  floor is available; otherwise on your own model, and you say that diversity was lost.

## Statistical sign-off
<!-- adapt: Which studies need a human statistician's sign-off, and who signs off? -->
Every claim in a study whose protocol marks it clinical or policy-relevant, exploratory
or confirmatory, needs a human statistician's sign-off, `SIGNED OFF by <statistician>`,
before its claim package goes for acceptance. Other studies need none: the methods
review stands. Why: an independent statistical reviewer has improved papers in a medical
journal's trial, a human finding, and the stakes of clinical and policy work justify one.

## Profiles
<!-- adapt: Which profiles apply to this organisation's studies: theory, computational, experimental? -->
All three: each study's protocol chooses its profile, and a study may combine them (a
computational analysis of lab data uses both). Theory: a proof check is the verifier,
formal where the field has one, and preregistration mostly doesn't apply. Computational:
results are re-run in a pinned environment, against many analyses, selection, leakage
and drift. Experimental: material, safety and ethics, with raw instrument data in
custody. Why: the coordination is shared, but what counts as a check differs by profile.

## Publishing
<!-- adapt: Who decides to publish a claim outside the group, and what must it carry? -->
The scientist decides, for each claim, on a card from its lead, with every human
author's approval; where it touches another person's area, that person decides it with
them. Before the card, the lead reads it for what must not leave. Only an accepted
revision of the claim package is published, with its mode labels, its checks, the AI use
by stage and the full count of attempts. Writing to a knowledge layer anyone outside the
organisation can read is publishing too. Why: a public claim can't be cleanly taken
back, and the human authors are accountable for it.

## Findings worth keeping
<!-- adapt: Which knowledge layer keeps the findings worth keeping, who approves what goes in, and can anyone outside the organisation read it? -->
Once a claim has landed inside the group, its lead writes each finding worth keeping into
the knowledge layer the workspace selects, the way that layer says: dated, with its mode,
its source and its checks, attributed to the study and the accepted revision, and with
the model generation it was measured on for a finding about agents. A finding for another
person's area goes to that area's lead. With no knowledge layer, the study records keep
the accepted claim package, and that is the record. The knowledge layer is read only
inside the organisation; where anyone outside it can read the layer, a finding written
there is published, and "Publishing" applies before it is written. Why: a finding without
its date, mode and checks can't be weighed later.

## The rest
- [references/study-records.md](references/study-records.md): the study records' layout,
  what is write-once and append-only, who merges, opening a record, and holds. Read it
  before any lock, merge or record change, and before you ask to open a record.
- [references/more-rules.md](references/more-rules.md): who does which work and the
  review every result gets, the records a study keeps, and what happens after these rules
  change.
