---
name: plan-the-study
description: Frames a study with its scientist and plans it before any arm runs - the study's record, what claim or decision it serves, what would change it, its constraints, an "already known?" check, the profile, competing hypotheses including the one you doubt, the arms as closed questions with one analyst each (an analyst runs every arm, the lead none), the tree sized to the study, the probes for prior art, citation support and alternative explanations, sending the analysts once the protocol is locked, combining their reports, and every arm and probe tried recorded. Use at the start of every study, as a lead or as a specialist, for every further round, and when deciding how many analysts and helpers a study needs.
---

# Plan the study

A study answers a question the scientist is accountable for. Frame it before you plan:
an arm planned for the wrong question is an analyst wasted. The plan, the protocol and
the claim package stay yours; the claims are the scientist's.

## 1. Read first, and the record
- the request verbatim, and who asked; your landing rules name the scientist for the
  study ("Who asks, and who is the scientist");
- your soul's knowledge, the organisation's earlier studies and published work: is it
  answered already, or in part? (section 3 starts here);
- what the request leaves open.

A study has one record, where your landing rules keep them: your task names it, or you
open it before you plan. Your tasks layer holds outcomes only (the study, a finding to
own). An arm, a probe, a helper's piece, a specialist's area and a review live on the
study's record, never as items of their own.

## 2. The frame
Six lines:
~~~
Serves:          <the claim or decision the scientist will make or stand behind>
Would change it: <the results that would move it one way or the other>
Answered:        <what the claim package must show for the scientist to accept it>
Constraints:     <budget, ethics status, irreversible material, data permissions>
Profile:         <theory | computational | experimental, or a combination>
Out of scope:    <what the study deliberately leaves out>
~~~
"Answered" is checkable: a hypothesis tested by a named rule, an estimate with its
interval, a proof of a stated theorem. "Everything about X" is not a frame.

Send the scientist the frame once, in the study's thread, with your reading of each line
the request left open. It is one plain question ("Is this what the study must answer?"),
not a card: what the claim serves and what would change it are facts only they have. Set
needs-input (`oats instance attention --message "<one line>"`) and end your turn.
Meanwhile run section 3; plan no arm the answer could change. Where the request already
states every line, record the frame, tell them in one line the frame you are working to,
and go on. Record it at the top of the study's record with their answer (`DECISION by
<person>, <link>: <their words>`), and clear needs-input. A change to the frame later is
theirs; record it the same way.

## 3. Already known?
Before any arm, and as every analyst's and probe's first step: is it answered already, in
your knowledge layer, the organisation's earlier studies or published work? Say where you
looked. A search that finds nothing is recorded as such, in your instance state, so
nobody runs it again. An earlier answer is as good as its date, and for a finding about
agents, its model generation: an older one is a lead, not an answer. A claim of novelty
is the scientist's, and only after the prior-art probe (section 6) has reported.

## 4. Hypotheses and arms
List the hypotheses before you plan an arm, each with its opposite:
- the one you expect to hold;
- the one you doubt, and the opposite of what you expect;
- "this already exists" or "the effect is an artefact", where it could be.

An arm is one analysis, simulation, experiment or proof attempt that tests them, run by
one analyst under the locked protocol (`/write-the-protocol`). Each arm is a closed
question: the protocol writes its possible results, and what each would mean for the
hypotheses, before it runs. Two methods are two arms. Fit the fan-out to what the claim
is worth: a claim that is cheap to get wrong needs one arm. The cap on probes in
parallel for one decision is the cap on analysts for one study
(`/orchestrate-agents`, references/probes.md): past it, ask your person first.

**Who runs each arm.** An analyst runs every arm, exploratory or confirmatory; you run
none. In the engineering and research templates a lead may build or read a piece
itself; here the split is by accountability and by what each instance may see, not only
by context: you wrote the protocol and you read the claims, and blinding and the lock
rest on your never touching the data.

## 5. Size the tree
Size it as your briefing says, and record the choice and its reason on the study's
record. The tree may grow: a study that turns out larger gets its specialists then.
- **Simple:** one arm, its analyst and its checks; you do the rest.
- **Complex or creative, but not large:** you lead alone, with short-lived probes and
  helpers, and one analyst per arm.
- **Large, or across several areas** (methods, fields or instruments that each need
  their own depth): one specialist per area, each leading its area's arms inside your
  plan (`/orchestrate-agents`, "A specialist"). Write the interfaces between areas first.

What you decide at any size: how many arms there are, which run in parallel, and when a
specialist helper is worth it: an analyst copy with an environment the default can't
provide, another area's lead soul for a scoped piece that touches no data.

## 6. The probes
Before the protocol is locked, and again before a claim leaves the group, send the probes
the plan needs (`/orchestrate-agents`), each a fresh instance with one closed question:
- **prior art:** a fresh `study-lead` sent as a probe, briefed adversarially: "find this
  result already published". Its novelty statement reads "not found by these searches";
- **alternative explanations:** a fresh `study-lead` sent as a probe: what else would
  produce the expected result, and what would tell the explanations apart;
- **citation support:** a `study-reviewer` briefed for a citation check: does each source
  the plan leans on exist, and say what is claimed.

What they find goes into the protocol: an alternative explanation becomes an arm or a
control, prior art changes the question or the claim.

## 7. Send the analysts
Only once the protocol is locked (`/write-the-protocol`). One analyst per arm, in
parallel, each your child, its brief as its task, on the models
`/orchestrate-agents` (references/probes.md, "Every child's model") picks. The brief,
the command and what a confirmatory brief must leave out are in
[references/analyst-brief.md](references/analyst-brief.md): read it before every brief.

## 8. Combine, and the next round
Read each report against the frame and the locked rules. Take what holds; record what you
rejected and why, one line each, in your instance state. An exploratory round may carry
the first round's useful findings to arms still in the lead, each to a new analyst with
a new brief, never the first round's instance: name the finding and its source, not your
conclusion. A confirmatory arm never gets a second try at its result: a new attempt is a
new protocol revision, approved and locked again, and every attempt counts in the claim
package. Drop a dead end as soon as it is one.

## 9. Record every arm and probe
Every arm and probe tried, with its instance, its model, its mode and why it was kept or
dropped, in your instance state and in the claim package's method: the denominator, not
just the winners.
