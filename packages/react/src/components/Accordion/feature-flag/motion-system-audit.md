Carbon Monorepo Today

# Motion System Audit

Last updated: 2026-05-29

Carbon’s motion system in the monorepo is well established, centralized, and
mostly consistent. The source of truth is `@carbon/motion`, which defines six
duration tokens and a clear easing model (standard, entrance, exit in productive
and expressive modes). Those foundations flow through `@carbon/styles` and into
both React and Web Components via shared Sass entry points. In day-to-day usage,
the pattern is clear: productive/standard easing is used for most
microinteractions, while expressive motion is reserved for high-impact moments
like modal and dialog transitions. Accessibility is also built in at scale, with
broad prefers-reduced-motion support plus targeted runtime handling where needed
(for example, side panel behavior).

The main strength is consistency, and the main weakness is flexibility and
documentation alignment. Motion is token driven and reliable, but the core
package is not highly configurable, so deeper customization tends to happen at
the component level or behind feature flags. There are also some documentation
mismatches (legacy guidance and small inconsistencies with current
implementation), plus a few hard-coded timing values that bypass shared tokens.
So the pros are coherence, accessibility coverage, and predictable quality.And
the cons are limited global configurability, documentation drift, and occasional
one-off implementation choices. The key takeaway is that the system is strong
today, and it can become even stronger by tightening docs and reducing
exceptions so guidance and code stay perfectly in sync.

## Purpose and scope

This document provides a detailed, implementation-level audit of motion in this
monorepo:

1. What motion assets exist.
2. How motion works in Sass and JavaScript/TypeScript.
3. Where motion is configured.
4. Where motion is consumed across styles, React, and web components.
5. How accessibility and reduced-motion behavior is implemented.
6. How this implementation aligns with current public guidance from Carbon and
   IBM Design Language.

This is an inventory of current state, not a proposal.

## Canonical external guidance included

This audit incorporates:

1. Carbon Motion Overview:
   https://carbondesignsystem.com/elements/motion/overview/
2. Carbon Motion Choreography:
   https://carbondesignsystem.com/elements/motion/choreography/
3. Carbon Motion Code: https://carbondesignsystem.com/elements/motion/code/
4. IBM Design Language Animation Overview:
   https://www.ibm.com/design/language/animation/overview

## External guidance summary

### IBM Design Language animation overview

The IBM page frames animation as a communication tool that should guide progress
"from here to there, now to next, start to finish". Its implementation posture
is:

1. Approach principles: Effective, Concise, Simple, Engineered.
2. Motion types: Productive and Expressive.
3. Composition goals: Use both types in harmony to control tone.
4. Applications: Illustration and user interface narratives.

### Carbon motion overview/choreography/code

Carbon guidance reinforces the same productive/expressive model, then adds UI
implementation details:

1. Easing taxonomy: Standard, Entrance, Exit; each with productive/expressive
   variants.
2. Duration model: Size-dependent duration concept with six static tokens today.
3. Choreography: Grid-aligned paths, consistency, continuity, sequence, and
   stagger.
4. Implementation checklist: Purposeful, responsive, meticulous, unobtrusive
   motion.
5. Adaptive design: Reduced/simplified motion and static alternatives where
   necessary.

## Motion architecture in our monorepo

### Source of truth package

Primary package: `@carbon/motion` in `packages/motion`.

Key files:

1. `packages/motion/index.scss`
2. `packages/motion/src/index.ts`
3. `packages/motion/package.json`
4. `packages/motion/docs/sass.md`
5. `packages/motion/__tests__/motion-test.js`

What it provides:

1. Sass: Easing map, `motion()` function/mixin, duration tokens.
2. JS/TS: Duration constants, easing map, `motion(name, mode)` lookup helper.

### Re-export layers

Motion is re-exported through multiple package layers:

1. `@carbon/styles/scss/motion` forwards `@carbon/motion` and adds helper
   aliases in `packages/styles/scss/_motion.scss`.
2. `@carbon/react/scss/motion` forwards `@carbon/styles/scss/motion`.
3. Deprecated entrypoints also forward (just for information):
   `packages/carbon-components/scss/_motion.scss` and
   `packages/carbon-components-react/scss/_motion.scss`.
4. `@carbon/elements` forwards `@carbon/motion` in Sass and re-exports motion JS
   functions in `packages/elements/src/index.ts`.

## Exact API and token values

### Easing map

From `packages/motion/index.scss` and `packages/motion/src/index.ts`:

1. `standard.productive`: `cubic-bezier(0.2, 0, 0.38, 0.9)`
2. `standard.expressive`: `cubic-bezier(0.4, 0.14, 0.3, 1)`
3. `entrance.productive`: `cubic-bezier(0, 0, 0.38, 0.9)`
4. `entrance.expressive`: `cubic-bezier(0, 0, 0.3, 1)`
5. `exit.productive`: `cubic-bezier(0.2, 0, 1, 0.9)`
6. `exit.expressive`: `cubic-bezier(0.4, 0.14, 1, 1)`

