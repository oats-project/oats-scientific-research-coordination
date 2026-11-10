---
name: test-first
description: Write the test before the analysis code, one slice at a time - first find and run the existing tests the change touches, then for each slice a test you watched fail for the expected reason, the least code that passes it, and the touched tests again; tests through public interfaces, expected values from an independent source, fixed seeds, mocks only at system boundaries, and on a confirmatory arm only blinded, held-back or synthetic data. Use before you write or change analysis code with behaviour to test, and on every slice of it.
---

# Test first

The records repository's own test conventions win where they differ from this skill. The
locked protocol's checks go in as written (your briefing says so); this skill is for the
tests you write around them.

## 1. Find the tests the change touches, and run them
Before you change anything, find the existing tests that cover the code the change touches:
the tests beside it, the ones that import it, the ones CI runs for its paths. Run them, and
note which pass now. Knowing which tests a change affects cuts the regressions it causes far
more than an instruction to write tests first does, so this step comes before your first new
test. Run them again after every slice.

## 2. One vertical slice at a time
For each slice of the analysis plan, in turn:
1. Write one test for one behaviour, named for that behaviour.
2. Run it and watch it fail, for the reason you expect: the behaviour is missing, not a typo
   or a broken import. A test that passes at once tests something that already exists, and
   a test you never saw fail proves nothing.
3. Write the least code that makes it pass, and nothing a later test might want.
4. Run it, then the tests from section 1. Fix the code, not the test.

Don't write all the tests first and then all the code: tests written ahead of the code pin
an imagined shape rather than the behaviour. Code you wrote before its test stays, but test
it now, and watch the test fail with the behaviour broken or removed before you trust it.

## 3. Tests worth keeping
- **Through public interfaces,** at the seams the analysis plan or the code already has. A
  test that breaks on a refactor that keeps the behaviour is coupled to the implementation.
- **Expected values from an independent source:** a known-good literal, a worked example
  computed by hand, a published value, a case with a known answer. Never computed the way
  the code computes them: such a test passes by construction and can never disagree with
  the code.
- **Fixed seeds** for anything random, recorded in the test, so a test gives the same
  verdict every run.
- **On a confirmatory arm, never the real outcome data:** tests run on the blinded,
  held-back or synthetic data the protocol names (`/run-an-arm`). A test tuned on the real
  outcome is a choice made on the result.
- **Mocks only at system boundaries** (the network, the clock, a paid service, an
  instrument), never for your own collaborators, and never an assertion on the mock instead
  of the behaviour.
- **One behaviour per test.** A name with "and" in it is two tests.
- A test that is hard to write says the code is hard to use: split it at a seam the plan
  already has.

Adapted from sources listed in THIRD-PARTY-NOTICES.md
