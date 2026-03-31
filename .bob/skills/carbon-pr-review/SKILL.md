---
name: carbon-pr-review
description:
  Review Carbon pull requests and local diffs using repo-specific standards,
  change-type checks, and a blocker follow-up nit rubric focused on net-positive
  merge decisions.
---

Review Carbon changes using the repository's maintainer guidance.

Use this skill when the task is to review a diff, a branch, or a change against
an issue.

## Workflow

<Steps>
<Step>
Start with scope.

- Identify the affected packages, docs, workflows, or public APIs.
- Read the PR description, issue, or spec when provided.
- Use narrow context first in this monorepo. </Step>

<Step>
Review using Carbon's existing guidance.

- Use `docs/guides/reviewing-pull-requests.md` as the base review workflow.
- Use the change-type checklist in `checklist.md`.
- Use `severity-guide.md` to classify findings. </Step>

<Step>
Apply the net-positive review philosophy.

- Block only on merge-critical problems.
- Do not block on optional refactors, speculative abstractions, or taste-based
  preferences.
- If a comment is not a blocker, classify it as `Follow-up` or `Nit`. </Step>

<Step>
If the review is tied to an issue, validate issue coverage.

- Check that the change addresses the stated problem.
- Call out missing acceptance criteria or scope drift.
- Distinguish issue mismatch from general quality comments. </Step>

<Step>
Produce findings first.

- List `Blocker`, `Follow-up`, and `Nit` items with file references when
  possible.
- Keep each finding concrete: problem, impact, expected fix.
- If there are no findings, say that explicitly and mention residual risk or
  test gaps. </Step> </Steps>
