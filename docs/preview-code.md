<!-- NOTE: This file is used in the generation of storybook docs page(s). -->

# Preview code

The team occasionally will author code, or accept contributions, that is shipped
as a "preview" for teams to begin using in production. During this phase, the
goal is to get feedback from consumers and their end users around what is
working well and what could be improved. This feedback informs if, how, and why
changes should be made before the official stable release. Using preview code in
your project helps Carbon continue to be buided by real-world usage of
components and patterns.

Previously referred to as "experimental" or "unstable", the new "preview" status
is part of the larger
[Product Development Lifecycle (PDLC)](https://carbondesignsystem.com/contributing/product-development-lifecycle/)
process framework that Carbon follows.

## Preview documentation

Within the `Preview` section of storybook, there are individual entries for each
preview export. These contain stories and written documentation outlining the
functionality of these components and exports.

## Preview usage

Preview code is made available in the following ways:

- Components and exports prefixed with `preview_`
- Feature flags
- Expanding existing APIs

### Prefixed exports

For exports in the preview phase, we use the `preview_` prefix. For example:

```js
// A preview method
function preview_layout() {
  // ...
}

// A preview variable
const preview_meta = {
  // ...
};

// A preview component will retain its name, specifically for things like
// the rules of hooks plugin which depend on the correct casing of the name
function ComponentName(props) {
  // ...
}

// However, when we export the component we will export it with the `preview_`
// prefix.
export { ComponentName as preview_ComponentName } from './components/ComponentName';
```

For teams using these features, they will need to import the functionality by
using the `preview_` prefix. For example:

```jsx
import { preview_ComponentName as ComponentName } from '@carbon/react';
```

### Feature flags

All the currently available feature flags, as well as how to enable them, is
documented in the
[`@carbon/react` storybook](https://react.carbondesignsystem.com/?path=/docs/getting-started-feature-flags--overview)
and
[`@carbon/web-components` storybook](https://web-components.carbondesignsystem.com/?path=/docs/introduction-feature-flags--overview).

### Expanding existing APIs

New preview functionality can sometimes be added without the need of an
`preview_` export or a feature flag. Oftentimes this ends up being a new prop on
a component. The documentation associated with this prop (TypeScript types,
PropTypes, storybook controls, etc.) will state that it's in preview.

## Moving to stable

Over time it becomes apparent a preview API has stabilized and suits the needs
of most users. If it isn't a breaking change, and there hasn't been much
movement, it can be moved from "preview" status to be "stable".

> [!IMPORTANT]  
> To initiate a move to stable:
>
> 1. [Open a new issue](https://github.com/carbon-design-system/carbon/issues/new?template=Blank+issue)
>    to request the team to evaluate if it can be moved.
> 2. Copy and paste the following snippet into the issue - it contains all the
>    criteria that must be met to move a component from preview to stable.

```md
### Requirements to move to stable

- [ ] The preview code has stabilized
  - [ ] A consuming project has given feedback on the visual design, UX, and dev
        API/implementation
  - [ ] The preview code has been available for a reasonable amount of time (~3
        months) in aim to catch potential defects with spec, implementation,
        accessibility, etc.

---

- [ ] Component is documented on the website
  - [ ] Component has a usage, style, and code tab
  - [ ] Component has a component demo

---

- [ ] React implementation is complete
  - [ ] All components exported in `src/index.js` and should not be `preview_`
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
