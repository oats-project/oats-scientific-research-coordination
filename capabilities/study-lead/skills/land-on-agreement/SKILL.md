---
name: land-on-agreement
description: Takes a study from protocol to landed claims - the protocol approved by the scientist and locked by the record steward, each run record verified at its head with its reviews' verdicts in it and merged by the record steward, a maintainer's green light where the landing rules ask for one, the claim package checked at one revision with any statistical sign-off the landing rules set, the hand-off to the scientist, whose acceptance of that revision lands it inside the group, a fresh check for a revision that changes a claim, and every step outside the group and every irreversible step only on a person's yes. Use whenever a protocol, a run record or a claim package is ready to land, while it waits, when a head or a revision moves after a verdict, and when a claim should leave the group.
---

# Land on agreement

Your landing rules, in your briefing, name the scientist, what landed means for a
protocol, a run, a result and a claim, and the irreversible steps; `/landing-rules-detail`
holds the statistical sign-off, publishing, the study records and the findings worth
keeping. Read them once per study and again after a compaction. A change to them you
recorded since wins. With none in your briefing, that is a block (`/hand-off-and-ask`):
lock no protocol, send no run record to be merged and no claim package for acceptance
until it is settled.

## 1. The protocol: approved and locked
You never approve your own protocol. Hand it at its revision to the scientist
(`/write-the-protocol`): an approval is of that revision only. Record it on the study's
record: `APPROVED by <scientist>, <link>, at <commit>`. Then the record steward locks that
revision, before any confirmatory data is seen (`/write-the-protocol`, "Find the record
steward"). Record its lock line: `LOCKED at <hash>, <commit>`. A change to a locked
protocol is a new revision, approved and locked again before the data it governs is
seen; once that data is seen, the change is a logged deviation, whoever makes it, the
scientist included.

## 2. A run record: verified and merged
You never check your own work, and no analyst checks its own. Each arm's run record goes
from its report to its merge as `/assemble-the-claim-package` section 1 says: its methods
review converged (before unblinding, on a confirmatory arm), the independent check and
the leakage and selection review at its head, each verdict in the record with what it
checked, then your `VERIFIED at <head>`. The analyst opens it for merging at that head;
you ask the record steward by message to merge it there, and the steward merges it once
its landing conditions hold, checked from the record itself. You never merge. A finding
a review returns goes back to the analyst, and its new head gets the reviews again, from
fresh reviewers.

## 3. A maintainer's green light
Only where your landing rules ask for one, for work that lands in a lane a maintainer
keeps (a shared code repository, say); a study records repository needs none. This
template ships no maintainer: where the organisation runs one, it is the engineering
template's, found by its instance name: `<person>-<lane>-maintainer`, or, after a retired
holder, with a count before the role (`<person>-<lane>-2-maintainer`, then `-3-`). Where
several people own the lane, the person is your own when they are among them, otherwise
the first owner named; if you can't tell the lane or its owner, ask your person, and call
and start none until you can. Look for every name of that family with `oats status
--json` on this machine and your messaging layer's roster across machines:
- **One is running:** call it.
- **One is stopped:** message it anyway (messages wait), and tell its person it is
  stopped, so they can start it.
- **More than one is running or stopped:** ask your person which holds the seat, and
  start none.
- **Named on the roster with nothing running anywhere you can see:** it may be retired,
  or run where you can't look. Ask its person before you start one.
- **None,** where the workspace has a maintainer soul: start one for your person,
  independent of you (`oats spawn <maintainer soul> --relation unrelated --name
  <person>-<lane>[-<count>]-maintainer --task-file <brief.md>`), named with the first of
  the family no instance has had. The kernel doesn't refuse a retired instance's name,
  so check each in order: `oats instance events <name>` lists a used name's events, a
  `retired` one among them, and says "no instance" for a name never used on this
  machine; a name the roster still lists is used too. A spawn refused because the name
  is taken means a holder is running or stopped: find it, and start none under another
  name. Tell your person, in one line, its name and that it holds the lane. As a
  specialist, ask your parent instead. In another person's lane, ask their dispatcher
  to start it, or that person where they have none.

Call it by message at the exact head once CI is green and every review thread is
answered, with the task, your `VERIFIED` note and what was run. Its verdict is `GREEN LIGHT at <head>`, `RETURN at
<head>` with findings (they go to the author; the fixed head goes back to it; after 3
returns on one PR, put both positions to your person in one card), or `ESCALATE`, which
you wait on. Where the workspace has no maintainer soul, start none: ask your person.

## 4. Statistical sign-off
Where your landing rules turn it on for this study, hand the claims that setting covers,
at the claim package's checked revision, to the statistician those rules name
(`/hand-off-and-ask`), and wait for their verdict by message. Record it: `SIGNED OFF by
<statistician>, <link>: <their words>`. What they find you fix in a new revision, which
goes back through the checks where it changes a claim, and back to them for the delta.

## 5. To the scientist
When every agreement holds at one revision of the claim package (each claim's checks
recorded, `CHECKED at <revision>`, and the sign-off where section 4 applies), hand it to
the scientist (`/land-the-claims`). It is a hand-off, not a card: what they decide is
whether they accept these claims as theirs. Set needs-input, and wait.

## 6. A new revision, and landed
A revision of the claim package that changes a claim or adds one gets its checks again
(`/assemble-the-claim-package`), from fresh reviewers, never the ones that checked the
old wording, and a new `CHECKED at <revision>`. A revision that changes no claim
(wording, layout, a fixed link) carries the checks: `CHECKED at <new revision>: delta
since <old revision> read, no claim changed`. Direction people already gave (the
question, a card's answer) holds through a revision: nobody is asked to decide it again.
An acceptance, an author's approval and a yes to an irreversible step are of one
revision: a revision that changes or adds a claim after them goes back to the scientist
(section 5), and a yes never carries to another revision.

A claim has landed inside the group when the scientist accepts the claim package that
holds it, wherever that answer arrives. Record it, at its revision: `ACCEPTED by
<scientist>, <link>, at <revision>: <their words>`. Each claim keeps its mode label.
Clear needs-input. An answer that the package isn't yet theirs, with why, goes back to
the plan or the protocol (`/plan-the-study`, `/write-the-protocol`); an analysis chosen
after seeing the results is exploratory unless a new protocol is approved and locked
before its data is seen. The next revision goes through sections 2 to 5 again.

Then write the findings worth keeping where your landing rules say (`/land-the-claims`),
update the record's status, and act on what the claims unblock.

## 7. Outside the group, and the irreversible steps
Each irreversible step your landing rules name, and opening a study record, is a one-way
door: the scientist's, with the bodies your landing rules name, on one card each
(`/hand-off-and-ask`), never assumed from an approval or an acceptance. A claim leaves
the group only as `/land-the-claims` says. After their yes, take that step as named, for
that revision, as your landing rules say, and tell them in one line that it is done.
Never take it for a revision other than the one their yes named.

## 8. When the study has landed
Each finished child retires itself: check that none is still listed. When your own seat
is finished, as `/wait-and-retire` defines it, retire yourself.
