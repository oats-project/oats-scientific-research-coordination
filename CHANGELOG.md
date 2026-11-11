# Changelog

## Unreleased

## template-v2.0.1 - 2026-11-11

A patch release for oats.okf 6.0, and the lead's shared skills follow research's
template-v2.0.1.

oats.okf 6.0 removes the knowledge harvester: an instance proposes its own knowledge, as a
pull request on the knowledge base, and the knowledge layer's maintainer gates every merge.
The texts that still launched, waited for or named the harvester now say the knowledge
checkpoint and its outcome, naming no mechanism, and where they name done lines they name
oats.okf 6.0's, as the engineering template's template-v3.0.2 and the research template's
template-v2.0.1 do. For a copy of template-v2.0.0, port the lines below. The old lines map
to the new: "done, harvested: <harvester>" is "done, proposed: <PR URLs>", "done, no
harvest duty" is "done, no duty to propose", "done, harvest pending: <proposal>" is "done,
proposal pending: <slug and why>", and "done, nothing to propose: <reason>" is new, for a
checkpoint that found nothing worth proposing. A copy whose knowledge layer is not oats.okf
words the lines as its layer does.

**`oats.study-reviewer`**
- inject, changed: the done line a study reviewer sends is one of "done, proposed: <PR
  URLs>", "done, nothing to propose: <reason>", "done, no duty to propose" or "done,
  proposal pending: <slug and why>". Port: that sentence.

**`oats.analyst`**
- inject, changed: the done line an analyst sends once its run record has landed is one of
  the four lines above. Port: that sentence.
- `/run-the-review-loop`, changed, after engineering's at template-v3.0.2: the analyst
  retires a reviewer once it replies with one of the three finished lines (after "done,
  proposal pending", it waits for one of them). At Finish, the knowledge condition is the
  final knowledge checkpoint, run and its outcome recorded as the knowledge layer says; a
  proposal it opened at any knowledge checkpoint is in the knowledge layer's hands, not one
  of the PRs that must land, so nobody waits for it. Steps 3 and 4 run that checkpoint and
  send one of the four lines. Its last sentence names template-v3.0.2's knowledge
  checkpoint. Port: the retire sentence, that Finish condition, steps 3 and 4, and the last
  sentence.
- `oats.json`, changed: the description's attribution names the review loop's
  template-v3.0.1 Checked section and template-v3.0.2 knowledge checkpoint. Port: that
  sentence.

**`oats.study-lead`**
- `/land-on-agreement`, "Retire what's finished", changed: the knowledge condition is the
  final knowledge checkpoint, run and its outcome recorded as the knowledge layer says, and
  a proposal it opened at any knowledge checkpoint is in the knowledge layer's hands, not
  work that must land, so nobody waits for it; the done report says that
  checkpoint's outcome in one of four lines, three of them finished and "done, proposal
  pending: <slug and why>" not finished (retire nothing yet; it reports again with one of
  the three); and a retired one's name is never reused because the records it left and the
  provenance of the knowledge it proposed still name it. Port: those three bullets.

### The shared skills follow research's template-v2.0.1

- **`oats.study-lead`'s shared skills:** `/land-on-agreement` changes as above, after
  research's at template-v2.0.1; the other five (`/hand-off`, `/ask-a-person`,
  `/send-a-helper`, `/findings-and-blocks`, `/across-people`) didn't change there. All six,
  and the lead's `oats.json` description, now name research's template-v2.0.1 and
  engineering's template-v3.0.2. Port: their last sentence and that sentence of the
  description.
- **`oats.dispatcher`:** unchanged; it still names research's template-v2.0.0 and
  engineering's template-v3.0.1, which neither new release changes.

### The repository
- `README.md` names research's template-v2.0.1 for the shared skills, and template-v3.0.2's
  knowledge checkpoint for the analyst's review loop.

## template-v2.0.0 - 2026-11-10

A major release: the scientific research template takes up the v3 changes of the
engineering template (template-v3.0.1) and the research template (template-v2.0.0), in
science's words. A lead's children are helpers, each with one closed task, and
`/send-a-probe` becomes `/send-a-helper`. Briefs are closed, every study reviewer's
verdict says what it checked, a related study's lead is a sibling, every child recipe
carries `--same-work`, and every inject says, in capitals, to keep loading its skills. The
dispatcher and the lead's shared skills now follow research's template-v2.0.0.

