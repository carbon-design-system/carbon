# Carbon review severity guide

## Blocker

Use for problems that should prevent merge:

- Correctness regressions
- Accessibility regressions
- Public API or semver mistakes
- CI, release, or workflow security issues
- Missing required tests or docs for the change
- Changes that do not satisfy the linked issue or spec

## Follow-up

Use for meaningful improvements that are not required before merge:

- Maintainability improvements
- Better test coverage beyond the minimum needed
- Reasonable cleanup that can land separately
- Documentation polish that is useful but not required for correctness

## Nit

Use for low-risk, non-blocking comments:

- Naming preferences
- Small wording suggestions
- Tiny readability adjustments
- Minor local consistency notes