### Duration tokens

From `packages/motion/index.scss` and `packages/motion/src/index.ts`:

1. `duration-fast-01`: `70ms`
2. `duration-fast-02`: `110ms`
3. `duration-moderate-01`: `150ms`
4. `duration-moderate-02`: `240ms`
5. `duration-slow-01`: `400ms`
6. `duration-slow-02`: `700ms`

### Sass API

Provided by `@carbon/motion`:

1. `@function motion($name, $mode: productive, $easings: $easings)`
2. `@mixin motion($name, $mode)`
3. `$easings` map
4. duration tokens above
5. deprecated aliases: `$fast-01`, `$fast-02`, `$moderate-01`, `$moderate-02`,
   `$slow-01`, `$slow-02`

### JS API

Provided by `packages/motion/src/index.ts`:

1. `easings`
2. `motion(name, mode)`
3. `fast01`, `fast02`, `moderate01`, `moderate02`, `slow01`, `slow02`
4. `durationFast01`, `durationFast02`, `durationModerate01`,
   `durationModerate02`, `durationSlow01`, `durationSlow02`
5. `unstable_tokens`

`motion(name, mode)` throws explicit errors for unsupported easing names or
modes (covered by tests).

## Configuration model

### `@carbon/motion` package configuration

Current source in `packages/motion/index.scss` does not expose configurable Sass
module options (no module-level `!default` knobs used by consumers for motion
behavior itself).

### Global style-layer configuration affecting motion behavior

Motion behavior is indirectly configurable through feature flags and component
mixins:

1. `enable-presence` flag default is `false` in
   `packages/styles/scss/_feature-flags.scss`.
2. Modal and dialog switch between transition-style and presence animation
   branches based on this flag and mixin parameters in:
   `packages/styles/scss/components/modal/_modal.scss` and
   `packages/styles/scss/components/dialog/_dialog.scss`.

### Component-level motion controls

Some components define additional runtime/configuration controls, for example:

1. Tooltip, open/close delays: `enter-delay-ms` default `100`, `leave-delay-ms`
   default `300` in `packages/web-components/src/components/tooltip/tooltip.ts`.
2. Carousel utility `$animateTime` default: `$duration-moderate-02` in
   `packages/utilities/scss/carousel/_carousel.scss`.

## Motion usage

### Quantitative snapshot

From code search (styles/web-components/utilities):

1. `motion(...)` call sites: `248`.
2. Files containing `motion(...)`: `54` in `packages/styles/scss`, `17` in
   `packages/web-components/src`, `2` in `packages/react/src`.
3. `prefers-reduced-motion` occurrences: `48` total.
4. Files importing motion Sass entrypoint: `86`.

### Easing usage distribution

Observed call distribution:

1. `motion(standard, productive)`: `167`
2. `motion(entrance, productive)`: `35`
3. `motion(entrance, expressive)`: `15`
4. `motion(exit, expressive)`: `14`
5. `motion(exit, productive)`: `4`
6. `motion(standard, expressive)`: `2`
7. `motion(standard)`: `2` (defaulting to productive)

Interpretation:

1. Productive standard easing dominates microinteraction and component level
   transitions.
2. Expressive easing concentrates in major transitions like modal/dialog.

### Duration token usage distribution

Observed token frequency:

1. `$duration-fast-02`: `105`
2. `$duration-fast-01`: `93`
3. `$duration-moderate-02`: `33`
4. `$duration-moderate-01`: `23`
5. `$standard-easing`: `13`
6. `$transition-expansion`: `9`
7. `$transition-base`: `6`
8. `$ease-out`: `5`
9. `$ease-in`: `2`
10. `$duration-slow-02`: `2`

Interpretation:

1. Fast tokens are heavily used for responsiveness and microinteractions.
2. Expressive/slow tokens are comparatively narrow and tied to overlays/loading.

## Where reduced-motion is implemented

### CSS media-query handling

Reduced motion appears in at least these areas:

1. Modal/dialog/accordion/tile/overflow-menu/breadcrumb/toggle/date-picker.
2. Tooltip and skeleton utilities.
3. Loading animation utilities.
4. Utilities carousel.
5. Web components wrappers for modal/accordion/button/etc.

Representative files:

1. `packages/styles/scss/components/modal/_modal.scss`
2. `packages/styles/scss/components/dialog/_dialog.scss`
3. `packages/styles/scss/utilities/_skeleton.scss`
4. `packages/styles/scss/utilities/_tooltip.scss`
5. `packages/web-components/src/components/modal/modal.scss`

### Runtime reduced-motion handling

Runtime `matchMedia('(prefers-reduced-motion: reduce)')` appears in:

1. `packages/web-components/src/components/side-panel/side-panel.ts`

It disables margin transition on surrounding page content when reduced motion is
requested.

## Patterns by implementation layer

### Styles (`@carbon/styles`)

Primary characteristics:

