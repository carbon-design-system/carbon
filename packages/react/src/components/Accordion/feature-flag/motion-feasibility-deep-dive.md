# Motion Feasibility for Carbon

Last updated: 2026-05-30

## Scope

This document is intentionally focused on the **Motion library feasibility** for
Carbon. It does not repeat the full current-state inventory, which is covered
in:

- `packages/react/src/components/Accordion/feature-flag/motion-system-audit.md`

This document answers:

1. Is Motion feasible for Carbon React and Web Components?
2. What are the hard limitations?
3. How can users consume this in Carbon?
4. What breaking changes/regressions are likely?
5. Which component groups are good targets vs poor targets?
6. Is there a cost/license barrier?

## Carbon Monorepo Integration Structure

### Relevant package layers

The integration surface for Motion maps directly to Carbon’s package layering:

1. `@carbon/motion` (`packages/motion`): Carbon motion tokens/easing source.
2. `@carbon/styles` (`packages/styles`): shared Sass entrypoint used by both
   flagships.
3. `@carbon/react` (`packages/react`): React flagship, depends on
   `@carbon/styles`.
4. `@carbon/web-components` (`packages/web-components`): Web Components
   flagship, depends on `@carbon/styles`.

### Why this structure matters for Motion adoption

1. Carbon already has a shared semantic motion foundation in styles/tokens.
2. Motion should be added as an **optional runtime orchestration layer**, not a
   replacement for Carbon token semantics.
3. Adapter placement should stay above `@carbon/styles` and below app-level
   usage to avoid contaminating baseline bundles.

## Feasibility by Target

### React feasibility

Feasible with constraints.

Hard constraint:

1. Motion React is compatible with React 18.2+ (docs) and package peer range is
   React 18/19.
2. `@carbon/react` supports React 16.8/17/18/19.

Implication:

1. Motion **cannot** be a hard required dependency for all `@carbon/react`
   consumers without compatibility fallout.
2. Motion React should be exposed as an optional adapter path.

### Web Components feasibility

Feasible and cleaner from a compatibility perspective.

1. Motion JavaScript APIs (`motion`) are framework-agnostic and can be used in
   Lit lifecycle/event paths.
2. No React-version coupling exists.
3. Accessibility and lifecycle consistency remain the main engineering risks.

### Overall feasibility verdict

1. **Yes**, feasible for Carbon monorepo.
2. Best implementation model is **hybrid + opt-in**:
   - baseline = existing Carbon motion tokens/CSS behavior
   - optional runtime adapters = native and Motion

## Hard Limitations (Non-negotiable)

1. React support-range mismatch:
   - Carbon React support is broader than Motion React compatibility.
2. Runtime requirement:
   - advanced choreography from Motion requires client-side JS.
3. Browser/API variance:
   - View Transition API cannot be sole implementation path.
4. Accessibility requirements:
   - reduced-motion parity must be guaranteed for every new runtime animation.
5. Bundle budgets:
   - runtime motion features must remain opt-in; baseline Carbon bundles should
     stay unaffected.

## Consumption Model for Carbon Users

### What users get today

1. Tokenized motion through Sass (`@carbon/styles/scss/motion`).
2. Built-in component transitions from Carbon styles.
3. No paid product required.

### Recommended future consumption model

Three levels:

1. `Level 0` (default): Carbon CSS/token motion only.
2. `Level 1` (optional): Carbon native runtime adapter (platform APIs).
3. `Level 2` (optional): Carbon Motion adapter (Motion runtime orchestration).

Consumer API direction (intent-first):

```ts
applyCarbonMotion('expand.tile-to-side-panel.v1', {
  source: triggerEl,
  target: panelEl,
  adapter: 'native', // or 'motion'
});
```

This keeps semantics stable while allowing runtime engine choice.

## Breaking Changes and Regression Risk

### Highest-risk breaking scenario

1. Making `motion/react` mandatory in `@carbon/react`.
   - would create compatibility breakage for React 16/17 consumers.

### High-risk regression areas

