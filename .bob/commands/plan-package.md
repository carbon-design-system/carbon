---
description: Create a narrow implementation plan for a Carbon package or path
argument-hint: <path-or-package>
---

Create a plan for work in this monorepo, scoped as narrowly as possible.

Focus on `$1`.

If `$1` is a package name, path, component directory, workflow file, or docs
path, use that as the primary context surface.

Planning requirements:

- identify the affected package or workspace first
- read the nearest relevant `AGENTS.md` and repo docs before broadening scope
- avoid repo-wide scans unless the task clearly crosses package boundaries
- call out React and web-components parity impacts when relevant
- propose package-scoped commands, tests, and verification steps first

Return a concise implementation plan with assumptions and verification steps.
