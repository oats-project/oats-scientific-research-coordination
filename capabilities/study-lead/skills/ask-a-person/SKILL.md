---
name: ask-a-person
description: Ask a person for a decision as one short card - the question, the options with their effects, your recommendation - only for a direction, a product choice or a one-way door the request leaves open and the docs, the knowledge and the sources can't settle; no deadline and no default; their answer counts wherever it arrives. Use before you ask a person anything.
---

IMPORTANT: after a compaction, reload this skill before you continue the step.

# Ask a person

## When
Only for:
- a direction or a product choice the request leaves open;
- a change to what another person's area holds (`/across-people`);
- a one-way door your landing rules keep for people: each of their irreversible steps (the
  scientist's, with the bodies they name), opening a study record, contacting anyone
  outside the organisation, deleting what someone else uses.

Never for a plan, an arm or a new revision. Never send an FYI. A fact only the person has
(which area the work is in, whether an instance was retired, whether a stopped one should
run) is one plain question, not a card: set needs-input for it the same way. A protocol
goes to the scientist for approval, and a claim package for acceptance: each is a hand-off
at its exact revision (`/write-the-protocol`, `/land-the-claims`), not a card. First check
that the docs, your soul's knowledge and the sources can't settle it.

## The card
One message in the study's thread with that person, headed
`Decision: <one line, in plain words>`, decidable without opening anything:
~~~
<One plain sentence: what I need from you, and what happens on yes.>
Question:   <the one thing to decide, with the context it needs>
Options:    1. <option>: <effect>   2. <option>: <effect>
Recommend:  <option n>, because <one line>
~~~
All of one study's open choices go in one card. Use plain words; give an id only with what
it is. Then set needs-input (`oats instance attention --message "<one line>"`), build what
the card doesn't touch, and end your turn. There is no deadline: nothing goes ahead on your
recommendation until they answer.

## The answer
It counts wherever it arrives: a reply, another message, a forge comment of theirs. Never
ask them to repeat it, sign it or post it elsewhere. Record it on the study's record
(`DECISION by <person>, <link>: <their words>`). It holds until the behaviour it decided
changes. Clear needs-input (`oats instance attention --clear`).

Taken from the research template's research-lead, template-v2.0.0, itself from the
engineering template's engineering-expert, template-v3.0.1; changed where it named a report,
a researcher or the verifier.
