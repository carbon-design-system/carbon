# Motion surfaces architecture spike

This spike only covers one surface:

- `expand`: a Tile expands into a Modal

## Goal

The goal of this spike is to test a simple architecture where:

- motion surface definitions live in `@carbon/motion`
- Sass values are generated from the same source definition
- React owns lifecycle and presence logic
- Motion runs the shared-element animation
- Carbon components keep ownership of layout, focus, dialog behavior, and
  semantics

## Files created

### `packages/motion/src/surfaces.ts`

This file defines the shared motion surface data.

What we added:

- the `expand` surface
- `getMotionSurface()`
- `MotionSurfaceName`

Why:

- to keep the motion intent in one shared place
- to avoid putting React or Motion-specific values in the base definition

What it uses:

- `DurationName`
- `EasingName`
- `EasingMode`

### `packages/motion/tasks/build.mjs`

This file generates Sass from the TypeScript surface definition.

What we added:

- a build script that reads the exported `surfaces`
- conversion from JavaScript values to Sass values
- output generation for `scss/generated/_surfaces.scss`

Why:

- to keep TypeScript and Sass in sync
- to follow the request that root definitions live in `@carbon/motion`

What it uses:

- `@carbon/scss-generator`
- Node `fs/promises`
- Node `path`

### `packages/motion/scss/generated/_surfaces.scss`

This is a generated file.

What it contains:

- the Sass map for `$surfaces`

Why:

- so Sass can read the same surface data used by JavaScript

### `packages/react/src/internal/motion/adapters/motion.ts`

This file is the Motion adapter for React.

What we added:

- token resolution from `@carbon/motion`
- FLIP transform calculation
- enter and exit animation logic
- reduced-motion fallback
- target style restoration after animation

Why:

- to translate the shared surface definition into a real animation
- to keep Motion-specific code out of `@carbon/motion`

What it uses:

- `getMotionSurface()`
- `resolveDuration()`
- `resolveEasing()`
- `animate` from `motion/mini`

### `packages/react/src/internal/motion/useMotionSurface.ts`

This file is the internal React helper for surface lifecycle.

What we added:

- controlled open / close coordination
- presence management
- source Tile visibility handling
- animation interruption handling
- reduced-motion support through Carbon media-query helpers

Why:

- to keep lifecycle logic separate from the visual story
- to create a reusable React helper for future surfaces

What it uses:

- `useMatchMedia`
- `useSavedCallback`
- `useIsomorphicEffect`
- `createMotionAdapter()`

### `packages/react/src/internal/motion/__tests__/useMotionSurface-test.js`

This file tests the React lifecycle helper.

What we added:

- reduced-motion test
- interrupted animation test
- cleanup on unmount test

### `packages/react/src/internal/motion/adapters/__tests__/motion-test.js`

This file tests the Motion adapter.

What we added:

- token conversion test
- FLIP transform test
- reduced-motion test
- measurable geometry validation test
- target style restore test

### `packages/react/src/components/Tile/Tile.motion.stories.js`

This file is the Storybook proof of concept.

What we added:

- `TileToDefaultModal`
- `TileToFullWidthModal`
- a grid of Carbon `ClickableTile` surfaces
- real Carbon `Modal` destinations
- a hover motion experiment for the full-width story

Why:

- to test a real Tile-to-Modal morph with Carbon components
- to compare a default Modal and a full-width Modal as destinations

What it uses:

- `ClickableTile`
- `Modal`
- `AspectRatio`
- `Grid` and `Column`
- `StructuredList`
- `TextInput`, `Select`, `Dropdown`, `ComboBox`, `MultiSelect`, `CheckboxGroup`,
  `Checkbox`
- `useMotionSurface()`
- `hover` from `motion`
- `animate` from `motion/mini`
- `resolveDuration()` and `resolveEasing()` for hover timing

### `packages/react/src/components/Tile/Tile.motion.stories.scss`

This file styles the Tile story content.

What we added:

- Tile content layout
- heading and description type styles
- spacing around the content
- a class for the hover-motion story

Why:

- to make the Tile look closer to the design reference
- to keep the styling inside Carbon tokens and type styles

What it uses:

- `@carbon/styles/scss/spacing`
- `@carbon/styles/scss/theme`
- `@carbon/styles/scss/type`
- `@carbon/styles/scss/utilities/component-reset`

## Files modified

### `packages/motion/src/tokens.ts`

What changed:

- added named duration support
- added easing resolution helpers
- kept the existing token source as the single source of truth

Why:

- JavaScript adapters need numeric timing and easing values

### `packages/motion/index.scss`

What changed:

- added generated `$surfaces`
- added `surface()` Sass function

Why:

- Sass needs access to the same surface data

### `packages/motion/__tests__/motion-test.js`

What changed:

- added tests for the `expand` surface
- added tests for Sass parity and error handling

### `packages/motion/__tests__/__snapshots__/motion-test.js.snap`

What changed:

- snapshot updated because the public motion API changed

### `packages/motion/docs/surfaces.md`

What changed:

- added the detailed architecture write-up
- added answers to open questions in simple comments
- documented the current scope, gaps, and limits

### `packages/motion/package.json`

What changed:

- added the surface Sass generation step to the build
- added `@carbon/scss-generator`

### `packages/react/package.json`

What changed:

- added `motion` as a development dependency

Why:

- the proof of concept uses `motion/mini`
- the hover experiment uses `hover` from `motion`

### `yarn.lock`

What changed:

- lockfile updated for dependency changes

## Important implementation notes

### Modal ownership

We did not rebuild the Carbon Modal.

We reused the real `Modal` component and only composed the content inside it.
The modal still owns:

- dialog semantics
- overlay behavior
- focus trap
- close behavior
- submit and secondary actions

### Why the Motion adapter is imperative

The proof of concept uses the imperative `animate()` API instead of Motion React
`layoutId`.

Why:

- `ClickableTile` and `Modal` are existing Carbon components
- the Modal public ref points to the overlay, not the inner modal container
- the spike needs to animate existing DOM elements without rewriting those
  components as Motion components

### Hover experiment

The hover effect is only a story experiment.

What it does:

- slightly moves the Tile up
- slightly scales the Tile up

Why:

- to test if Motion can add a hover state on top of Carbon behavior, just get an
  idea from Figma's example

What it uses:

- `hover` from `motion` to detect the hover gesture
- `animate` from `motion/mini` to animate the Tile transform
- Carbon motion tokens for duration and easing

## Current references

- Main architecture doc: `packages/motion/docs/surfaces.md`
- Carbon Modal story: `packages/react/src/components/Modal/Modal.stories.js`
- Carbon Modal Sass: `packages/styles/scss/components/modal/_modal.scss`
- Carbon Tile Sass: `packages/styles/scss/components/tile/_tile.scss`

## Current limits

- Only the `expand` surface is implemented
- The proof of concept currently targets React only
- The Modal surface still depends on a private query for the inner modal
  container
- The hover motion is a Storybook experiment, not a production API decision
