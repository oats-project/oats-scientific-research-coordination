# The OATS scientific research template

**This is a template: an organisation copies it and adapts it, and never pins it.** Its
repository is oats-project/oats-scientific-research-coordination. You copy the capabilities
and souls into your own workspace and shape them with [ADAPTING.md](ADAPTING.md).

Each way of working has a template of its own, named `oats-<way of working>-coordination`.
This one is for scientific research: studies that end in claims a person is accountable
for, from a proof to a computational analysis to a lab experiment. Engineering's is
oats-project/oats-engineering-coordination, and research that ends in a report is
oats-project/oats-research-coordination, which this one derives from.

## The way of working

**The design never splits a problem; it splits responsibility and context.** One study has
one lead, which holds the whole problem, on a fresh instance. Responsibility splits by
accountability: the scientist owns the question, the claims and the irreversible steps;
agents own the runs and the checks. Context splits across fresh, independent instances,
which for proper work are OATS instances the person can see; one that checks work runs on
a different model, and its verdict says what it checked. An analyst runs every arm and the
lead runs none: in the engineering and research templates a lead may build or read a small
piece itself, but here the one who writes the protocol and reads the claims never touches
the data, so blinding and the lock hold. This template differs from the other two there on
purpose. Every hand-off is a message about a finished artefact at its exact
reference. People give direction and decisions, as one card with a recommendation, with no
deadline and no default if they are silent.

What makes it science:
- **Exploratory and confirmatory modes.** The protocol sets the mode of each claim, and the
  label travels with it, from run record to claim package to anything published.
- **A rule fixed before the data.** A confirmatory claim's decision rule is approved by the
  scientist and locked by hash before any confirmatory data is seen, and no brief names the
  hoped-for direction, the scientist's included. A verdict that departs from the rule is a
  logged deviation.
- **A check that isn't LLM judgement** for every claim that leaves the group: a re-run, a
  locked held-out set, a formal proof check, a physical measurement or a human expert.
- **Human statistical sign-off** as each organisation's setting: on for clinical and
  policy-relevant work by default, off otherwise.
- **Agents drive instruments only through a gate on each action,** and by default every
  physical step goes to a person.
- **Study records are private by default.** Opening one is a one-way door, the scientist's,
  decided each time.

The template's roles:

- **Dispatcher,** for each person who wants a front door. It reads a request against the
  record, starts a fresh lead for it, introduces that lead once and steps aside. It is
  research's, at template-v2.1.1, changed only where it names the lead's children.
- **Study lead,** one soul per way of working that plainly differs, plus a generalist. Its
  instance plans the study with the scientist, writes the protocol, sends an analyst per
  arm (it runs none itself) and probes for prior art, citation support and alternative
  explanations, has each run reviewed and independently checked, assembles the claim
  package and lands it with the scientist. It never validates its own claim alone.
- **Analyst,** fresh for each arm: the lead's OATS child. It runs one arm of a locked
  protocol in a pinned environment, logs every attempt, failure and deviation, keeps full
  traces, never changes raw data, and iterates with fresh study reviewers on the code and
  the method; on a confirmatory arm, before anyone sees the result. Under the experimental
  profile it is the experimenter.
- **Study reviewer,** fresh for each review, on a model other than the analyst's: methods
  and statistics, an independent replication (on a different model family wherever there is
  one), leakage and selection, or citations. A verdict per claim with its evidence and
  what it checked.
- **Record steward,** one standing instance per study records repository. Mostly
  mechanism: it locks protocols by hash, keeps raw data write-once and the notebook,
  deviation log and lock record append-only, and merges a run record only when its landing
  conditions hold.

There is no developer, maintainer, code reviewer, researcher or verifier.

```
  scientist ──question──► dispatcher ──starts, introduces──► study lead
     ▲                                                       │ plan · protocol · claims
     ├── the protocol to approve, cards, the claims ─────────┤
     │   to accept, one done note, in the study's thread     │
     │                                    the locked protocol│      ▲ one run record each
     │                                                       ▼      │
     │                                     analysts, one per arm, in parallel
     │                                         │  ▲ a verdict per round
     │                                         ▼  │
     │                          study reviewers: methods · replication · leakage · citations
     │                                                       │
     │                     record steward: locks the protocol, merges each run record
     └── accepts the claim package: the claims have landed
```

[How the work flows](docs/how-the-work-flows.md) follows one study end to end, the cases
around it, and the evidence the design rests on.

## What's in it