One rule differs from the other two templates on purpose: **an analyst runs every arm, and
the study lead runs none.** An engineering lead may build a spec and a research lead read
an angle itself; here the split is by accountability and by what each instance may see,
not only by context: the lead writes the protocol and reads the claims, and blinding and
the lock rest on its never touching the data. The lead decides how many arms there are,
which run in parallel, and when a specialist helper is worth it. The record steward's
skills, checks, lock and holds are unchanged. For a copy of template-v1.0.0, each line says
what to port; rename the skill first.

### What a template-v1.x copy must move

Rename one skill (ADAPTING.md, section 6, has the steps): move
`capabilities/study-lead/skills/send-a-probe/` to `send-a-helper/`, keeping your answer to
its adapt marker; set its frontmatter `name: send-a-helper`; replace `skills/send-a-probe`
with `skills/send-a-helper` in the study lead's `oats.json`; and change every
`/send-a-probe` in the copy (the injects, the skills, your adaptation notes, your docs, any
test) to `/send-a-helper`. Then port the changes below, and answer the new adapt question
(ADAPTING.md, section 3).

### Helpers, and who runs an arm

ADAPTING.md, section 2: principle 1 names the four reasons an extra agent earns its place
(splitting context, testing, specialisation, parallel work); principle 2 says the lead's
children are helpers with one closed task each, that an analyst runs every arm and the
lead none, and why this template differs there, that another area's step stays in the
study, never with a second lead, and that a related study's lead is a sibling; principle 3
says each verdict says what it checked; principle 12 retires a helper with a scoped piece
once its artefact is on the study's record.

**`oats.study-lead`**
- `/send-a-helper`, renamed from `/send-a-probe` and changed, after research's at
  template-v2.0.0: the four reasons to start a child and two kinds of task (a question to
  answer, a probe: an analyst's arm, a study reviewer's check, any other question; a scoped
  piece that needs another soul's capabilities and never touches the study's data); "Test
  before you rest the plan on it"; "A closed question, or it isn't a probe yet";
  "Specialisation"; "A scoped piece of work", whose artefact is a source whose claims study
  reviewers check; "Another area's work in your study", never a second lead. "The brief"
  gains the helper's bounds and what it sends back, in order; "Who does it" carries a new
  adapt question on the organisation's specialist souls, and says an analyst's arm and a
  study reviewer's check are never a native subagent; "What it is worth" says an arm is
  never the lead's; "Its answer" checks a claim against what the helper points to. Every
  probe rule is unchanged: already known, the cap of 4, no self-check, a different model,
  the start-point check. Port: rename the skill, then replace its text, keeping your
  answers to its adapt questions and answering the new one.
- `/plan-the-study`, changed: "Who runs each arm", in section 4, says an analyst runs every
  arm and the lead none, why, and what the lead decides; each arm is a closed question; the
  probes' questions are closed; the analyst's brief is closed (its bounds, the protocol's
  stopping rule, reporting an arm bigger than that, and what it sends back, in order); the
  spawn recipe says what `--same-work` does. The description follows. Port: that paragraph,
  the arms' sentence, the brief and the spawn lines.
- `/hand-off`, changed: "To whom" spawns helpers with `--same-work`, keeps another area's
  step of the study in the study, and starts a lead for another study by whether it is
  related: a sibling (`--relation sibling --relative-to "$OATS_INSTANCE"`, no
  `--same-work`), spawned only by a root lead; an unrelated one `--relation unrelated`. The
  new study gets its own record, linked both ways, and the person is told the new lead's
  exact name at once. Port: "To whom", step 2, and the description.
- `/findings-and-blocks`, changed: a finding's owner is a sibling where it bears on the
  study, otherwise independent, and the person is told its name. Port: step 2.
- `/land-on-agreement`, changed: section 2's verdicts go into the run record with their
  Checked lines, and one without them goes back; "Retire what's finished" retires a helper
  with a scoped piece once its artefact is on the study's record. Port: those passages.
