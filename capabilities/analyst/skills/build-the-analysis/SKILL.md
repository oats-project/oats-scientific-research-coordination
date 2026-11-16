---
name: build-the-analysis
description: Builds an arm's analysis the way the study records want it - the records repository's own rules first, the protocol's checks as written, the tests the change touches found and run before the first new one, tests on blinded, held-back or synthetic data for a confirmatory arm, expected values from an independent source, fixed seeds, doubles only at real boundaries; a bug diagnosed with a command that shows it before any fix, never fixed by changing the data, the seed or the protocol, every attempt logged, three failed fixes then stop and tell the lead; and a workflow of your own agents under its cap. Use before your first edit, for each test, for any bug, failing test or run that won't reproduce, and before you start your own workflow's agents.
---

# Build the analysis

You know how to write and test code. This skill holds what the study adds: whose rules
win, which data a test may see, and what stops a fix.

## 1. The records repository's rules win
Before your first edit, read what the study records say about how they are changed: their
agent instructions (`AGENTS.md`, `CLAUDE.md`) at the root and on the path to your arm's
directory, their test conventions and their CI workflows. They win over your habits. The
locked protocol's checks go in as written; a test you write sits around them, never in
place of one. Where the protocol and the repository disagree, ask your lead before you
build that part.

## 2. Tests
- **First, the tests the change touches:** the ones beside the code, the ones that import
  it, the ones CI runs for its paths. Run them and note which pass, before your first new
  test, and again after every slice: knowing which tests a change affects prevents far
  more regressions than writing tests first does.
- **On a confirmatory arm, never the real outcome data:** tests and the code they test
  run on the blinded, held-back or synthetic data the protocol names. A test tuned on the
  real outcome is a choice made on the result.
- **Expected values from an independent source:** a known-good literal, a worked example
  computed by hand, a published value, a case with a known answer. Never computed the way
  the code computes them: such a test can never disagree with the code.
- **Fixed seeds** for anything random, recorded in the test, so a test gives the same
  verdict every run. A seed is never changed to get another result.
- **Doubles only at real boundaries** (the network, the clock, a paid service, an
  instrument), never for your own collaborators, and no test asserts on a double instead
  of the behaviour.

## 3. A bug: diagnose before you fix
Every attempt below is an attempt of your arm: log it in `attempts.md` (`/run-an-arm`).
- **A command that shows the failure first:** one that goes red on this bug and green
  once it is fixed, gives the same verdict every run (pin the seeds and the environment)
  and runs in seconds. Add load only in an environment of your own, within your landing
  rules' house rules for the hosts. If you can't build one, stop: tell your lead what you
  tried and what would let you (an environment, a captured artefact, instrumentation).
  Redact any secret from the commands and output you show.
- **On a confirmatory arm,** diagnose on the blinded, held-back or synthetic data, never
  on the real outcome; a bug found after unblinding is fixed as a logged deviation.
- **Fix the cause,** with a regression test at a real seam that you watched fail first;
  no seam that can hold one is a finding for your report. NEVER fix it by changing the
  data, the seed or the protocol. Put the hypothesis that proved right in the commit
  message and in the attempt log.
- **Three failed fixes means stop.** When each fix reveals a new problem elsewhere, the
  analysis may be wrong: tell your lead what you learned, with your recommendation,
  before you try a fourth.

## 4. Your own workflow's agents
A workflow of your harness's own agents runs your own paths without asking while it stays
under 10 agents, counted across all stages and back-to-back workflows. Ten or more need
your person's permission: say how many, why, and what the smaller shape would cost.
Where the harness itself requires a person's opt-in, use a standing opt-in they gave, or
ask once per task with the agent count. Read what the agents produced: it goes through
your review loop as your own work. A path that needs a soul's knowledge or a testing
capability you lack is no workflow agent's: ask your lead for an OATS child.

Adapted from sources listed in THIRD-PARTY-NOTICES.md
