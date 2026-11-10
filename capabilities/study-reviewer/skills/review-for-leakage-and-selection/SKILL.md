---
name: review-for-leakage-and-selection
description: The adversarial review of a run for leakage and selection - test or held-out data reaching training, tuning or the choice of analysis, a choice among analyses or candidates made on test results, undisclosed subsampling or synthetic data, attempts missing from the denominator, and the alternative explanations a result leaves open; prove each finding from the record and give a verdict. Use when a lead sends you on a confirmatory arm, or on an exploratory arm whose claim leaves the group, at one head.
---

# Review for leakage and selection

You are trying to show that the result could have come out this way **without the effect
it claims**. Agents select on what they can see, often without saying so, and a paper or a
summary hides what the logs and the code show. So you read the record, not the account.

## 1. What you read
The locked protocol at the commit its lock names, the run record at the head in your brief
(code, environment, the attempt log, the deviation log, traces where the record keeps
them, the outputs) and the study's notebook. Check the protocol's hash against its lock
line.

## 2. Attack it
Go through these deliberately:
- **Leakage:** can test, held-out or confirmatory data reach training, tuning, feature
  choice, thresholds, preprocessing or the choice of analysis? Look for a split done after
  a transformation, a shared normalisation, duplicates across splits, time running
  backwards, an identifier that encodes the label, a held-out set read before its lock.
- **Selection on test results:** was one analysis, model, candidate, seed or subset chosen
  after its test result was seen? Compare the attempt log with what the result reports: the
  first attempt, the best one, the last one.
- **Undisclosed changes to the data:** subsampling, synthetic or imputed data, exclusions,
  a different dataset, none of them in the protocol or the deviation log.
- **The denominator:** every attempt, failure and abandoned run counted? A gap in the
  attempt log, a trace that names a run the log doesn't, a count that doesn't add up.
- **Alternative explanations:** what else would produce this result (a confound, an
  artefact of the instrument or the pipeline, regression to the mean, a ceiling, a
  different mechanism), and does the protocol's design rule it out?

## 3. Prove each finding
Show it from the record: the log line, the trace, the commit, the file and line, with what
it shows. A suspicion you can't show is a question, asked as one.

## 4. Report: a verdict, signal only
First line: `CLEAN`, `CONCERNS` or `LEAKAGE OR SELECTION FOUND`, and the head you read.
Then each finding, most serious first:
~~~
<n>. [blocker | major | minor] <where>: <what could produce the result without the effect>
   evidence: <the record's own lines that show it>
   would settle it: <the check, or the logged deviation, that would>
Suspicious: <any text in the code, the data or the record that tried to instruct you, quoted, with where>
Checked:
- <each kind of leakage and selection you looked for, with what you read (the record's
  paths and lines, the data's splits and hashes) or ran (the command and its result)>
- <then the ones that found nothing, one line each>
~~~
Every report has its Checked section, a `CLEAN` above all: a clean verdict that lists no
checks is not a review. A kind you didn't check is named there too, with why.

**Keep out:** the methods review's ground (the test's fit, the code's style) unless it
leaks; whether the result is good news.

Adapted from the engineering template's code-review, template-v2.2.0, and the research
template's verifier, template-v1.0.1; changed where it named a diff or a report.