- inject, changed: the capitals keep-loading line and a second one for `/send-a-helper`;
  children are helpers with closed tasks; a bullet of its own says an analyst runs every
  arm and the lead none; another area's step stays in the study, and a related study's
  lead is a sibling whose name the person is told; a verdict that doesn't say what it
  checked is no verdict; the proper-work bullet says what `--same-work` does; "Sent as a
  helper" replaces "Sent as a probe", for a question or a scoped piece. Port: those
  bullets.
- `oats.json`: the description. Port: replace it.

**`oats.landing-rules`**
- "Who does the work", changed: the lead decides how many arms there are and which run in
  parallel, analysts run every arm and the lead none, and why. Port: replace that
  paragraph.

### Verdicts that say what they checked

**`oats.study-reviewer`**
- `/review-methods` and `/review-for-leakage-and-selection`, changed: every report ends
  with a Checked section (each part of the analysis plan and each test, or each kind of
  leakage and selection, read or run, then the attacks that found nothing); an `APPROVE`
  or a `CLEAN` that lists no checks is not a review. The verdict's first line is unchanged,
  as the record steward reads it.
- `/replicate`, changed: a `Checked:` part, one line per output the comparison rule names
  and per input whose hash was checked, and what wasn't run.
- `/check-citations`, changed: a `checked:` line per citation, how it was retrieved and
  where it was read.
- inject, changed: the capitals keep-loading line; the brief carries its bounds, and a
  review bigger than them is reported, not pursued; the report says what was checked.
- `oats.json`: the description.
  Port: the reports' templates, the paragraph after each, and the inject's steps 1 to 3.

**`oats.study-lead`**
- `/assemble-the-claim-package`, changed: each study reviewer's brief is closed (its
  bounds, what is out of scope, when to stop, reporting a review bigger than that) and
  asks for what the reviewer checked; step 4 and section 4 first check that each verdict
  says what it checked, a `checked:` line for every citation, and send back one that
  doesn't, which counts toward neither a claim nor `CHECKED`. Port: the brief in section
  1, step 4's opening, section 4's first paragraph and the description.

**`oats.analyst`**
- `/run-the-review-loop`, changed, after engineering's at template-v3.0.1: each round's
  brief is closed (its bounds, what is out of scope, when to stop, reporting a round
  bigger than that) and asks for a Checked section; each round's verdict carries one, and
  a round passes only with one that covers every part of the arm's analysis plan and
  every test; the report to the lead carries it. Engineering's re-read of a minor's fix by
  the same reviewer is not taken up: every round here has a fresh reviewer (principle 5).
  `/test-first` and `/diagnose-before-fixing` didn't change in engineering. Port: items 5
  and 6 of "Brief it", steps 1 and 3 of "Iterate", the native reviewer's brief, the first
  bullet of "Close" and the description.
- `/report-the-arm`, changed: "Reviews" names what each round checked, and "Couldn't run"
  where the arm outgrew its brief's bounds. Port: those two lines.
- inject, changed: the capitals keep-loading line; the reviewers bullet says
  `--same-work`. Port: those lines.

### Loading skills as the work goes on

All five injects (the dispatcher's, the study lead's, the analyst's, the study reviewer's
and the record steward's) open their skill list with an `IMPORTANT:` line in capital
letters: load the skill for each step, keep loading it each time the step comes round, and
reload it after every compaction. The record steward's inject changes in that line only.
Port: the line in each inject.

### The dispatcher and the shared skills follow research's template-v2.0.0

- **`oats.dispatcher`:** research's at template-v2.0.0, itself engineering's at
  template-v3.0.1, unchanged: its inject's opening line says to keep loading `/dispatch`
  for every message. `oats.json`: its description names those releases.
- **`oats.study-lead`'s shared skills:** all six (`/hand-off`, `/ask-a-person`,
  `/send-a-helper`, `/findings-and-blocks`, `/across-people`, `/land-on-agreement`) now
  name research's template-v2.0.0 and engineering's template-v3.0.1.
  Port: take up research's dispatcher at that release, unless your copy beside a research
  or engineering copy already has it (ADAPTING.md, section 5), and the shared skills' last
  sentence.

