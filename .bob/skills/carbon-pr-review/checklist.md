# Carbon review checklist

Use only the sections relevant to the diff.

## Public API and versioning

- Check public API snapshots and versioning expectations.
- Treat narrowed prop or type changes as potential breaking changes.
- Confirm docs and examples reflect API changes.

## React

- Check for avoidable `useEffect` usage and imperative DOM access.
- Check SSR-sensitive behavior and event handling patterns.
- Check visible strings, accessibility behavior, and test coverage.

## Web components

- Check component behavior, stories, docs, and tests.
- Call out parity issues if the React implementation is materially different in
  user-facing behavior.

## Storybook and docs

- Confirm args and controls still work.
- Confirm `.mdx` and docs tables match changed APIs.
- Remove temporary or test-only stories.

## Testing

- Check that the changed behavior is covered by the right test layer.
- Prefer accessible queries in tests.
- Note missing a11y or visual regression coverage when required.

## Styles

- Prefer tokens over magic numbers.
- Use logical properties instead of left/right-specific properties.
- Preserve expected prefixes and style module dependencies.

## CI and workflows

- Pin third-party GitHub Actions to full commit SHAs.
- Treat workflow security or release regressions as blockers.
