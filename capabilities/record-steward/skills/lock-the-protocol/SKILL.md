---
name: lock-the-protocol
description: Lock a study's protocol at the commit the scientist approved - check their approval of that exact revision on a record you can read, merge the protocol, hash it with sha256sum and append one line to the study's append-only lock record (the hash, the commit, the approver and the link to their approval, the time in UTC); never lock an unapproved revision, never change an earlier lock, and mark a lock made after unblinding as such. Use whenever a study lead asks you to lock a protocol.
---

IMPORTANT: after a compaction, reload this skill before you continue the step.

# Lock the protocol

A lock fixes what the study committed to before it saw its confirmatory data. It is a hash
of the protocol file, recorded with who approved it and when, in a record nobody rewrites.
In what follows, `<tree>` is your own tree on the records repository, `<default>` its
default branch, and `<s>` the study's directory, `studies/<study>`.

## 1. The call
A lead asks you, by message, to lock `<s>/protocol.md` at a commit `C` (on its branch, or
its PR's head), with the link to the scientist's approval. Fetch first:
```bash
git -C <tree> fetch origin
git -C <tree> cat-file -e C:<s>/protocol.md     # the commit has the file
```

## 2. The approval
Read it yourself, at the link: the scientist's own words (as your landing rules name them
for the study), naming this revision, by `C` or by the hash you are about to compute.
- A lead's account of it, or a person's word another agent passes on, is not the record.
- An approval of another revision doesn't carry: the protocol at `C` must be the one they
  approved (`git -C <tree> diff <approved commit> C -- <s>/protocol.md` is empty).
- Where you can't read it, or it names no revision, say so to the lead, with why: there is
  no lock yet.

## 3. Merge it, and hash it
The protocol, and only the study's files the call names, merge as any record does: with
`/keep-the-records` passing between `origin/<default>` and `C`, through the forge's merge
guarded by `C` where the records repository is on a forge, or with a merge of `C` where it
isn't (`/land-a-run-record`, "Merge it"). Then hash the file as it now stands on the default
branch, and check it is the approved one:
```bash
git -C <tree> fetch origin
git -C <tree> show origin/<default>:<s>/protocol.md | sha256sum
git -C <tree> show C:<s>/protocol.md | sha256sum        # the same hash, or stop
```

## 4. Append the lock line
One line, appended to `<s>/locks.md` (create the file with its first line where it has
none), on a branch from `origin/<default>`, merged the same way:
```
<time, UTC, ISO 8601> | sha256 <hash> | commit <C> | approved by <scientist>, <link> | locked by <your instance>
```
```bash
date -u +%Y-%m-%dT%H:%M:%SZ
```
Then run `/keep-the-records` on that commit too: the lock record only grows.

## 5. What you refuse
- **No readable approval of that revision:** no lock (step 2).
- **A change to an earlier lock:** never. A revised protocol gets a new line that also says
  `supersedes <the earlier hash>`, on the scientist's approval of the new revision. Where
  confirmatory data was already seen, the lead logs the revision in the deviation log too;
  a lock never stands in for that.
- **A protocol whose confirmatory data was unblinded before this lock** (the notebook or
  the deviation log says so): tell the lead. Lock it only with `after unblinding` at the
  end of its line, so nobody reads it as fixed before the data.

## 6. Answer
Tell the lead, by message: the lock line, the commit it is on, and the hash. Its note
`LOCKED at <hash>, <commit>` rests on your line, not the other way round.

Adapted from the engineering template's maintainer, template-v2.2.0; new for a study's
records.
