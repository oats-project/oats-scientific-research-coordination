---
name: hand-off
description: Hand work, a question, a check or a finding to another role - by a message that wakes it, about a finished artefact at its exact reference - resolving the role to the instance already on the study or a fresh one (your helpers as your children, another area's step of your study to a helper and never a second lead, a related study's lead as your sibling and an unrelated one independent, with your person told its name at once), and waiting with no deadline. Use whenever anything you made or need goes to someone else, and when you answer one.
---

IMPORTANT: after a compaction, reload this skill before you continue the step.

# Hand off

## What you hand over
Only finished artefacts, at an exact reference: a brief or a protocol at its revision, a
run record at its head, a claim package at its revision, a finding with its source and
date. Never half a problem.

## To whom
Name the role (an area's study lead, an analyst for this arm, a study reviewer for this
check, the record steward of a study-records repository), then resolve it:
1. **On the study.** The study's record lists who is on it. One listed there that is
   running (`oats status`) gets it.
2. **None.** Start a fresh instance of that role's soul:
   - your analysts, your study reviewers and your other helpers are your children
     (`/plan-the-study`, `/send-a-helper`), spawned with `--same-work`: it records that
     they do your work, and your person's sidebar draws their line to you. It shares no
     work tree: each keeps the work its soul gives it;
   - the record steward is standing and never your child: find it, or start it, as
     `/write-the-protocol` says ("Find the record steward");
   - another area's work that your study needs stays in your study: a helper of that
     area's soul, as your child, never a second lead (`/send-a-helper`, "Another area's
     work in your study");
   - a lead for another study in your person's area: a follow-on question, a finding that
     needs a study of its own, work your person asks to be tracked apart. How it relates
     to you depends on whether the study is related to yours:
     - **Related:** a continuation or follow-on of your study, or a discovery that bears on
       what you were studying. Say your study finds that the dataset it relies on was
       relabelled partway through its collection, and whether that changed earlier
       results deserves a study of its own: its lead is your sibling.
       ```bash
       oats spawn <soul> --relation sibling --relative-to "$OATS_INSTANCE" --purpose <slug> \
         --task-file <message.md>
       ```
       The two show together in your person's status and sidebar, and it outlives your
       retirement, which a child would not. A sibling records no parent, so it takes no
       `--same-work`: the kernel refuses the flag there. Only a root lead, one with no
       parent (a dispatcher or a person started it), spawns the sibling itself: a sibling
       takes its anchor's parent, so yours would become your parent's child without your
       parent starting it. With a parent, tell it about the second study instead.
     - **Unrelated:** a finding with nothing to do with your study's subject. Say the same
       study notices that another study's protocol in the records cites a retracted paper:
       its owner is independent of you, `oats spawn <soul> --relation unrelated --purpose
       <slug> --task-file <message.md>`.

     Either way your message is its task, and the new study gets its own record, linked
     from yours and back. Tell your person at once, in your study's thread, in one
     message: the new lead's exact instance name, what it leads, its record's link, and
     that they talk to it in that study's thread. Add the new study to your status line;
   - a role in another person's area: ask that person's dispatcher to start it, with your
     message as the request it reads by its id (`/across-people`); where they have none,
     ask them.
3. **Its name.** Give each new instance a name no instance has had. Never reuse a retired
   instance's name.

## The message
One message, in the study's thread with that role:
- first line: what you need, and what happens on yes;
- the artefact and its exact reference;
- what you checked and how, and what you didn't;
- the people's decisions it rests on, each as recorded (`DECISION by <person>, <link>:
  <their words>`);
- what you need back: a verdict, an answer, a run, a lock or a merge.

The study's record keeps what happened: the protocol's revisions and its lock, the run
records and their reviews' verdicts, the claim package's revisions and the acceptance. It
never carries the hand-off: no label, no flag and no comment is the signal.

## Waiting
End your turn; the answer wakes you. No answer has a deadline, and nothing goes ahead by
default.
- **A child** you wait on gets its checkpoint, which watches for a stalled instance
  (`/plan-the-study`, "Set a checkpoint before you wait").
- **Whenever something else wakes you,** look at what you wait on. A recipient that retired
  without answering gets the message again, through step 2. One that stopped: tell whoever
  can start it (its parent, or its person).
- **A person:** set needs-input (`oats instance attention --message "<one line>"`) and
  clear it (`--clear`) when they answer. Never set a timer on a person.

## Answering one
Answer in the same thread, at the reference you were given. If it moved under you, say so
and answer at the new one.

Taken from the research template's research-lead, template-v2.0.0, itself from the
engineering template's engineering-expert, template-v3.0.1; changed where it named a report,
a researcher or the verifier.
