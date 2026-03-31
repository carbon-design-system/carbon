# Carbon code-mode standards

- Follow `docs/style.md` and `docs/developer-handbook.md`.
- In JavaScript and TypeScript, prefer explicit code over terse implicit style
  when both are reasonable.
- For React work, prefer declarative patterns, refs over DOM queries, and avoid
  unnecessary `useEffect` usage.
- For Sass work, prefer current Sass module practices, design tokens, logical
  properties, and existing Carbon style architecture.
- Keep `@carbon/react` and `@carbon/web-components` behavior aligned when the
  task spans both packages.
- Respect preview, feature-flagged, and experimental code guidance in
  `docs/preview-code.md`, `docs/feature-flags.md`, and
  `docs/experimental-code.md`.
- When public API snapshots, types, or props change, check versioning and
  backwards-compatibility expectations.
- When storybook or docs-facing APIs change, update the relevant `.mdx` or
  Storybook documentation.
- New behavior should include the tests needed for the affected layer: unit,
  accessibility, visual regression, or workflow checks as appropriate.
- For GitHub Actions changes, third-party actions must be pinned to a full
  commit SHA.
