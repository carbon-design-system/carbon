# Carbon review standards

- Reviews should optimize for net-positive contributions that are safe to merge,
  not for theoretical perfection.
- Classify findings as `Blocker`, `Follow-up`, or `Nit`.
- `Blocker` means correctness regressions, accessibility regressions, public API
  or versioning mistakes, CI/workflow security issues, issue mismatch, or
  missing required tests or docs.
- `Follow-up` means worthwhile improvements that are not required for safe
  merge.
- `Nit` means cosmetic, naming, wording, or local preference comments.
- Do not block on optional refactors, speculative abstractions, or taste-based
  preferences.
- For PR and review work, follow `.github/PULL_REQUEST_TEMPLATE.md` and
  `docs/guides/reviewing-pull-requests.md`.
- If a change affects a documented Carbon convention, cite the relevant repo doc
  instead of stating a free-form preference.
