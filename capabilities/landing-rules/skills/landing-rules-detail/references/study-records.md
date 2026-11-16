# The study records

## Layout
<!-- adapt: Where do study records live, where is raw data kept, and who decides to open a record? -->
Study records live in one private git repository, the study records, one directory per
study under `studies/<study>/`: `README.md` (its status), `protocol.md`, `locks.md`,
`raw/`, `runs/<arm>/`, `notebook.md`, `deviations.md` and `claims/`.
- **Raw data** is in `raw/`, or, for data kept in custody elsewhere (large instrument
  data, personal or human-subjects data), a hash manifest there: one line per file, its
  path, size and sha256 separated by tabs (so a path holds no tab or newline).
- **Ordinary files only:** everything under `studies/` is an ordinary file, never a
  symlink, a submodule or a `.gitattributes`, and there is no `.gitattributes` at the
  records' root either.
- **Write-once and append-only:** raw data is write-once in either form; `locks.md`,
  `notebook.md` and `deviations.md`, and each arm's `attempts.md` and `deviations.md`
  under `runs/<arm>/`, are append-only.
- **Only the record steward merges** into the repository's default branch.
- **Private by default.** A record is private to the group. Opening one (making it
  readable outside the group) is a one-way door, decided each time, for that record, by
  the scientist. Why: an opened record can't be closed again, and it may carry what must
  not leave.

## Holds
Each with its reason, its scope and who lifts it, read by the record steward before every
merge and lock:
- on one change: the `hold` label on its PR;
- on the study records' default branch, binding every PR opened before it or after: an
  open issue with the `hold` label on the records' forge;
- with no forge: a line in `holds.md` at the records repository's root, and a later line
  that lifts it (the file only grows), each naming who called for it.

A study lead or a person these rules name places one; the one the hold names, or a person
these rules name, lifts it, and a lead lifts only a hold it placed itself, never one a
person placed. The record steward merges these lines alone, even while a hold stands.

## The record stewards
One standing instance per study records repository, named `<records>-record-steward`
(after a retired one, a count before the role: `<records>-2-record-steward`). The name is
the seat: never a second one for a repository while one is listed, even a stopped one.
