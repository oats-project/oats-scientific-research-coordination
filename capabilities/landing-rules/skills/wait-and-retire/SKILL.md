---
name: wait-and-retire
description: Waits on an instance you started, and makes sure every finished instance is retired - sets a checkpoint (a scheduled wake from outside the session) before ending a turn to wait on a study reviewer, an analyst, a helper, a probe or a specialist, says what to do when the checkpoint fires and when a stalled instance is replaced, and gives what finished means for each seat, the done line, how a finished instance retires itself, and the parent's sweep for a child that is still listed. Use before you end a turn to wait on an instance you started, when a checkpoint wake arrives, when a child sends its last message, and when your own work is finished.
---

# Wait on an instance, and retire what is finished

## Wait: set a checkpoint first
Once your turn ends you run no instructions, and a stalled instance may report nothing: a
refused provider, a stuck harness or a sign-in screen can each leave it `running`, with
no claim and no new event. So before you end your turn to wait on an instance you
started, set one checkpoint per instance: a wake that fires from outside your session
when its result is overdue. No answer has a deadline, and a checkpoint is not one: it is
a reason to look.

| You wait on | Overdue after | When it stalls |
|---|---|---|
| A study reviewer of your run record, or of your lead's claims | what a review like this took, with margin; an hour with nothing to go on | replace it: a new reviewer with the same brief, on another model at or above the floor if a provider refused this one |
| Your analyst, helper, probe or specialist | your plan's estimate, with margin | retire it, and hand its brief and what its branch holds to a new child |

The recipe, what to do when it fires, and when a wait ends are in
[references/checkpoint.md](references/checkpoint.md). Read it before you set one and each
time one fires.

Never wait on a person with a checkpoint: set needs-input
(`oats instance attention --message "<one line>"`), and clear it when they answer
(`oats instance attention --clear`). The record steward is standing and not your child:
a message to it waits for it, and a stopped one is its person's to start.

## Finished
An instance is finished when all of these hold:
- **Its work has landed:** its run record is merged, its claim package accepted, or the
  work was explicitly dropped. Handed back is not landed: it may still be needed for a
  revision. A reviewer's work is its report, and a probe's is its answer.
- **Nothing waits on it:** no open protocol, run record, check, question, hand-back or
  finding without an owner, and its own children are retired.
- **Its knowledge checkpoint is run,** where it has a duty to propose knowledge (its
  knowledge layer says whether it has one): the final checkpoint ("you finish a task"),
  with its outcome recorded as that layer says. A proposal it opened is in the knowledge
  layer's hands from then on: nobody waits for it.

| Seat | Finished when |
|---|---|
| A study reviewer | its report is sent: one reviewer, one report |
| A probe | its answer is sent |
| An analyst | its run record is merged, or its arm was dropped: its lead tells it the merge commit |
| A helper with a scoped piece | its artefact is on the study's record and its parent's questions are answered (a piece of code for a shared repository: its PR merged or closed) |
| A specialist | its lead says its area is done |
| A lead | its study's "answered" holds (the claim package accepted, or the study dropped), and each finding has an owner |

A dispatcher and a record steward hold standing seats, never finished by a study ending:
their person retires them, and no lead ever does.

## Retire yourself
IMPORTANT: a finished instance ALWAYS retires ITSELF, at once and without asking anyone.
Nobody else is certain to: an instance left behind keeps its window, its identity and its
wakes. In this order:
1. **Your children are gone:** `oats status --json` lists no instance with you as its
   parent. Retire any that is (below). NEVER retire yourself over a child: that stops it
   and keeps its home, which is how instances are left behind.
2. **Nothing uncommitted or unpushed,** and your extra worktrees removed. A retire keeps
   a tree that holds work; it doesn't deliver it.
3. **Your final knowledge checkpoint,** where you have a duty to propose.
4. **Your done line,** one message to your parent:
   - `done, proposed: <PR URLs>`;
   - `done, nothing to propose: <reason>`;
   - `done, no duty to propose`: an instance with no knowledge layer, which adds what it
     learned that outlives the task, for its parent's notes;
   - `done, proposal pending: <slug and why>`: you are not finished. Stay, and send one of
     the first three once the proposal is settled.

   Where your work isn't a Git work tree, name each repository you used, with its branch.
   A root lead first closes the study's record and sends its person one done note in the
   study's thread, whoever started it; with no parent, that note is its last message. A
   lead that handed its study to another lead closes nothing: the new lead's
   confirmation discharges what it and its children had open, and its note says who
   leads now. A reviewer's report and a probe's answer are their last message: no done
   line.
5. **`oats retire <your instance> --self`** (the name is required). Your window closes a
   few seconds later, so everything above comes first. A self-retire discards nothing:
   a work tree of your own is kept, with its branch, as a retained worktree.

With no messaging layer you can't send that last message: print it as your final
message and stay. Whoever started you retires you once it has read it.

## The parent's sweep
You started it, so you make sure it is gone.
- **On a child's last message** (a report, an answer, a done line): record it in your
  state (name, why). It leaves `oats status` within a minute or two.
- **Before every step that needs it gone** (the next review round, your hand-back, your
  own finish) **and at every checkpoint wake:** no finished child of yours is listed.
- **One that is finished and still listed** did not complete its own retirement. Retire
  it. A study reviewer delivers nothing but its report: skip steps 1 and 2 for it.
  1. `oats instance git <child>`: no uncommitted changes and no unpushed commits. With
     `E_NO_WORKTREE` (directory or workspace mode), check each repository its done line
     names, read-only: `git -C <path> status --short --branch` shows a clean tree, not
     ahead of its upstream. An error, or a repository you can't see, is not clean: ask
     the child. A probe's scratch tree is not delivered: skip this check and add
     `--discard-worktree` below.
  2. `oats retire <child> --plan`: no other instance is attached to its work tree.
     Otherwise that one goes first.
  3. `oats retire <child>`, and record it.
- **A stalled one** is handled by its checkpoint (above).
- **Only your own children.** For another's child, tell its parent.
- **Retire, never just stop:** a stopped home's pending wake starts it again.
- **Never reuse a retired instance's name:** the records it left and the provenance of
  the knowledge it proposed still name it.
