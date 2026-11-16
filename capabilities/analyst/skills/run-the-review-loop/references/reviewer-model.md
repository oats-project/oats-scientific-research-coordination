# The reviewer's model

## The floor comes first
Check the model the reviewer would launch on against the floor your landing rules set
(their house rules; `/landing-rules-detail`, "The model floor"), before anything below:
the effective one from the preview as much as one you pick, and a native reviewer's too.
A smaller, faster or cheaper model is not a different one, and an effective model below
the floor is not used, even where it is of another family than yours: spawn it on one at
or above the floor, and tell your person once that the configuration is below it.

## Then another family
A reviewer on your model shares your blind spots. Before you spawn it, compare:
- **yours:** `launch.harness` and `launch.model` in your `instance.json`;
- **the reviewer's:** `oats spawn study-reviewer --preview --json`, where
  `launch.declared` is the soul's default and `launch.effective` what this machine will
  launch. When `launch.from` is `local`, the machine's `oats-local.yaml` `souls.launch`
  entry named by `launch.at` overrides the default.

Compare model families, not harnesses or versions: a provider prefix names a route to a
model, not another model, and two versions of one family share its blind spots.

| The comparison | Do |
|---|---|
| The effective model is known, at or above the floor, and of another family than yours | Spawn without `--harness` or `--model`, so the machine's choice applies. |
| It would run in your family | Spawn it on a model of another family from the ones your brief names, through a launch configuration this host defines (`oats launch-config list`), or `--harness` and `--model`. |
| Either model is unknown (`null`, absent, a harness's native default) | The comparison proves nothing. Spawn it with `--harness` and `--model` on a model you know differs from yours; your harness reports your own. |
| No other family has a model at or above the floor, or you can't establish a difference | Spawn it on your own model, and say in your report that diversity was lost. |
