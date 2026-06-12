# Carbon Bob Workspace

This workspace config gives Bob a repo-specific starting point without replacing
the existing Carbon docs.

## What is configured

- `.bobignore` excludes noisy artifacts and generated output
- `.bob/rules/` sets shared repo behavior and review standards
- `.bob/rules-code/` adds implementation-specific coding guidance
- `.bob/rules-plan/` keeps planning narrow in this monorepo
- `.bob/skills/` adds focused workflows for PR review and PR preparation
- `.bob/commands/` adds reusable project commands

## Maintainer usage

Start with [`maintainer-workflows.md`](./maintainer-workflows.md).

Use the project commands when they match the task:

- `/review-carbon` to review a local diff, branch, or issue-aligned change
- `/prepare-pr` to draft a PR title and body from the current diff
- `/plan-package <path-or-package>` to force package-scoped planning in this
  monorepo

The project skills are intended to trigger automatically when the task matches,
but maintainers can also mention them by name in the prompt:

- `carbon-pr-review`
- `carbon-pr-prep`

## Recommended local Bob settings

These are Bob IDE settings, not repo-tracked config:

- Review exclusions: exclude the same artifact patterns as `.bobignore`
- Large-project discipline: prefer explicit file and folder mentions over broad
  repo context
- Auto-approve: keep `read` low-friction only if trusted; keep `write`,
  `browser`, and `command` conservative
- Reviews: use issue coverage when reviewing work against a GitHub issue or spec

## Source of truth

Use the repo docs for policy and conventions:

- `docs/guides/reviewing-pull-requests.md`
- `docs/style.md`
- `docs/developer-handbook.md`
- `.github/PULL_REQUEST_TEMPLATE.md`
- `docs/feature-flags.md`
- `docs/preview-code.md`
- `docs/experimental-code.md`
