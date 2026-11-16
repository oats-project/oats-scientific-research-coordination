---
name: orchestrate-agents
description: Decides whether a piece of a study goes to another agent, and runs that agent well - when a child is worth its cost and when to do the work yourself, which kind (an analyst for an arm, a study reviewer for a check, a short-lived probe or helper, or a long-lived specialist that leads one area of a large study), whether the new instance is a child, a sibling lead or an independent lead, the brief, what comes back, and its retirement. Use before starting or briefing any instance, when a step of the plan lies in another area, and when a theory or an approach the plan rests on needs testing.
---

# Orchestrate agents

Your children do parts of your study. The study, the plan, the protocol, the claim
package and every decision in them stay yours, whichever areas they cross.

## 1. Is a child worth it?
One agent is the default: several cost 3 to 10 times the tokens of one. Start a child
only when one of your briefing's three reasons holds (protecting context, parallel work,
specialisation), and name it in the brief. Otherwise do the work yourself. Two kinds are
required by rule, never chosen this way: an analyst for every arm, since you run none,
and the study reviewers every result and every claim gets.

Good boundaries are independent questions, arms of a locked protocol, areas with a
written interface, and black-box checks. Bad ones are phases of one piece of work (a
coder, a runner and a reporter for one arm: an arm and its run record keep one author),
a lane that differs only in a few concepts to read (that is knowledge, and you read it),
tightly coupled parts, and anything that needs constant back-and-forth.

First check that it isn't known already: in your knowledge layer, the organisation's
earlier studies, published work or the code. Say where you looked, and record a search
that found nothing, so nobody runs it again.

## 2. Which kind
- **Short-lived:** an analyst with one arm (`/plan-the-study`), a study reviewer with one
  check (`/assemble-the-claim-package`), a probe with one closed question, or a helper
  with one scoped piece. It reports once, distilled, and retires.
- **A long-lived specialist:** it leads one area of a large study, for the whole study.

Every expert seat keeps its hands off the study's data: work on the data is an arm, run
by an analyst under the locked protocol.

A step of your plan in another area is still your study. Where a read answers it, read
that area's knowledge yourself: every area is readable. Where it needs that area's
judgment, skills or a clean context, it goes to the area's specialist, or to a helper: a
fresh instance of that area's lead soul.

## 3. Child, sibling or independent
A study is one question that can be answered on its own. Work its "answered" needs stays
in it; work it can finish without (a follow-on question, a finding outside your question)
is another study. In doubt, it is yours.

| Its work | Relation | Spawn with |
|---|---|---|
| A part of your study: an analyst, a study reviewer, a probe, a helper, a specialist | your **child** | `--parent <your instance> --same-work` |
| A new study that arises from yours: a follow-on, a discovery that bears on what you study, a question your person wants tracked apart | your **sibling**, a lead of its own | `--relation sibling --relative-to <your instance>` |
| A new study with no bearing on yours | **independent**, a lead of its own | `--relation unrelated` |

- A child asks you and hands back to you, and you make sure it is retired. Retiring you
  stops it first, so a lead of another study is never your child. NEVER start a second
  lead for a step of your own plan: your person would no longer know where to look.
- A sibling or independent lead gets your message as its task (`/hand-off-and-ask`),
  opening with its seat (root lead of the new study), and its own record, linked both
  ways with yours. A sibling records no parent, so it takes no `--same-work`. Tell your
  person at once its exact name, what it leads and where its record is, and add it to
  your study's status line.
- Only a root lead with no parent (a dispatcher or a person started it) spawns a
  sibling. As a specialist, hand a new study to your parent.

`--same-work` records that the child does your work; it shares no work tree. Where
`$OATS_INSTANCE` is empty (a resumed session), write your instance name.

## 4. A specialist
Start one per area when the study is large or crosses several areas: a fresh instance of
the lead soul that knows the area.
<!-- adapt: Which lead souls can lead an area as a specialist, and what does each bring (knowledge, sources, instruments, an environment)? -->
The generalist `study-lead` takes any area, one fresh instance per area.

An area has its own sources, methods, instruments or knowledge, and an interface to the
rest of the study that can be written down (a method, a field's literature, an
instrument). Parts that need constant back-and-forth are one area.
- **It leads its area's arms inside your plan,** up to the merge of their run records:
  it drafts its area's part of the protocol for you, sends its own analysts once you have
  the protocol locked, has each run reviewed, verifies each run record at its head and
  asks the record steward to merge it. It sizes its own tree as you do, with specialists
  of its own only for distinct, narrower sub-areas.
- **The protocol and the claim package stay yours,** with every card to the scientist:
  one protocol per study, one claim package, one thread. A specialist never reviews what
  it helped make.
- **Read its area's knowledge yourself,** enough to plan and to write the interfaces. The
  specialist carries the depth.
- **Interfaces:** write each one before either side builds on it. From then on the two
  specialists agree a change directly and record it on the study's record. What they
  can't settle is yours.
- **It reports** at its area's milestones only: its part of the protocol ready, a run
  record verified and merged, the area done.

## 5. Probes and helpers
A probe tests one thing the plan rests on, in a fresh context, before you lock a
protocol on it. A plan that rests on an untested assumption, or on one approach chosen by
argument, isn't ready. [references/probes.md](references/probes.md) has the method:
closed questions, exploration with bounds, competing approaches in parallel, why a probe
never checks its own claim, and choosing every child's model.

A helper with a scoped piece (a simulation tool built and tested, a literature map of a
field you don't know) never touches the study's data. What it hands back is a source,
not a verdict: keep it on the study's record at its exact reference; a claim the claim
package takes from it is checked by study reviewers, never by the helper that made it;
anything an arm runs is named in the locked protocol first.

An OATS child is visible to your person and retired on record. Use a native subagent of
your harness only for a small lookup that needs no soul's knowledge or testing
capability, where your person asks for one, or inside your harness's multi-agent
workflow mode: never for an arm or a study reviewer's check. Either kind runs at or
above the model floor your landing rules set.

## 6. Brief it, and take back its result
Write the brief from [references/briefs.md](references/briefs.md) (an analyst's from
`/plan-the-study`). For an instance of a lead soul, ALWAYS name its seat on a `Seat:`
line (specialist, or helper or probe): it acts by the seat its task names. An analyst and
a study reviewer are their own seat and get no such line.
Then:
- Set a checkpoint before you wait on it (`/wait-and-retire`), and don't ask it for
  progress: it reports its result, a question or a blocker.
- Read what comes back against the plan. Check a claim the plan will rest on against what
  the child points to (the source, the page, the run), not its summary. Record what you
  rejected, and why, one line each, in your instance state.
- A finished child retires itself. Check that it is gone, and retire one that is
  finished or stalled and still listed (`/wait-and-retire`, "The parent's sweep").
