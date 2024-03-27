# Experimental Code

The team occasionally will author code, or accept contributions, that is
considered experimental or unstable. The goal for this code is to ship it as
unstable for sponsor groups to leverage. During this time, the team can get
feedback around what is working and what does not work so that changes can be
made before an official release.

Experimental code is made available in the following ways:

- Components and exports prefixed with `unstable_`
- Feature flags
- Expanding existing APIs

In all cases, experimental code should be treated as unstable and can change
between release versions for the package that it is being imported from.

- The API is not fixed, and is likely to change
- The API is not bound by semver
- The component, export, feature, etc. may change, be renamed, or removed in the
  future without warning

## Components and exports prefixed with `unstable_`

For experimental or unstable exports, we use the `unstable_` prefix. For
example:

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
function StaticNotification(props) {
  // ...
}

// However, when we export the component we will export it with the `unstable_`
// prefix. (Similar to React.unstable_Suspense, React.unstable_Profiler)
export { default as unstable_StaticNotification } from './components/StaticNotification';
```

For teams using these features, they will need to import the functionality by
using the `unstable_` prefix. For example:

```jsx
import { unstable_StaticNotification as StaticNotification } from '@carbon/react';
```

### Documenting components and exports prefixed with `unstable_`

Within the experimental section of the `@carbon/react` storybook, there are
individual entries for each unstable export. These contain stories and written
documentation outlining the functionality of these components and exports.

## Feature flags

Some Carbon packages ship with available feature flags. These feature flags
enable new behavior and styling, allowing you to opt-in to new (and sometimes
breaking) changes while using the current major version. A feature flag may be
configured in javascript, sass, or both.

All the currently available feature flags, as well as how to enable them, is
documented in the
[`@carbon/react` storybook](https://react.carbondesignsystem.com/?path=/docs/experimental-feature-flags--overview).

### Feature flags are opt-in

Feature flags are typically marked `false` or "off" by default to ensure
backwards compatibility. These flags can be turned on individually within a
consuming project to allow opt-in of the features incrementally.

Feature flags follow a prefix naming convention that indicate status:

1. `enable-experimental-*`
2. `enable-v12-*`

#### Flags prefixed `enable-experimental-*`

Flags are typically introduced with the `enable-experimental-*` prefix. This
marks that the API is likely to change due to feedback or unforseen instability
or incompatibility. It's also possible (but unlikely) that the flag is removed
in the future. During this time your feedback is very important to ensure we've
met all concerns relating to this new feature. If you use these, make sure to
keep an eye on our release notes where we'll outline any changes to feature
flags across our regularly scheduled minor version releases.

#### Flags prefixed `enable-v12-*`

As a flag becomes more stable, we'll "commit" it to a future release and rename
it to use the `enable-v12-*` prefix. This means that the API or functionality
behind this flag is now fixed and won't change. Additionally, we will ship this
flag as "on by default" in the major version indicated in the name. Typically
flags will use the next major version, but if we anticipate a lot of disruption
from a flag it can be commited to the major relase after next. If you use the
old flag name you'll see a warning in your console prompting you to update it.

All breaking changes will be shipped as `enable-v12-*` flags within the current
major release (v11). This enables projects to opt-in to breaking changes earlier
and at their own pace avoiding one huge changeset when upgrading to the next
major release. In theory, if all `enable-v12-*` flags are enabled within your
project before the v12 release, no changes should need to be made when updating
to v12.

For a flag to be moved to `enable-v12-*` it must be tested with early adopters,
be fully covered in tests (Unit, AVT, and VRT), documented in storybook as well
as https://carbondesignsystem.com, and have an automated migration script
(codemod) available, where possible.

### Documenting feature flags

Within the experimental section of the `@carbon/react` storybook, there is a
"Feature Flags" folder. This contains stories and written documentation covering
every available flag and how to configure them. Folders and stories within this
section in storybook show components with all feature flags turned on.

All the currently available feature flags, as well as how to enable them, is
documented in the
[`@carbon/react` storybook](https://react.carbondesignsystem.com/?path=/docs/experimental-feature-flags--overview).

## Expanding existing APIs

New experimental functionality can sometimes be added without the need of an
`unstable_` export or a feature flag. Oftentimes this ends up being a new prop
on a component. The documentation associated with this prop (TypeScript types,
PropTypes, storybook controls, etc.) will state that it's experimental.

## Moving to stable

Over time it becomes apparent an experimental API has stabilized and suits the
needs of most users. If it isn't a breaking change, and there hasn't been much
movement, it can be moved from "experimental" status to be "stable".

To initiate a move to stable, open a new issue to request the team to evaluate
if it can be moved. The issue should contain the following criteria that need to
be met to move a component from experimental to stable:

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
