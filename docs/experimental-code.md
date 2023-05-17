# Experimental Code

The team occasionally will author code, or accept contributions, that is
considered experimental or unstable. The goal for this code is to ship it as
unstable for sponsor groups to leverage. During this time, the team can get
feedback around what is working and what does not work so that changes can be
made before an official release.

This code should be treated as experimental and will break between release
versions for the package that it is being imported from.

- The API is not fixed, and is likely to change
- The API is not bound by semver
- The component export may change, be renamed, or removed in the future without
  warning

## Naming experimental code

For experimental or unstable code, we use the `unstable_` prefix. For example:

```js
// An unstable method
function unstable_layout() {
  // ...
}

// An unstable variable
const unstable_meta = {
  // ...
};

// An unstable component will retain its name, specifically for things like
// the rules of hooks plugin which depend on the correct casing of the name
function Pagination(props) {
  // ...
}

// However, when we export the component we will export it with the `unstable_`
// prefix. (Similar to React.unstable_Suspense, React.unstable_Profiler)
export { default as unstable_Pagination } from './components/Pagination';
```

For teams using these features, they will need to import the functionality by
using the `unstable_` prefix. For example:

```jsx
import { unstable_Pagination as Pagination } from 'carbon-components-react';
```

## Experimental status

Components with the prefix `unstable_`, eg, `unstable_ComponentName` are
experimental

Within the storybook these components' stories are prefixed, and may include a
notice regarding specific instability or experimental status.

## Moving to stable

Over time it becomes apparent an experimental API has stabilized and suits the
needs of most users. When there hasn't been much movement on a component, it can
be marked to be moved from "experimental" status to be "stable" by opening a new
issue requesting it be moved to stable.

The following criteria need to be met when moving a component from experimental
to stable:

- [ ] All files have a copyright banner
- [ ] All components exported in `src/index.js` and should not be `unstable_`
      prefixed
- [ ] Component has a label in the GitHub repository
- [ ] Component should be documented on the website
  - [ ] Component should have a usage, style, and code tab
  - [ ] Component may have a component demo
- [ ] For each component exported:
  - [ ] Component is written as a function declaration or uses `forwardRef`
  - [ ] Component has `propTypes` defined
    - [ ] Each prop type has a comment (used in storybook)
    - [ ] Prop types are as specific as needed, prefer `PropTypes.shape` over
          `PropTypes.object` if possible
  - [ ] Default props are listed as default args in the function definition (not
        in defaultProps)
    - [ ] Note: default props should be stable, in other words props like
          `onClick = () => {}` can cause re-renders since the function identity
          is not stable
  - [ ] Component has a story in `<ComponentName>.stories.js`
    - [ ] Component has an mdx document that follows our outline
    - [ ] mdx document coverages at least common use-cases and provides a prop
          table
    - [ ] Stories cover at least common use-cases
    - [ ] Stories may include a `Playground` story for controls
      - [ ] Controls with no meaningful change to the component visuals should
            be hidden from the controls panel, eg. `className`
      - [ ] Props of type `node` with no proper controls available for
            configuration should be hidden from the controls panel, eg.
            `children`
    - [ ] Stories should mirror intended usage of the component
  - [ ] Component has unit/integration tests written in RTL for testing the
        component API
  - [ ] Component is tested via VRT for at least the initial render state
  - [ ] Component is tested via AVT for at least the initial render state
