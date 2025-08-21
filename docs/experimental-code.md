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
function ComponentName(props) {
  // ...
}

// However, when we export the component we will export it with the `unstable_`
// prefix. (Similar to React.unstable_Suspense, React.unstable_Profiler)
export { default as unstable_ComponentName } from './components/ComponentName';
```

For teams using these features, they will need to import the functionality by
using the `unstable_` prefix. For example:

```jsx
import { unstable_ComponentName as ComponentName } from '@carbon/react';
```

### Documenting components and exports prefixed with `unstable_`

Within the experimental section of the `@carbon/react` storybook, there are
individual entries for each unstable export. These contain stories and written
documentation outlining the functionality of these components and exports.

## Feature flags

Some Carbon packages ship with available feature flags. These feature flags
enable new behavior and styling, allowing you to opt-in to new breaking changes
while remaining on the current major version. When a new feature flag is
introduced it is marked `false` or "off" by default to ensure backwards
compatibility. A feature flag may be configured in javascript, sass, or both.

All the currently available feature flags, as well as how to enable them, is
documented in the
[`@carbon/react` storybook](https://react.carbondesignsystem.com/?path=/docs/experimental-feature-flags--overview).

### Feature flag naming convention

All feature flags follow a prefix naming convention that indicate status.

#### Flags prefixed with `enable-*`

- Contain new features that we'd like consuming projects to test
- Are generally stable and unlikely to change but may change based on user
  feedback
- May require some manual migration or code changes within your project
- Are documented in storybook
- May not be documented on https://www.carbondesignsystem.com
- Need user feedback to ensure we've met all concerns relating to this feature

If you use these flags, make sure to check our release notes where we'll outline
any changes to them across our regularly scheduled minor version releases.

#### Flags prefixed with `enable-v#-*`

As usage of an existing flag increases or we determine a feature to be of high
importance, we'll "commit" it to a future major release and rename it to use the
`enable-v#-*` prefix. At this point the API or functionality behind this flag is
now fixed and won't change. We intend to ship this flag as "on by default" in
the major version indicated in the name. e.g. `enable-v12-some-feature`

All breaking changes will be shipped as `enable-v12-*` flags within the current
major release (v11). This enables projects to opt-in to breaking changes earlier
and at their own pace avoiding one huge changeset when upgrading to the next
major release. In theory, if all `enable-v12-*` flags are enabled within your
project before the v12 release, no changes should need to be made to the
affected components when updating to v12.

For a flag to be committed to a release and renamed to `enable-v#-*` it must:

- Be tested with early adopters
- Be fully covered in tests (Unit, AVT, and VRT)
- Be documented in storybook
- Be documented on https://carbondesignsystem.com
- Have an automated migration script (codemod) available, where possible

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

> [!IMPORTANT]  
> To initiate a move to stable:
>
> 1. [Open a new issue](https://github.com/carbon-design-system/carbon/issues/new?template=Blank+issue)
>    to request the team to evaluate if it can be moved.
> 2. Copy and paste the following snippet into the issue - it contains all the
>    criteria that must be met to move a component from experimental to stable.

```md
### Requirements to move to stable

- [ ] The experimental code has stabilized
  - [ ] A consuming project has given feedback on the visual design, UX, and dev
        API/implementation
  - [ ] The experimental code has been available for a reasonable amount of time
        (~3 months) in aim to catch potential defects with spec, implementation,
        accessibility, etc.

---

- [ ] Component is documented on the website
  - [ ] Component has a usage, style, and code tab
  - [ ] Component has a component demo

---

- [ ] React implementation is complete
  - [ ] All components exported in `src/index.js` and should not be `unstable_`
        prefixed
  - [ ] Component is written as a function declaration and uses `forwardRef`
  - [ ] Component has `propTypes`
    - [ ] Each prop type has a comment (used in storybook)
    - [ ] Prop types are as specific as needed, prefer `PropTypes.shape` over
          `PropTypes.object` if possible
  - [ ] Component has a TypeScript interface that mirrors `propTypes`
  - [ ] API comments (in propTypes and TS interface) are the exact same
  - [ ] Default props are listed as default args in the function definition (not
        in defaultProps)
    - [ ] Note: default props should be stable, in other words props like
          `onClick = () => {}` can cause re-renders since the function identity
          is not stable
  - [ ] Component has a story in `<ComponentName>.stories.js`
    - [ ] Stories show the intended usage of the component and are examples of
          the most common use-cases
    - [ ] All stories utilize controls
      - [ ] Controls with no meaningful change to the component visuals should
            be hidden from the controls panel, eg. `className`
      - [ ] Props of type `node` with no proper controls available for
            configuration should be hidden from the controls panel, eg.
            `children`
    - [ ] Component has an `.mdx` document that
      - [ ] Follows the established outline
      - [ ] Documents and explains the most common use-cases
      - [ ] Provides a prop table
  - [ ] All required tests are present
    - [ ] Unit/integration tests written with `@testing-library/react` that
          cover the entire component API
      - [ ] Popover's test file is a good example that can be used as a guide
    - [ ] Visual regression tests (VRT) are present in
          `e2e/components/ComponentName/ComponentName-test.e2e.js` that:
      - [ ] Snapshot every storybook story
      - [ ] Snapshot important discrete states (open, selected, enabled,
            autoAlign etc.) by setting controls/args on a story
    - [ ] Accessibility Verification Tests (AVT) are present in
          `e2e/components/ComponentName/ComponentName-test.avt.e2e.js` that:
      - [ ] Ensure every story `.toBeAccessible()`
      - [ ] Ensure important discrete states (open, selected, etc.) are covered
            by arranging/interacting with component before calling
            `.toBeAccessible()`
- [ ] Component is connected with Figma Code Connect and has a
      `<ComponentName>.figma.tsx` file in the code-connect folder.

---

- [ ] Web Component implementation is complete (full details TBD)
  - [ ] ... Various implementation details specific to WC
  - [ ] ... API is documented (ts interface, etc.)
  - [ ] ... Component story(s) are present
  - [ ] ... All required tests are present

---

- [ ] Component styles are available through `@carbon/styles`
  - [ ] Component styles are housed in a `ComponentName/_componentName.scss`
        file
  - [ ] Component styles are defined within a `@mixin`
  - [ ] Component has an entrypoint file `ComponentName/_index.scss` that has at
        minimum:
    - [ ] `@forward 'componentName';`
    - [ ] `@use 'componentName';`
    - [ ] `@include componentName.componentName;`

---

- [ ] React and Web Components implementation mirror one another and have full
      parity
  - [ ] 100% visual parity
  - [ ] 100% functional parity
  - [ ] 100% documentation parity
  - [ ] 100% testing parity

---

- [ ] Misc details are complete
  - [ ] All files have a copyright banner
  - [ ] Component has a label in the GitHub repository
```