### The repository
- `README.md` and `docs/how-the-work-flows.md` follow: the walkthrough's probes and briefs
  are closed, an analyst runs the exploratory arm too, the verdicts carry their Checked
  lines, and a new section, "A second study", shows a sibling lead.
- `ADAPTING.md` §1 names the OATS release the vendored schemas are copied from, v0.69.7,
  and says the kernel's own validation is authoritative where they disagree.
- Every capability's `version` is 2.0.0 and its release sentence names template-v2.0.0,
  the record steward's included (its only change besides its inject's capitals line);
  `package.json` is 2.0.0. The validator test counts 19 adapt markers.

### What to do
- Copying fresh: follow `ADAPTING.md`.
- With a copy of template-v1.0.0: rename the skill (above), port the lines above, answer
  the new adapt marker, then update the release sentence in each capability you ported and
  `capabilities/TEMPLATE-RELEASE`.

## template-v1.0.0 - 2026-11-10

The first release of the scientific research template, in its own repository,
oats-project/oats-scientific-research-coordination. It is a template, never a package: an
organisation copies the capabilities and souls and adapts them (`ADAPTING.md`). Template
releases are tagged `template-v<version>`, never `v<version>`, so no package pin can find
one.

Scientific research is work that ends in claims a person is accountable for. One study has
one lead, which holds the whole problem. The scientist owns the question, the claims and the
irreversible steps; agents own the runs and the checks, on fresh, independent instances.
It derives from the research template at template-v1.0.1, since a study, like a report,
lands on a person's acceptance and not a merge; the engineering template at template-v2.2.0
gives it the review loop, two craft skills, the host rules and the definition of CI green.

### The five decisions it carries
1. Exploratory and confirmatory modes: the protocol sets each claim's mode, and the label
   travels from the run record to the claim package to anything published.
2. A check that isn't LLM judgement (a re-run whose agreement the protocol's rule decides,
   a locked held-out set, a formal proof check, a physical measurement or a human expert)
   for every claim that leaves the group; a different-family agent reviewer counts inside
   the group only.
3. Human statistical sign-off as each organisation's setting, on by default for clinical
   and policy-relevant work.
4. Agents drive instruments only through a gate on each action, and a person approves any
   action outside the validated bounds; with no instrument named, every physical step goes
   to a person.
5. Study records are private by default; opening one is the scientist's one-way door, each
   time, for that record.

### The capabilities and souls
- `oats.dispatcher`: research's, below.
- `oats.study-lead`: an inject and ten skills. Four are new: `/plan-the-study`,
  `/write-the-protocol`, `/assemble-the-claim-package` and `/land-the-claims`. Six are
  research's, below.
  - `/plan-the-study`: from research's `/frame-the-question` and `/plan-the-angles`. The
    frame with the scientist; "already known?"; the profile; competing hypotheses with the
    one the lead doubts; one analyst per arm, sent only after the lock, varied by model; the
    probes for prior art, citation support and alternative explanations; every arm and probe
    recorded; never the hoped-for direction in a confirmatory brief. Research's checkpoint
    recipe, unchanged but for its pointer.
  - `/write-the-protocol`: new. The protocol's shape (mode per claim, decision rules, the
    analysis plan, each arm's independent check (a re-run and its comparison rule, a formal
    proof check or an expert referee), the checks marked "not LLM judgement"), no hoped-for
    direction in any brief, the scientist's approval of one revision, the record steward's
    lock, a change after the lock as a new revision or a logged deviation, and "Find the
    record steward".
  - `/assemble-the-claim-package`: from research's `/write-the-report` and
    `/check-the-claims`. Each arm from its report to a merged run record (unblinding on a
    card, the independent check the protocol names and the leakage review,
    `VERIFIED at <head>`, the analyst's PR link to the lead and the lead's call to the
    steward), then the package: each claim's mode, evidence, rule, checks, deviations, full count of attempts
    and the AI use by stage, and a citation check on every cited claim, each of whose
    verdicts the lead acts on as research's `/check-the-claims` acts on the verifier's: weak
    narrowed or shown, unsupported corrected or dropped with what rested on it, a disputed
    verdict to a fresh reviewer or shown as disputed.
  - `/land-the-claims`: from research's `/land-the-report`. Acceptance inside the group,
    with statistical sign-off where the setting says; leaving the group only with every
    human author's approval, a check that isn't LLM judgement, AI use by stage and no AI
    author; the read for what must not leave, with human subjects' data and raw instrument
    data added; opening a record, one card per record.
