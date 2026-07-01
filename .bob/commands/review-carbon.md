---
description:
  Review Carbon changes with repo-specific standards and blocker follow-up nit
  findings
argument-hint: <branch-or-issue>
---

Review the current Carbon changes using the `carbon-pr-review` skill and the
repo guidance in `docs/guides/reviewing-pull-requests.md`.

If `$1` is empty, review the local uncommitted diff.

If `$1` looks like a branch name, review that branch diff.

If `$1` looks like `#1234` or a GitHub issue URL, run an issue-coverage review
instead of a generic code-quality review. In that case:

- validate whether the change addresses the issue
- call out missing acceptance criteria coverage
- separate issue mismatch from normal code review comments

Always:

- classify findings as `Blocker`, `Follow-up`, or `Nit`
- optimize for net-positive merge decisions rather than perfection
- cite relevant Carbon docs when a finding depends on repo policy
- put findings first, then open questions, then a short summary