1. Overlay lifecycle regressions:
   - modal/dialog/side-panel open/close timing, focus trap, escape handling.
2. Reduced-motion regressions:
   - new runtime transitions ignoring `prefers-reduced-motion`.
3. Performance regressions:
   - large tables/lists with JS-heavy choreography.
4. Bundle regressions:
   - accidental inclusion of Motion runtime in baseline bundles.
5. Parity regressions:
   - React and Web Components diverging on same intent semantics.

### Required regression test gates

1. Accessibility:
   - reduced motion on/off snapshots for each new motion intent.
2. Interaction:
   - keyboard, focus return, close actions, and user interruption behavior.
3. Visual parity:
   - same intent -> same outcome in React and Web Components stories.
4. Performance:
   - frame stability and interaction latency for dense UI cases.
5. Packaging:
   - confirm zero baseline bundle impact when adapters are not used.

## Component Fit Matrix

### Best first-wave candidates

These have explicit state transitions and high user value from choreography:

1. `invoke` group:
   - modal, dialog, menu/overflow-menu, dropdown, popover/tooltip-like patterns.
2. `expand` group:
   - tile expansion, side-panel-like expansions, detail panel transitions.
3. `disclosure` group:
   - data-table row expansion, accordion-style reveals.

### Use carefully / lower priority

1. Pure microinteractions already served by CSS:
   - hover/focus/active states in inputs/buttons/toggles.
2. High-cardinality dense surfaces:
   - per-cell or per-row heavy choreography in very large data sets.
3. Ambient long-running animations:
   - loading/skeleton behavior should remain tightly controlled and minimal.

### Strict “cannot assume” list

1. Cannot assume Motion React path for React 16/17 consumers.
2. Cannot assume View Transition API as the only underlying engine.

## Cost and Licensing

1. Motion core library is open source and MIT licensed.
2. Motion core usage does **not** require payment.
3. Motion+ is a separate paid offering (premium resources/tooling), optional and
   not required for core API usage.

## Recommended Delivery Plan

1. Define Carbon motion intent contracts (`invoke`, `expand`, `contextual`,
   `disclosure`) independent of engine.
2. Publish native adapter reference first.
3. Publish Motion adapter as optional add-on.
4. Ship parity Storybook examples in React and Web Components.
5. Enforce regression gates before expanding component coverage.

## Summary (for decision log)

1. Motion is feasible for Carbon, but should be adopted as an **optional adapter
   layer**, not a baseline dependency.
2. Main limitation is React compatibility scope (Motion React 18.2+ vs Carbon
   React support including 16/17).
3. Web Components path is feasible with fewer compatibility constraints.
4. Best path is intent-first contracts with adapter choice (`native` or
   `motion`).
5. Focus first on overlay/expand/disclosure patterns; avoid replacing stable CSS
   microinteractions.
6. No mandatory licensing cost for core Motion usage (MIT/open-source).

## Additional Analysis Needed: Button Radius Cascade

This scenario is related to system theming/scaling risk and should be tracked in
this feasibility context because runtime motion changes are often bundled with
shape/token changes in product initiatives.

### Where the code change starts

If the prototype change is “round buttons,” the primary Sass source is:

1. `packages/styles/scss/components/button/_vars.scss`
   - `$button-border-radius: 0 !default;`
2. Applied in:
   - `packages/styles/scss/components/button/_mixins.scss`
   - `border-radius: $button-border-radius;`

So this is a **global token-level change** for Carbon button shape.

### How the change cascades through the system

The biggest cascade risk is not standalone button rendering, but
**adjacent\nbutton layouts** that currently rely on edge-to-edge geometry plus
1px separators.

Key touchpoints:

1. Button set separator model in styles:
   - `packages/styles/scss/components/button/_button.scss`
   - `box-shadow`-based 1px separators for `.cds--btn-set` and stacked sets.
2. Button set separator model in Web Components:
   - `packages/web-components/src/components/button/button.scss`
   - slotted button separators via 1px `box-shadow`.
3. Modal footer and side-panel button-set flows (Web Components):
   - same button-set mechanics used by modal/footer/panel button arrangements.
