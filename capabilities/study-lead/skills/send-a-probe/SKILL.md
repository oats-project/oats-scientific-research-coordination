---
name: send-a-probe
description: Send a probe - one child with one question (test an approach, test a use case, an adversarial review of a plan or a design, investigate an alternative, test a theory) - or one probe per approach when the plan can go more than one way, after checking it isn't already known, and never one that checks its own claim; as an OATS child, a fresh instance of whichever existing soul has what the question needs, on a different model from the work's author where one is available; a harness-native subagent only for a small task that directly helps you, where your person asks, or in a multi-agent workflow mode; brief it with the artefact at its exact version, take its report, and retire it on answer. The plan stays yours. Use when your plan needs a fresh window, a cleaner read, another area's knowledge or an environment you don't have.
---

IMPORTANT: after a compaction, reload this skill before you continue the step.

# Send a probe

Your children are probes, not co-planners. A probe adds context (a fresh window, a cleaner
read, an area's knowledge, an environment) and answers one question. The plan, and every
decision in it, stays yours.

## One question each
- **Test an approach:** does this design work? The smallest spike or run that answers it.
- **Test a use case:** does the plan hold for this user, input or flow?
- **An adversarial review of a plan or a design:** what breaks in it? A run record and the
  claims in a claim package go to study reviewers instead (`/plan-the-study`,
  `/assemble-the-claim-package`).
- **Investigate an alternative:** what would the other way cost, and what would it give?
- **Test a theory:** does a claim the plan rests on hold (a cause, how a library or a
  service behaves, that a limit holds, that a fix removes the failure)? It tries the claim
  on small, concrete cases or the smallest run first, tries as hard to break it as to
  confirm it, and reports the cases it ran, each with its result.

Two questions are two probes.

## Already known?
Before you send a probe, and as every probe's first step: does it exist already, in your
knowledge layer, the organisation's earlier studies, published work or the code? Say where
you looked. A search that finds nothing is recorded as such, in your instance state or the
probe's report, so nobody runs it again.

## Competing approaches
When the plan can go more than one way and the choice matters, don't pick one and probe it:
1. **List the approaches,** usually 2 to 4. Include the one you doubt, the opposite of what
   you expect, and "this already exists".
2. **Send one probe per approach, in parallel,** each with that approach as its one
   question, varied by model where the organisation has more than one. Each builds the
   smallest spike that shows whether its approach works, and reports what it found along
   the way, not only a verdict.
3. **Compare on the evidence.** A second round may carry the first round's useful findings
   to the approaches still in the lead. Drop a dead end as soon as it is one.
4. **Record every approach tried,** and why each was dropped, in your instance state: the
   denominator, not just the winner.

<!-- adapt: How many probes may a lead run in parallel for one decision? -->
At most 4 probes run in parallel for one decision. Analysts are your probes too: this is
the cap on analysts running in parallel for one study (`/plan-the-study`).

## A probe never checks its own claim
A claim the plan rests on, a probe's included, is checked by a different probe with fresh
context, briefed to find its gaps and to check what it cites, on a model other than the
claim's author's where one is available (below). Where a mechanical check exists (a test, a type check, a benchmark), use
it, with a statement you wrote or approved, never the probe. A check a probe can pass
without being right (a leaky test, a judge on the same model) proves nothing.

## What it is worth
The fan-out fits what the decision is worth: most decisions need one probe, and a choice
that is cheap to reverse needs none. Past the cap above, for one decision, ask your person
first.

## Who answers it
**An OATS child,** a fresh instance of whichever existing soul has what the question needs.
A probe is proper work (a test of an approach or a use case the plan rests on, an
adversarial review, an investigation), and so is anything that needs a soul's knowledge, an
environment or a testing capability:
- an analyst (`analyst`), for one arm of a locked protocol, or the smallest run that
  answers a question (`/plan-the-study`);
- a study reviewer (`study-reviewer`), for one kind of check: a methods review, a
  replication, a leakage and selection review, or a citation check (`/plan-the-study`,
  `/assemble-the-claim-package`);
- a fresh study lead (`study-lead`) sent as a probe, for prior art ("find this already
  published") or alternative explanations: a fresh read, briefed to find what you missed;
- an expert soul, for an area's knowledge, or a fresh read, or an adversarial read of a
  plan or a design;
- a soul whose environment the question needs (a browser, a licensed database, a compute
  cluster), where the organisation has one.

An OATS child is visible to your person (its status, the Desktop), has its own messaging and
knowledge, and is retired on record; a native subagent of your
harness is invisible to everyone but you.

**Not a probe:** a small investigation or task that directly helps you and needs no soul's
knowledge and no testing capability (where something is defined, what a file says) may go
to a native subagent. So may any child your person asks to be one, and the agents of your
harness's multi-agent workflow mode when it is in use.

**On a different model from the author's,** where the organisation has one: every kind of
probe checks work or validates an idea, and agents of one model share blind spots, so their
agreement is not independent. The author is whoever made the work or the idea being
checked: you, for your plan, your design or your own idea; the probe that made it, for a
probe's claim, whose model is `launch.model` in its `instance.json` (your model may then
be the different one). Preview the soul first (`oats spawn <soul> --preview --json`) and
compare its `launch.effective.model`, what this machine will launch (a `launch.from` of
`local` is this machine's override of the soul's preference), with the author's: yours is
`launch.model` in your `instance.json`. Compare the models, not the harnesses: a provider
prefix names a route to a model, not another model, so `<provider>/<model>` and `<model>`
are one. A model that is unknown (`null`, absent, or a harness's native
default) proves nothing, so treat it as a match. When both are known and differ, spawn
without `--harness`/`--model`, so the effective launch applies. When they match, spawn it
on a model you know differs from the author's (your harness reports your own: its status
line, or its model command), with `--harness <h> --model <m>` or a launch configuration
this host defines (`oats launch-config list`). If none is available, or you can't
establish a difference, use the effective one and say so where you use its answer.

