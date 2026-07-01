# Carbon Bob Maintainer Workflows

This document explains how maintainers should use the repo's Bob config.

## Quick start

- Open Bob from the repository root when possible so the workspace rules apply.
- Start narrow. In this monorepo, mention the package, component, workflow, or
  doc path you care about.
- Prefer the project commands for repeatable workflows.
- Let the repo docs stay authoritative. The Bob config is a shortcut, not a
  replacement for Carbon policy.

## What Bob has in this repo

- `.bobignore` keeps Bob out of artifact-heavy and generated directories.
- `.bob/rules/` gives Bob Carbon-wide repo and review guidance.
- `.bob/rules-code/` adds implementation conventions for coding work.
- `.bob/rules-plan/` keeps plans scoped to the relevant package or path.
- `.bob/skills/` adds reusable maintainer workflows.
- `.bob/commands/` provides slash commands for the most common tasks.

## Recommended workflows

### Review a PR or local diff

Use:

- `/review-carbon`
- `/review-carbon <branch-name>`
- `/review-carbon #1234`
- `/review-carbon https://github.com/carbon-design-system/carbon/issues/1234`

What this does:

- applies the `carbon-pr-review` skill
- uses the Carbon PR review guide
- classifies findings as `Blocker`, `Follow-up`, or `Nit`
- pushes Bob toward net-positive merge decisions instead of perfection reviews

When to use issue coverage:

- when the work is tied to a GitHub issue or written acceptance criteria
- when you want Bob to check scope alignment, not just code quality

### Prepare a pull request

Use:

- `/prepare-pr`

What this does:

- applies the `carbon-pr-prep` skill
- follows `.github/PULL_REQUEST_TEMPLATE.md`
- drafts changelog and description sections from the actual diff
- writes concrete `Testing / Reviewing` steps
- leaves unresolved checklist items explicit instead of guessing

Recommended maintainer follow-up:

- confirm the changelog bullets are accurate
- confirm the testing steps are enough for a second reviewer
- keep author checklist items as human confirmations unless the diff proves them

### Plan work in a specific package

Use:

- `/plan-package packages/react`
- `/plan-package packages/web-components/src/components/button`
- `/plan-package .github/workflows/pull-request-closed.yml`

What this does:

- keeps Bob scoped to the relevant package or file path
- encourages use of the nearest `AGENTS.md`
- reduces broad repo scanning and noisy context

Use this before implementation when the task affects a narrow part of Carbon.

## Skills

### `carbon-pr-review`

Use this skill for:

- reviewing a local diff before pushing
- reviewing a PR branch
- checking whether a change actually solves its linked issue

Behavior:

- starts with scope and affected package detection
- uses the review checklist by change type
- uses the severity guide to keep findings calibrated
- outputs findings first

Maintainer prompt examples:

- `Use carbon-pr-review to review the current diff in packages/react`
- `Use carbon-pr-review and focus on whether this PR is net-positive and safe to merge`
- `Use carbon-pr-review with issue coverage against #1234`

### `carbon-pr-prep`

Use this skill for:

- drafting a new PR body from local commits or diff
- tightening a vague PR description before review
- filling in the template without fabricating missing validation

Behavior:

- preserves the repo's PR template structure
- writes concrete reviewer instructions
- flags unknowns for the author to confirm

Maintainer prompt examples:

- `Use carbon-pr-prep to draft a PR body for the current diff`
- `Use carbon-pr-prep and focus the testing section on packages/styles`
- `Use carbon-pr-prep to tighten this draft PR description`

## Review philosophy

The review standard in this repo is not "find every possible improvement."

Use:

- `Blocker` for merge-critical problems
- `Follow-up` for worthwhile but non-blocking work
- `Nit` for cosmetic or preference comments

Do not block on:

- optional refactors
- speculative abstractions
- taste-only preferences
- cleanup that can land separately

This keeps reviews aligned with a net-positive contribution model.

## How to write effective prompts in this repo

- Mention the package or file path early.
- Mention the issue, PR, or acceptance criteria when they exist.
- Say whether you want planning, review, implementation, or PR drafting.
- Ask for file references when you want actionable review output.

Examples:

- `Review packages/react/src/components/Button against issue #1234`
- `Plan the minimal change in packages/styles for this Sass regression`
- `Draft a PR body for the current diff and keep the testing steps concrete`

## When to fall back to repo docs

Go to the repo docs directly when the answer depends on policy details:

- `docs/guides/reviewing-pull-requests.md` for review expectations
- `docs/style.md` for JS, React, Sass, and testing conventions
- `docs/developer-handbook.md` for package and workflow conventions
- `.github/PULL_REQUEST_TEMPLATE.md` for PR structure
- `docs/feature-flags.md`, `docs/preview-code.md`, and
  `docs/experimental-code.md` for staged or non-stable work

## Local Bob settings maintainers should configure themselves

These are recommendations, not repo-enforced settings:

- exclude the same artifact-heavy paths from reviews that `.bobignore` excludes
- keep auto-approve conservative, especially for write, browser, and command
  actions
- prefer issue coverage in reviews when work is tied to an issue or spec
- keep prompts narrow in this monorepo to avoid low-signal context
