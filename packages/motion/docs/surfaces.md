# Motion surfaces architecture spike

This spike covers named motion surfaces shared across Carbon:

- `disclosure`: accordion / table-row expand — reveal in place
- `contextual`: icon > tooltip / popover — reveal with opacity and scale
- `expand`: card / tile > side-panel / tearsheet — shared-element morph
- `invoke`: button > modal / menu / popover — shared-element morph from the
  trigger

## Goal

The goal of this spike is to test a simple architecture where:

- motion surface definitions live in `@carbon/motion`
- Sass values are generated from the same source definition
- React owns lifecycle and presence logic
- Motion runs reveal and shared-element animations
- Carbon components keep ownership of layout, focus, dialog behavior, and
  semantics

## Files created

### `packages/motion/src/surfaces.ts`

This file defines the shared motion surface data.

What we added:

- the `disclosure`, `contextual`, `expand`, and `invoke` surfaces
- reveal vs shared-element surface kinds
- optional enter / exit keyframes on shared-element surfaces (used by `expand`
  for a CSS-replicable opacity / scale layer)
- optional `origin: 'trigger'` on shared-element surfaces (used by `invoke`)
- `getMotionSurface()`
- `MotionSurfaceName`

Why:

- to keep the motion intent in one shared place
- to avoid putting React or Motion-specific values in the base definition
- so Sass, React, and future engines can read the same named intents

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

### `packages/react/src/internal/motion/useMotionSurface.ts`

This file is the internal React helper that resolves a named surface into
Motion-ready values.

What we added:

- token resolution from `@carbon/motion` (duration and easing names into seconds
  and cubic-bezier tuples)
- reveal surfaces resolved to `initial` / `animate` / `exit` targets
- shared-element surfaces resolved to enter / exit transitions
- optional `animate` / `exit` keyframes on shared-element surfaces when the
  definition includes them (`expand`)
- reduced-motion gating through `useMotionEnabled()`

Why:

- to keep Motion-specific numeric forms out of `@carbon/motion`
- to create a reusable React helper for every surface name

What it uses:

- `getMotionSurface()`
- `resolveDuration()`
- `resolveEasing()`
- `useMotionEnabled()`
- types from `motion/react`

### `packages/react/src/internal/motion/useMotionEnabled.ts`

This file is the accessibility gate for the surface API.

What we added:

- a hook that returns whether surface motion should run
- a bail-out when the user prefers reduced motion

Why:

- surfaces never animate when users request reduced motion
- components fall back to default rendering (and their baseline CSS transitions)

What it uses:

- `useReducedMotion` from `motion/react`

### `packages/react/src/internal/motion/MotionSurface.tsx`

This file is the React surface entrypoint.

What we added:

- `MotionSurface` for reveal and shared-element destinations
- `MotionSurfaceOrigin` for shared-element sources, paired by `surfaceId`
- `layoutId` morphs for shared-element surfaces via Motion React
- optional opacity / scale keyframes on top of the morph when the surface
  defines enter / exit (`expand`)
- `AnimatePresence` for enter / exit lifecycle
- a hold on enclosing Carbon presence (for example `ModalPresence`) until
  Motion's exit finishes
- immediate mount / unmount with no Motion when reduced motion is on

Why:

- to apply a named surface without rewriting Carbon components as Motion
  components
- to keep presence and reduced-motion behavior in one place

What it uses:

- `useMotionSurface()`
- `AnimatePresence` and `motion` from `motion/react`
- `PresenceHoldContext`

### `packages/react/src/internal/motion/__tests__/useMotionSurface-test.js`

This file tests the React surface resolver.

What we added:

- shared-element resolution tests for `expand` and `invoke`
- reveal resolution tests for `contextual`
- reduced-motion / `enabled` gating test

### `packages/react/src/internal/motion/__tests__/MotionSurface-test.js`

This file tests the React surface components.

What we added:

- open rendering test
- reveal enter / exit behavior
- shared-element pairing with `MotionSurfaceOrigin`
- reduced-motion mount / unmount behavior
- `onExitComplete` behavior

### `packages/react/src/internal/motion/__tests__/MotionSurfacePresence-test.js`

This file tests presence hold integration.

What we added:

- hold-until-exit behavior when a Carbon presence context is present
- reopen-during-exit behavior

### `packages/react/src/internal/motion/__tests__/useMotionEnabled-test.js`

This file tests the reduced-motion gate.

### `packages/react/src/components/Motion/Expand.stories.js`

This file is the Storybook proof of concept for the `expand` surface.

What we added:

- a grid of Carbon `ClickableTile` origins
- each tile wrapped in `MotionSurfaceOrigin`
- a demo dialog destination driven by `MotionSurface`
- tile-to-dialog morph and morph-back on close

Why:

- to test a real tile-to-dialog morph with Carbon components
- to keep the demo focused on `MotionSurface` rather than full Modal integration

What it uses:

- `ClickableTile`
- `AspectRatio`
- `Grid` and `Column`
- `MotionSurfaceOrigin`
- `DemoDialog`

### `packages/react/src/components/Motion/Invoke.stories.js`

This file is the Storybook proof of concept for the `invoke` surface.

What we added:

- `ButtonToDialog`: button trigger morphs into the dialog
- `TileToDialog`: tile trigger morphs into the dialog
- each trigger wrapped in `MotionSurfaceOrigin` with `surface="invoke"`

Why:

- to show the invoke shared-element intent (morph from the trigger)
- to compare button and tile origins with the same surface

What it uses:

- `Button`
- `ClickableTile`
- `MotionSurfaceOrigin`
- `DemoDialog`