1. Most component motion is Sass token driven and centrally themed.
2. Productive motion is default for control state transitions.
3. Expressive motion is used for high emphasis transitions (modal/dialog).
4. Presence branches exist for dialog/modal for modern entrance/exit flows.

### React (`@carbon/react`)

Primary characteristics:

1. React does not directly call motion utilities in component source.
2. Motion comes from shared compiled Sass (`@carbon/styles` re-export).
3. React has a generic `useMatchMedia` hook, but not motion-token behavior in
   component logic as a motion API surface.

### Web Components (`@carbon/web-components`)

Primary characteristics:

1. Component SCSS imports `@carbon/styles/scss/motion` widely.
2. Motion semantics largely mirror styles package behavior.
3. Some runtime motion logic appears in TS where component interaction requires
   it (example: side panel content shift).

## Alignment with Carbon and IBM guidance

### Strong alignment

1. Productive vs expressive taxonomy is faithfully implemented.
2. Easing curves in source match Carbon public guidance.
3. Duration tokens match Carbon public duration table values.
4. Reduced-motion alternatives are broadly present.
5. Choreography ideas (sequence/stagger/path consistency) are reflected in
   component behavior patterns where applicable.

### Notable gaps and inconsistencies

1. `packages/motion/README.md` still documents legacy `@import` and
   `carbon--motion` naming (outdated for current Sass module usage).
2. `packages/styles/docs/sass.md` motion section contains placeholder
   `For more information, checkout our [motion](#todo) docs.`
3. Carbon website `code.mdx` says `$prefix` can be configured in
   `@carbon/motion`; current package source does not expose this as an actual
   configurable option.
4. A few non-tokenized literal timings exist (example `175ms`, `1400ms`,
   `1250ms`, `690ms`) used for specific behavior rather than shared motion
   tokens.

## Legacy and migration context

Relevant migration docs:

1. `docs/migration/10.x-motion.md`
2. `docs/migration/v11.md`

Key migration state:

1. v10/v11 naming migrations are documented.
2. Deprecated duration aliases remain exported for compatibility in
   `@carbon/motion`.
3. Compatibility coverage is tested in
   `packages/styles/__tests__/compat-test.js`.

## Practical guidance for contributors

When adding or changing motion in this repo:

1. Prefer `@use '@carbon/styles/scss/motion'` (or relative `../../motion` in
   style internals) and tokenized durations/easing.
2. Use productive motion by default for microinteractions.
3. Reserve expressive motion for meaningful, high-attention moments.
4. Add reduced-motion alternatives for any new transition/animation.
5. Keep motion consistent semantically: same intent => same motion behavior.
6. Avoid introducing bespoke durations unless there is a clear, defensible
   reason.

## Source map (internal)

Core package:

1. `packages/motion/index.scss`
2. `packages/motion/src/index.ts`
3. `packages/motion/docs/sass.md`
4. `packages/motion/README.md`
5. `packages/motion/__tests__/motion-test.js`

Styles and adapters:

1. `packages/styles/scss/_motion.scss`
2. `packages/styles/scss/_feature-flags.scss`
3. `packages/styles/scss/components/modal/_modal.scss`
4. `packages/styles/scss/components/dialog/_dialog.scss`
5. `packages/styles/scss/components/loading/_animation.scss`
6. `packages/styles/scss/utilities/_skeleton.scss`
7. `packages/styles/scss/utilities/_tooltip.scss`
8. `packages/react/scss/_motion.scss`
9. `packages/carbon-components/scss/_motion.scss`
10. `packages/carbon-components-react/scss/_motion.scss`

Web components and runtime behavior:

1. `packages/web-components/src/components/modal/modal.scss`
2. `packages/web-components/src/components/accordion/accordion.scss`
3. `packages/web-components/src/components/overflow-menu/overflow-menu.scss`
4. `packages/web-components/src/components/data-table/_table-expandable.scss`
5. `packages/web-components/src/components/side-panel/side-panel.ts`
6. `packages/web-components/src/components/tooltip/tooltip.ts`

Utilities:

1. `packages/utilities/scss/carousel/_carousel.scss`

Migration references:

1. `docs/migration/10.x-motion.md`
2. `docs/migration/v11.md`

## Source map (external)

Carbon:

1. https://carbondesignsystem.com/elements/motion/overview/
2. https://carbondesignsystem.com/elements/motion/choreography/
3. https://carbondesignsystem.com/elements/motion/code/
4. https://raw.githubusercontent.com/carbon-design-system/carbon-website/main/src/pages/elements/motion/overview.mdx
5. https://raw.githubusercontent.com/carbon-design-system/carbon-website/main/src/pages/elements/motion/choreography.mdx
6. https://raw.githubusercontent.com/carbon-design-system/carbon-website/main/src/pages/elements/motion/code.mdx

IBM Design Language:

1. https://www.ibm.com/design/language/animation/overview
2. https://www.ibm.com/design/language/page-data/animation/overview/page-data.json