4. Data table action/batch bars:
   - `packages/styles/scss/components/data-table/action/_data-table-action.scss`
   - custom inline button paddings and pseudo-divider behavior.

### Pill radius (50%) impact profile

If `border-radius` moves to `50%` (pill-like):

1. Adjacent button sets can no longer visually sit flush without artifacts.
2. Existing 1px separator strategy becomes semantically/geometrically wrong.
3. To avoid collisions, spacing/gap must be introduced.
4. Introducing gap changes total action-group width and can disrupt:
   - modal footer layouts,
   - side-panel action rows,
   - table toolbar/batch-action density.
5. Container query/auto-stack behavior in fluid button sets may trigger earlier
   because effective width per action increases.

### Subtle radius impact profile

If radius changes subtly (for example, low px/rem rather than pill):

1. Existing edge-to-edge + 1px separator model can often be retained.
2. Layout disruption is substantially lower.
3. Migration risk is mostly visual polish, not structural reflow.
4. This is generally a safer first step for system-wide rollout.

### “What else is part of definition of done?”

Beyond visual updates:

1. Focus states:
   - Ensure focus ring behavior remains clear and not clipped by new curvature
     or adjacency rules.
2. Interaction density:
   - Validate action groups in constrained widths (modal/footer/toolbar/panel).
3. Motion coupling:
   - If shape and motion change together, test transition continuity and reduced
     motion behavior in the same QA pass.
4. Token governance:
   - Prefer tokenized radius tiers over one-off overrides per component.

### Accessibility checks for a radius change

1. Target size and spacing:
   - verify WCAG 2.2 SC 2.5.8 target size/spacing implications for tightly
     packed actions.
2. Focus visibility/appearance:
   - verify focus indicator remains robust (contrast/area) after radius change.
3. Contrast and affordance:
   - ensure shape changes do not reduce control boundary clarity in low-contrast
     themes or dense contexts.
4. Text and icon fit:
   - ensure no clipping/reflow regressions in localized labels and large text.

### Potential consumer impact and mitigation

Potential disruption:

1. Visual regressions in custom layouts that assume flush button adjacency.
2. Action-row wrapping changes in narrow containers.
3. Snapshot/visual-test churn across downstream products.

Mitigations:

1. Roll out via feature flag or opt-in token tier.
2. Provide `codemod/migration` notes for button-set spacing assumptions.
3. Ship comparison guidance: “subtle radius profile” vs “pill profile.”
4. Keep a compatibility preset for legacy adjacency behavior during migration.

### Coverage status of this specific ask

1. The prior version of this doc did not explicitly detail this button-radius
   cascade scenario.
2. This section now captures the code path and primary impact/risk model.
3. External verification still pending:
   - Nandan: AI chat example (`card--with-actions`) should be reviewed in the
     Carbon AI Chat repo to validate its rounded-corner scalability pattern
     before citing as an internal benchmark.

## Motion-Specific Sources

1. Motion install docs: https://motion.dev/docs/react-installation
2. Motion quick start: https://motion.dev/docs/quick-start
3. Motion animate API: https://motion.dev/docs/animate
4. Motion pricing: https://motion.dev/pricing
5. Motion package metadata:
   https://raw.githubusercontent.com/motiondivision/motion/main/packages/motion/package.json
6. Motion license:
   https://raw.githubusercontent.com/motiondivision/motion/main/LICENSE.md

## Carbon Structure Sources

`docs/generated/package-structure.json` `packages/styles/package.json`
`packages/react/package.json` `packages/web-components/package.json`
`packages/motion/src/index.ts` `packages/motion/index.scss`
`packages/styles/scss/components/button/_vars.scss`
`packages/styles/scss/components/button/_mixins.scss`
`packages/styles/scss/components/button/_button.scss`
`packages/web-components/src/components/button/button.scss`
`packages/styles/scss/components/data-table/action/_data-table-action.scss`

## External Follow-up Source

1. Carbon AI Chat repo (for rounded-corner scalability verification):
   https://github.com/carbon-design-system/carbon-ai-chat
