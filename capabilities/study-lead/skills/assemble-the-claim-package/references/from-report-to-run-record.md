# From an arm's report to a merged run record

For each arm, in turn:
1. **Its methods review converged.** The analyst iterates with fresh study reviewers on the
   code and the method until a round passes the head, `APPROVE` or `APPROVE WITH NITS`; its
   report names that verdict, in the run record. A finding you overrule after the analyst's
   cap still needs a fresh reviewer's pass: your decision is never the pass. Where none
   passes the head, narrow the claim or stop the study, and record why on its record; never
   ask for unblinding, or take the arm further, without the pass. On a confirmatory arm,
   that loop runs before unblinding, on blinded, held-back or synthetic data, so every fix
   comes before anyone sees the result.
2. **Unblinding, for a confirmatory arm:** the scientist's irreversible step (your landing
   rules, "Irreversible steps, all the scientist's"). Send them one card (`/hand-off-and-ask`):
   the arm, the run record's head, the converged review, the locked rule it will be judged
   by. After their yes, tell the analyst to run the locked analysis on the real data; a
   change after that is a logged deviation.
3. **The checks, at the run record's head.** Send each study reviewer as your child, on a
   model other than the analyst's (`/orchestrate-agents`, references/probes.md, "Every
   child's model"), its brief its task, named for its check with its role last (`holdout-rerun-reviewer`), a name no
   instance has had (a repeat of the same check names its round,
   `holdout-rerun-r2-reviewer`):
   ```bash
   oats spawn study-reviewer --parent "$OATS_INSTANCE" --same-work --name <check-slug>-reviewer --task-file <check.md>
   ```
   - **the independent check the protocol names for the arm:**
     - *a re-run:* a study reviewer briefed for a replication, on a family none of the arm's
       analysts runs on where the organisation has one: it re-runs from the protocol and the
       raw data in a clean environment and reports both runs' numbers against the protocol's
       comparison rule. That is the check that isn't LLM judgement only because the rule,
       not the replicator, decides agreement;
     - *a formal proof check:* a study reviewer briefed for a replication by the checker
       the protocol names: it runs the checker at its version, in the clean environment, on
       the proof at the run record's head, and its verdict is the checker's exit status and
       the statement it checked against the protocol's;
     - *an expert referee:* hand the referee the protocol names the proof at its exact
       version (the run record's head) and the statement to check, and nothing of the
       hoped-for result or your own view (`/hand-off-and-ask`). Their signed verdict, with its
       link, goes to the analyst like any other, below;
   - **a leakage and selection review,** on every confirmatory arm, whatever the profile,
     and on any exploratory arm whose claim may leave the group.

   Brief each from [reviewer-brief.md](reviewer-brief.md). Send each
   verdict on to the analyst, who commits it under the run record's `reviews/`, naming the
   head it reviewed. Before you wait, set its checkpoint (`/wait-and-retire`).
4. **Act on each verdict.** First, check it is complete: it says what it checked (the
   skill's Checked section or lines). A verdict without that is not a check yet: send the
   check to a fresh study reviewer. Agreement holds: the run's
   checks are in its record. A disagreement is never yours to overrule: you are not
   independent of the plan. Send the arm, the verdict's evidence and your reason to a fresh
   study reviewer, whose verdict stands, or carry the claim to the package as disputed, with
   both sides. A fix to the run is a new head, and the checks run again there.
5. **Your note:** once its checks agree at one head and the run follows the locked protocol
   (or each departure is a logged deviation), write `VERIFIED at <head>: <the verdicts, one
   line each>` on the study's record, and tell the analyst it may open the run record's PR to the study records at
   that head (with no forge, push its branch at that head). Once it sends you the link and
   the head, ask the record steward by message to merge the run record there; the steward
   merges it once your landing rules' "What landed means" holds for a run, from the record
   itself, never from your note alone (`/write-the-protocol`, "Find the record steward").
   You never merge. Your note carries to a new head only where every review it lists
   carries there too (`/landing-rules-detail`, "What carries to a new head"); otherwise
   read the delta and write it again at the new head. Tell the analyst the merge commit: it then
   sends its done line and retires itself.

Each study reviewer retires itself once its verdict is sent: one reviewer, one report.
Check that it is gone (`/wait-and-retire`, "The parent's sweep").