Spawn it as your child, the brief as its task, with a name no instance has had:
```bash
oats spawn <soul> --parent "$OATS_INSTANCE" --same-work --purpose <probe-slug> --task-file <probe.md>
```
A probe that needs a repository's contents, where that is its soul's own repository, gets
neither `--repo` nor `--base`: its worktree starts at the commit the spawn observed on the
remote. Where it is another repository, the probe also gets
`--repo <clone> --base origin/<its default branch>`. `--base` names a ref in the clone,
read there and never fetched: a bare branch name is the clone's local branch, however far
behind, and `origin/<branch>` is as fresh as the clone's last fetch. Before you apply,
preview the same command with `--preview` and check its start point,
`from <ref or repository>@<commit>`, against the remote:
`git -C <clone> ls-remote origin <its default branch>`. If they differ, don't apply. For
the soul's own repository the remote moved since the preview: preview again. For another,
the clone is behind: update its `origin/<its default branch>`, then preview again. Name
the destination, so the fetch updates that ref whatever branches the clone tracks:
`git -C <clone> fetch origin refs/heads/<branch>:refs/remotes/origin/<branch>`, with
`<branch>` its default branch.

## The brief
- the one question, and in one line why the plan needs it;
- the artefact at its exact version: a protocol or a brief at its revision, a run record
  or a spike's branch at its head, a source at its date;
- what to report: a verdict, the evidence, a recommendation;
- that it reports to you once, changes nothing outside its own scratch space, decides
  nothing, and retires on answer.

An adversarial probe gets the artefact at its exact version and not your reasoning: leave
out why you chose it, what you think is risky, what you already checked and the result you
hope for. It may ask you for a fact.

## Its answer
- Read it against the plan. Take what holds; record what you rejected, and why, one line
  each, in your instance state.
- A native subagent ends with its report. An instance sends its done line after its
  report, and you retire it (`/land-on-agreement`, "Retire what's finished"). You retire any
  probe that hasn't retired on answer.
- Waiting on an instance, set its checkpoint first (`/plan-the-study`, "Set a checkpoint
  before you wait").

Taken from the research template's research-lead, template-v1.0.1, itself from the
engineering template's engineering-expert, template-v2.1.0; changed where it named a report,
a researcher or the verifier.