### `packages/react/src/components/Motion/DemoDialog.js`

This file is story-only dialog chrome for the surface demos.

What we added:

- modal overlay classes for the backdrop fade
- a `MotionSurface` container so Motion owns the morph
- basic dialog semantics and a close control

Why:

- threading a surface through the real `Modal` is the next integration step
- the demo stays minimal so the story reads as a `MotionSurface` example

What it uses:

- `MotionSurface`
- Carbon modal class names via `usePrefix()`
- `Button`

### `packages/react/src/components/Motion/surfaces.stories.scss`

This file styles the Motion surface stories.

What we added:

- layout helpers for the demo grid and origins
- neutralization of stock modal container transitions so CSS does not fight
  Motion
- hover emphasis for the expand tile story
- a larger destination size for the expand dialog

Why:

- to keep demo layout and chrome styling out of the surface definitions
- to avoid competing CSS animations during the morph

What it uses:

- `@carbon/styles/scss/motion`
- `@carbon/styles/scss/spacing`
- `@carbon/styles/scss/utilities/box-shadow`

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
- added `surface()` Sass mixin for reveal surfaces (`@starting-style` entrance,
  guarded by `prefers-reduced-motion: no-preference`)
- shared-element surfaces are rejected by the mixin (no CSS-only form)

Why:

- Sass needs access to the same surface data
- reveal surfaces can run in plain CSS; shared-element morphs need a JavaScript
  engine

### `packages/motion/__tests__/motion-test.js`

What changed:

- added tests for expand, invoke, disclosure, and contextual surfaces
- added Sass parity tests for expand and disclosure
- added error handling for unknown surfaces and for applying the shared-element
  mixin in CSS

### `packages/motion/__tests__/__snapshots__/motion-test.js.snap`

What changed:

- snapshot updated because the public motion API changed

### `packages/motion/docs/surfaces.md`

What changed:

- rewritten to match the current surface catalog and React adapter
- documented reveal vs shared-element kinds, story demos, gaps, and limits

### `packages/motion/package.json`

What changed:

- added the surface Sass generation step to the build
- added `@carbon/scss-generator`

### `packages/react/package.json`

What changed:

- added `motion` as a dependency

Why:

- the React adapter uses `motion/react` for `layoutId`, `AnimatePresence`, and
  reduced-motion detection

### `yarn.lock`

What changed:

- lockfile updated for dependency changes

## Important implementation notes

### Surface kinds

Surfaces are either:

- `reveal`: one element animates between enter / exit styles. Works in CSS (Sass
  mixin) and in Motion React.
- `shared-element`: one element morphs into another. Needs a JavaScript engine.
  In React this is Motion `layoutId` pairing between `MotionSurfaceOrigin` and
  `MotionSurface`.

`expand` and `invoke` are both shared-element. They share the same React morph
path today. They differ in tokens:

- `expand`: productive easing, plus optional enter / exit opacity and scale
  keyframes layered on the morph
- `invoke`: expressive easing, `origin: 'trigger'` (carried through the
  resolver; the React morph path does not branch on `origin` yet)

### Demo dialog ownership

We did not rebuild the Carbon Modal for the spike demos.

`DemoDialog` reuses modal overlay classes for the backdrop and puts
`MotionSurface` on the container. The real `Modal` still owns production dialog
behavior:

- dialog semantics
- overlay behavior
- focus trap
- close behavior
- submit and secondary actions

Wiring surfaces through the real `Modal` is the next integration step.

### Why the React adapter uses Motion React `layoutId`

The current proof of concept uses declarative Motion React (`layoutId`,
`AnimatePresence`) instead of the earlier imperative `animate()` FLIP adapter.

Why:

- shared-element pairing maps cleanly to `MotionSurfaceOrigin` + `MotionSurface`
  with a matching `surfaceId`
- reveal surfaces map cleanly to Motion `initial` / `animate` / `exit`
- Carbon presence can hold exit until Motion finishes

Tradeoff:

- layout projection can stretch in-origin content (for example tile text) during
  the morph
- content crossfade / shell-only morph and axis-sequenced expand choreography
  are still open follow-ups

### Reduced motion

`prefers-reduced-motion` is intentionally not stored on the surface definition.
Framework adapters bail before running, and the Sass reveal mixin wraps
animation in `prefers-reduced-motion: no-preference`.

## Current references

- Main architecture doc: `packages/motion/docs/surfaces.md`
- Surface definitions: `packages/motion/src/surfaces.ts`
- React surface components:
  `packages/react/src/internal/motion/MotionSurface.tsx`
- Expand story: `packages/react/src/components/Motion/Expand.stories.js`
- Invoke story: `packages/react/src/components/Motion/Invoke.stories.js`
- Carbon Modal story: `packages/react/src/components/Modal/Modal.stories.js`
- Carbon Modal Sass: `packages/styles/scss/components/modal/_modal.scss`
- Carbon Tile Sass: `packages/styles/scss/components/tile/_tile.scss`

## Current limits

- Shared-element React path does not yet differentiate `expand` and `invoke`
  beyond easing and optional keyframes / `origin` metadata
- `origin: 'trigger'` is resolved but not used to change the morph
- Axis-sequenced expand (width then height) is not implemented
- Content stretch during `layoutId` morphs is unresolved (shell morph + content
  crossfade is the likely follow-up)
- The proof of concept currently targets React only
- Story demos use `DemoDialog`, not the production `Modal` API
- Reveal surfaces (`disclosure`, `contextual`) are defined and resolved, but do
  not yet have dedicated Storybook demos alongside expand / invoke
