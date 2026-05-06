# Carbon plan-mode standards

- Identify the affected package, workspace, or doc surface before proposing
  implementation steps.
- Keep plans package-scoped by default; expand to multiple packages only when
  the task genuinely crosses boundaries.
- Cite the relevant repo docs or package guidance that materially constrain the
  plan.
- Call out cross-package parity impacts between React and web components when
  relevant.
- Avoid repo-wide scans and file inventories unless they are necessary to reduce
  ambiguity.
- Prefer command, test, and verification steps that target the changed package
  or workflow.
