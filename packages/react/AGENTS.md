# `packages/react`

This package houses the canonical react component implementations.
`@carbon/react` is intended to be a single point of entry for most everything a
consumer needs to build a React app with the Carbon Design System. Styles are
re-exported from `packages/styles` and icons are re-exported from
`packages/icons-react`.

## Guidelines

- Follow React best practices and common conventions
- Prefer composable declarative solutions over inheritable or imperative ones
- Don't query the DOM directly, use refs where possible
- You might not need a `useEffect` when updating state based on props or state,
  caching expensive calculations, resetting all state when a prop changes,
  adjusting some state when a prop changes, sharing logic between event
  handlers, sending a POST request, chains of computations, initializing the
  application, notifying parent components about state changes, passing data to
  the parent, subscribing to an external store, and fetching data. Refer to
  https://react.dev/learn/you-might-not-need-an-effect only when unable to
  determine a clean non-effect approach.

## Component folder structure

For `packages/react/src/components/`:

```
ComponentName/
├── index.tsx                  // Re-exports
├── ComponentName.tsx          // Main component
├── ComponentName.stories.js   // Storybook stories
├── component-name-story.scss  // Styling for storybook stories
├── ComponentName.mdx          // Storybook mdx docs
└── __tests__/
│   └── ComponentName-test.js  // Unit tests
└── docs/
    └── overview.mdx           // Demo file consumed by external documentation
```