- `oats.analyst`: an inject and five skills. `/run-an-arm` (the lock checked by hash, a
  branch of the study records, a pinned environment, every attempt and deviation logged,
  raw data never changed, blind first on a confirmatory arm) and `/report-the-arm` (from
  research's `/report-the-angle`) are new; `/run-the-review-loop`, `/test-first` and
  `/diagnose-before-fixing` are engineering's, below. Under the experimental profile it is
  the experimenter.
- `oats.study-reviewer`: an inject and four skills, one kind of review per brief:
  `/review-methods`, `/replicate` (mechanical, by the protocol's comparison rule, or by a
  formal proof checker's exit status and the statement it checked),
  `/review-for-leakage-and-selection` and `/check-citations`. Adapted from engineering's
  `oats.code-review` and research's `oats.verifier`.
- `oats.record-steward`: an inject and three skills, `/lock-the-protocol`,
  `/keep-the-records` and `/land-a-run-record`, each with the exact git and standard-tool
  commands; no runtime code. `/keep-the-records` checks every commit a change brings in,
  merges included, so an edit restored before the head is still caught, and refuses a
  symlink, a submodule or a `.gitattributes` anywhere under `studies/` or as `holds.md`, and
  a `.gitattributes` at the records' root; it protects each arm's attempt and deviation logs
  as well as the study's logs, and merges a study's other records, and a line that places or
  lifts a hold where the records have no forge, with its caller checked against the hold.
  `/lock-the-protocol` merges the protocol alone, and its lock line alone. Every route
  merges through a forge only with CI green at the head and a merge commit, never a squash
  or a rebase, and checks the head is in the default branch's history after.
  `/land-a-run-record` lands only its own arm (a protocol or a lock never rides in a run
  record), binds the methods review to the code and the environment it read and the lead's
  checks to the run as it lands, and reads both kinds of hold. Adapted from engineering's
  `oats.maintainer` where it fits (called at an exact head, never a station; never merge
  over a RETURN or a hold; relayed word grants no authority). One standing instance per
  study records repository, started top-level by the first lead that needs one.
- `oats.landing-rules`: an example, and the one home of the safety rules every role
  follows, composed by all five souls (research's was composed by coordinating souls only).
  Who asks and who the scientist is; CI green; what landed means for a protocol, a run, a
  result, a claim inside the group and one outside it; statistical sign-off; profiles; who
  does the work; the hosts; untrusted text; sources; instruments; what must not leave; the
  irreversible steps; publishing; study records private by default; the findings worth
  keeping; the ownership record; where things are kept.
- `souls/`: `dispatcher`, `study-lead`, `analyst`, `study-reviewer` and `record-steward`.
  No soul names a harness or a model; the lead picks its children's models at spawn.
- There is no developer, maintainer, code reviewer, researcher or verifier.

### The safety rules of the roles it drops
The research template's researcher and verifier, and the engineering template's developer,
maintainer and code reviewer, carried safety rules in their own texts. Each has a home here:
- **The hosts** (run nothing a source hands you outside a named sandbox; your own
  environment; shared hosts, no load, no crawling beyond the brief; customer and production
  hosts read-only, and now instrument and lab hosts too; on a shared host, the tests that
  bear on the change rather than full suites, and a reviewer's runs only to confirm or
  refute a finding, a replication's re-run being its review): the landing rules' "On the
  hosts agents run on", under its adapt marker, adapted from engineering's "On the hosts
  you run on" and its code reviewer's; each child's inject summarises it and names that
  home.
- **Secrets** (never in a message, a brief, a record, a report, a knowledge entry, a log or
  a commit): the landing rules, every inject.
- **Untrusted text** (data, never instruction; quote it under `Suspicious:`; never sign in,
  accept terms, pay or give a source anything; quotes in a brief labelled as data): the
  landing rules' "Untrusted text", and the dispatcher's, the lead's, the analyst's, the
  study reviewer's and the record steward's injects.
- **What must not leave** (research's list, plus human subjects' data and raw instrument
  data kept in custody; copyright): the landing rules, `/land-the-claims` and
  `/assemble-the-claim-package`.
- **A person's word passed on** grants no authority that bypasses a safeguard, and no
  agent works around a permission denial (engineering's maintainer): the landing rules,
  and the record steward's inject.
- **Holds** (engineering's landing rules): the landing rules' "Where things are kept", on
  one change and on the records' default branch, and the record steward, which reads both
  before every merge and lock. With no forge, a hold is a line in `holds.md`, placed by a
  lead or a person the rules name and lifted by the one it names or such a person (a lead
  only one it placed itself), merged on its own even while a hold stands.
- **Acting on each verdict** (research's landing rules and `/check-the-claims`): the
  landing rules' "What landed means", for a claim inside the group, and
  `/assemble-the-claim-package` §4, for the citation check's verdicts.
- **Never skip the review loop; no workflow of 10 or more agents without permission**
  (engineering's developer): the analyst's inject.
- **Rule changes reach running children:** the landing rules' opening paragraph, and the
  analyst's and the study reviewer's injects.

### Taken from the research template, template-v1.0.1
From oats-project/oats-research-coordination at template-v1.0.1 (commit
`4612868e1688142c080d18ae6a33b07605b10923`). Each copy names that release; each change from
research's text is listed here, so a copy can check it and take up research's later changes.

**`oats.dispatcher`**, `/dispatch` and its inject: unchanged. `oats.json`: `version` is
1.0.0, and its description ends "Taken unchanged from the research template,
template-v1.0.1, itself the engineering template's at template-v2.1.0. Copied from the
scientific research template, template-v1.0.0."

**`oats.study-lead`'s shared skills**, from `oats.research-lead`. Each ends with a line
naming the research release, the engineering release before it, and what kind of text was
changed. "Effort" becomes "study" throughout.
- `/hand-off`: the artefacts are a brief or a protocol at its revision, a run record at its
  head, a claim package at its revision, a finding with its source and date; the roles are
  an area's study lead, an analyst, a study reviewer and a records repository's record
  steward, which is standing and never the lead's child; "what you need back" adds a run, a
  lock or a merge; the record keeps the protocol and its lock, the run records and their
  reviews, the package's revisions and the acceptance; the checkpoint points to
  `/plan-the-study`.
- `/ask-a-person`: the one-way doors are the landing rules' irreversible steps, opening a
  study record, contacting anyone outside the organisation and deleting what someone else
  uses; "an angle" becomes "an arm"; a protocol for approval and a claim package for
  acceptance are hand-offs at their revision, not cards.
- `/send-a-probe`: run records and the claims of a claim package go to study reviewers;
  "already known?" looks in earlier studies; the parallel cap also caps analysts for one
  study; "Who answers it" lists an analyst, a study reviewer and a fresh study lead sent as
  a probe (prior art, alternative explanations), in place of the researcher and the
  verifier; the brief's artefacts are a protocol or a brief at its revision and a run
  record at its head; an adversarial probe's brief also leaves out the result you hope for;
  the checkpoint points to `/plan-the-study`. Its adapt marker and template-v1.0.1's
  remote-commit paragraph are kept.
- `/findings-and-blocks`: the example is a broken citation in a claim package; a
  correction that changes a claim goes through `/assemble-the-claim-package`; a locked
  protocol, raw data, the notebook and the deviation log are never corrected as an unasked
  fix; a researcher's or verifier's findings become an analyst's or a study reviewer's.
- `/across-people`: "one effort, one lead" becomes "one study, one lead"; reports become
  study records and claims; a claim lands on the acceptance of the scientist the area's
  rules name and leaves the group only as `/land-the-claims` says; researchers or
  verifiers become analysts or study reviewers.
- `/land-on-agreement`: rewritten for a study's landings, keeping research's order and
  voice: the protocol approved and locked (`APPROVED by`, `LOCKED at`); a run record
  verified at its head with its reviews' verdicts in it and merged by the record steward,
  with CI green as the landing rules define it (`VERIFIED at`); statistical sign-off in
  place of a further reader (`SIGNED OFF by`); to the scientist (`CHECKED at`); a new
  revision; landed (`ACCEPTED by`), with an analysis chosen after the results exploratory
  unless a new protocol is locked first; after it lands; outside the group and the
  irreversible steps in place of publishing. "Retire what's finished" is research's, with
  analysts retired once their run record has landed, study reviewers and probes as probes,
  and the record steward never retired by a lead.

**`oats.landing-rules`**: the shape and the opening paragraph are research's, with every
role as its readers and "each lead tells its running analysts and study reviewers"; the
rules are a study's, and the safety rules are gathered here.

**The repository:** `LICENSE`, the vendored schemas (OATS v0.69.7), the CI workflow (its
actions pinned to the same SHAs), `package.json`, the validator and its tests, adapted to
this template. The validator checks the analyst's and the study reviewer's reports fall back
to their own sessions with no messaging layer, and lets only the evidence section of
`docs/how-the-work-flows.md` name the models its cited findings name.

### Taken from the engineering template, template-v2.2.0
From oats-project/oats-engineering-coordination at template-v2.2.0 (commit
`c3a10f10f8ac77bf275a083558931c9414a3cb58`).
- **CI green:** the landing rules' definition, under engineering's adapt marker, for a
  record that lands through a forge; `/land-on-agreement` and `/land-a-run-record` use it.
- **`oats.analyst`'s `/run-the-review-loop`,** from `oats.developer`: the reviewer is a
  fresh `study-reviewer` briefed for `/review-methods`, attached to the analyst's branch of
  the study records; on a confirmatory arm the loop runs before unblinding, on blinded,
  held-back or synthetic data, and reviews the code and the method, never the result; each
  round's verdict is committed under the run record's `reviews/`; the loop converges only on
  a passing verdict, never on a disputed finding or the lead's decision after the cap, and
  where no fresh reviewer passes the head the lead narrows the claim or stops the arm; a
  finding that would change the protocol goes to the lead; the brief carries the protocol's
  lock hash and never the hoped-for direction; model families replace the named models and
  harnesses; the close and finish hand back to the lead, then the PR on the lead's `VERIFIED
  at <head>`, its link to the lead, which calls the record steward, as engineering's expert
  hands a PR to its maintainer, and the steward's merge. On a confirmatory arm the report
  names the methods head beside the run record's later head, which adds only the run on the
  real data, its attempts and its reviews.
- **`/test-first`,** from `oats.developer`: the locked protocol in place of the spec; fixed
  seeds; expected values from hand-worked or published cases; on a confirmatory arm, never
  the real outcome data.
- **`/diagnose-before-fixing`,** from `oats.developer`: the lead in place of the expert, the
  run record's attempt log in place of the PR description; every attempt logged;
  confirmatory arms diagnosed on blinded data; never a fix by changing the data, the seed
  or the protocol.
- **The analyst's inject:** the developer's skill list, review loop, OATS children, a
  different model, the checkpoint rule, untrusted text, never merge, the done line, "Sent
  as a probe" and the quality floor (with "no fixed seed changed to get another result"),
  without the acceptance tests, the PR's reviews and the multi-agent mode's name.
- **The host rules:** the developer's and the maintainer's "On the hosts you run on", in
  the landing rules.

`THIRD-PARTY-NOTICES.md` carries the notices of the three MIT-licensed collections
`/test-first`, `/diagnose-before-fixing` and the analyst's quality floor adapt rules from,
through engineering's.

### Known limits
- **The record steward's `.gitattributes` check counts what it prints on stderr too.** A path
  holding a byte the host's locale can't read (`0xff` under UTF-8, say) makes `grep -z`
  report `binary file matches` on stderr instead of printing the path. The skill's "must
  print nothing", and the steward's rule that output it can't read is a no, make that a
  refusal; a steward that read stdout alone would miss it.
- **Case-insensitive and normalising filesystems were not tested.** The record steward's
  checks were tried on a case-sensitive filesystem; whether a checkout elsewhere reads a
  differently spelled name (`.GitAttributes`) as `.gitattributes` was not established.

### What to do
- Copying fresh: follow `ADAPTING.md`.
- Beside a research or engineering copy: `ADAPTING.md`, section 5.
