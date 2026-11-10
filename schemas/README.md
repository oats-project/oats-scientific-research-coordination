# Vendored OATS schemas

These schemas are vendored from `oats-project/oats` release v0.69.7 (commit
`4b43bbff9021fd5258e22a37b1754cf587c7da50`), the floor every capability's `oats.json`
declares:

- `docs/capability-manifest.schema.json`
- `docs/soul.schema.json`

`npm run validate` checks every capability's `oats.json` and every example soul's
`soul.yaml` against them.

When the floor moves, vendor them again from that release and update this note.