- **`capabilities/`:** six capabilities, each an inject (the always-on briefing) plus the
  skills an agent loads when it needs them.
  - `oats.dispatcher`: `/dispatch`. Taken from the research template, template-v2.1.1,
    itself the engineering template's at template-v3.1.2, and changed only where it names
    the lead's children.
  - `oats.study-lead`: `/plan-the-study`, `/write-the-protocol`, `/send-a-helper`,
    `/assemble-the-claim-package`, `/land-the-claims`, `/hand-off`, `/ask-a-person`,
    `/land-on-agreement`, `/across-people`, `/findings-and-blocks`. The last five and
    `/send-a-helper` are the lead's shared skills, taken from the research template's
    research-lead (`/send-a-helper` and `/hand-off` at template-v2.1.1,
    `/land-on-agreement` at template-v2.1.0, the others at template-v2.0.1) and changed where they named a report, a researcher or the verifier
    ([CHANGELOG.md](CHANGELOG.md) lists each change).
  - `oats.analyst`: `/run-an-arm`, `/report-the-arm`, `/run-the-review-loop`,
    `/test-first`, `/diagnose-before-fixing`. The last three are adapted from the
    engineering template's developer, template-v2.2.0, with template-v3.0.1's Checked
    section, template-v3.0.2's knowledge checkpoint and template-v3.1.2's reviewer names in
    the review loop.
  - `oats.study-reviewer`: `/review-methods`, `/replicate`,
    `/review-for-leakage-and-selection`, `/check-citations`.
  - `oats.record-steward`: `/lock-the-protocol`, `/keep-the-records`,
    `/land-a-run-record`, with the exact git and standard-tool commands: no new runtime
    code.
  - `oats.landing-rules`: the organisation's landing rules and ownership record, and the
    one home of the safety rules every role follows (the hosts, secrets, untrusted text,
    what must not leave, the irreversible steps), in one small capability every soul
    composes. The template's rules are an example.
- **`souls/`:** the example roster: `dispatcher`, `study-lead`, `analyst`, `study-reviewer`
  and `record-steward`.
- **[ADAPTING.md](ADAPTING.md):** what to copy, the principles that never change, every
  adaptation point with its question and default, how to record the release you copied,
  and how a copy sits beside a research or engineering copy in one workspace.
- **[CHANGELOG.md](CHANGELOG.md):** what changed per skill in each template release, so a
  copy can take up a change.
- **[THIRD-PARTY-NOTICES.md](THIRD-PARTY-NOTICES.md):** the MIT-licensed skill collections
  two of the analyst's skills and its quality floor adapt rules from.

Every place where the template assumes something about an organisation carries one marker,
`<!-- adapt: <the question to ask> -->`. An adapted copy has none left.

## Using it

1. **Copy and adapt** with [ADAPTING.md](ADAPTING.md). Your organisation's setup expert does
   this at onboarding, and asks which profiles apply: theory, computational, experimental.
2. **Sync and start:** `oats sync`, then a dispatcher for each person who wants one, with
   who they are as its task:
   ```bash
   oats spawn dispatcher --name <person>-dispatcher --task-file <brief.md>
   ```
   Bring it your questions, or start a lead directly: `oats spawn study-lead --task
   "<question>"`. A lead starts the study records' record steward when none runs.

A messaging capability (for example `oats.aweb`) is strongly recommended: hand-offs are
messages that wake their recipient. Without one, reports land in session transcripts.

A git repository for the study records is required, private to the group, or your own
answer to the landing rules' "Study records private by default" marker: the record
steward's checks are git commands over it. A knowledge layer is recommended: it is where
the findings worth keeping go, dated, labelled with their mode and attributable.

`npm test` checks the template itself: every capability's `oats.json` and every soul against
the OATS schemas, the skills each inject names, the adapt markers and their list in
ADAPTING.md, that no text names a harness, a model or a personal path outside the cited
evidence, and that the souls load in real OATS kernels.

## Requirements
OATS ≥ 0.69.7, the floor every capability's `oats.json` declares, as in the research and
engineering templates: the texts use needs-input (`oats instance attention`), retires that
stop an instance's children first, `--same-work`, and the wake that holds while a dialog is
open (`wake-hold`) under every checkpoint. Even there, a home whose `wakeHold` reads
`unknown` takes no wake: its waiter hands the wait up, and where no level can set one, that
wait has no bound. `npm test` previews every soul in OATS 0.69.7 and main, and checks that
both list the kernel features the texts rely on.

Works with any harness OATS supports. No soul here names a harness or a model: the lead
picks its analysts' and its study reviewers' models at spawn, from the model families the
organisation names (ADAPTING.md), and a copy may pin them in a soul's `launch:` or in each
machine's `oats-local.yaml` `souls.launch`. Analysts and study reviewers are always OATS
children, never a lead's own subagents.

## License
MIT. The texts taken from the research and engineering templates are awebai's, under the
same licence. Two of the analyst's skills and its quality floor adapt rules from
MIT-licensed skill collections ([THIRD-PARTY-NOTICES.md](THIRD-PARTY-NOTICES.md)).
