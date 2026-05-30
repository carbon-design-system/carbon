# Motion Library vs Native CSS in Carbon

Last updated: 2026-05-30

## Objective

Compare two implementation strategies for production motion in Carbon:

1. Motion Library (`motion` package)
2. Native CSS/browser APIs (Carbon’s current baseline)

This document focuses on feasibility, risk, and integration fit for Carbon React
and Web Components.

## Carbon Integration Context

Relevant layers in monorepo:

1. `@carbon/motion`: Carbon motion tokens/easing semantics.
2. `@carbon/styles`: shared style foundation for both flagships.
3. `@carbon/react`: React flagship.
4. `@carbon/web-components`: Web Components flagship.

Important: this structure already gives us a semantic motion baseline. Any
runtime library should layer on top of this baseline, not replace it.

For this prototype, Motion runtime imports are used in story code only:

1. React story uses `motion/react`.
2. Web Components story uses `motion`.

Practical requirement: declare `motion` in workspace `package.json` where it is
imported so Storybook/build tooling does not rely on accidental transitive
hoisting.

## Strategy A: Motion Library

### Strengths

1. Better ergonomics for complex choreography (enter/exit sequencing,
   interruptible transitions, orchestration).
2. Reusable runtime primitives across flows where CSS becomes verbose or
   brittle.
3. Can be used in React (`motion/react`) and vanilla/DOM contexts (`motion`).
4. Supports advanced interaction patterns with less custom plumbing.
5. Open-source and MIT licensed.

### Cost/licensing

1. Core Motion package is free to use (MIT).
2. No paid license is required for library usage in product code.
3. Motion+ is optional paid tooling/content and not required for runtime usage.

### Constraints

1. React compatibility scope:
   - Motion React docs specify compatibility from React 18.2+.
   - Carbon React supports React 16/17/18/19.
2. Runtime dependency and bundle impact must be managed as opt-in.
3. Requires robust reduced-motion handling and fallback behavior.

## Strategy B: Native CSS + Existing Carbon Motion Tokens

### Strengths

1. Lowest baseline complexity and dependency risk.
2. Strong fit for microinteractions and straightforward state transitions.
3. Already aligned with Carbon’s tokenized easing/duration semantics.
4. Broad compatibility and simpler maintenance for most components.

### Constraints

1. Complex choreography scales poorly (duplication, brittle sequencing).
2. Cross-surface/shared-element narratives require significant custom code.
3. Harder to standardize advanced motion patterns across React + Web Components.

## Feasibility Verdict in Carbon

1. Motion Library is feasible in Carbon.
2. Native CSS is feasible and should remain baseline.
3. Best fit for Carbon is a hybrid model:
   - baseline CSS/token path for default behavior
   - optional Motion runtime path for advanced choreography
4. Full 1:1 parity for every future animation between React and Web Components
   is possible for many patterns, but not guaranteed by default:
   - parity requires shared motion intent contracts, regression tests, and
     framework-specific adapters.

## Which Works Better in Carbon?

### For baseline system behavior

Native CSS works better.

Reason:

1. Lower operational risk.
2. Matches existing Carbon architecture.
3. Better for broad compatibility and maintenance.

### For advanced product choreography

Motion Library works better.

Reason:

1. Faster implementation for richer transitions.
2. Cleaner authoring model for sequence/exit/interrupt patterns.
3. Better scalability for interaction narratives beyond microstates.

### Final recommendation

Use native CSS as default and Motion Library as opt-in enhancement for defined
advanced patterns.

## Demonstration Implemented

To validate real feasibility with Carbon patterns, we added research stories for
Accordion + Skeleton in both stacks:

### React stories

File:

- `packages/react/src/components/Accordion/feature-flag/Accordion.featureflag.stories.js`

Stories:

1. `Motion Library`
2. `Native CSS`

### Web Components stories

File:

- `packages/web-components/src/components/accordion/feature-flag/accordion.feature-flag.stories.ts`

Stories:

1. `MotionLibrary`
2. `NativeCSS`

### What these demos simulate

1. Skeleton-to-content transition for accordion data loading states.
2. Replayable transition flow for side-by-side implementation comparison.
3. Reduced-motion-aware behavior in runtime path.
4. Carbon-consistent component composition and naming.
5. Feature-flag scoping via `enable-accordion-motion` in both frameworks.

## Production Risks Identified

1. React compatibility scope mismatch if Motion React is made mandatory.
2. Overlay/focus lifecycle regressions if runtime transitions are introduced
   without lifecycle tests.
3. Bundle regressions if runtime Motion code leaks into baseline builds.
4. Parity drift if React and Web Components are implemented without shared
   intent contracts.
5. Potential dependency policy drift if Motion is consumed in source without
   explicit workspace dependency declarations.

## Consumer Impact

Potentially disruptive if done incorrectly:

1. Mandatory runtime dependency adoption.
2. Visual timing changes in workflows consumers rely on.
3. Regression churn in downstream visual tests.

Mitigation:

1. Keep Motion optional.
2. Version and document intent contracts.
3. Ship migration notes and parity stories.
4. Gate with a11y/perf/interaction regression tests.

## Can we use motion we already have in monorepo?

Yes, and we should.

Clarification:

1. Carbon already has `@carbon/motion` tokens/curves (semantic source of truth).
2. If Motion Library runtime is used, it should consume/align to those Carbon
   semantics (durations/easing intent), not invent new motion language.

## Decision Matrix (Carbon-specific)

1. Compatibility breadth:
   - Native CSS: High
   - Motion Library: Medium (React version scope caveat)
2. Complex choreography scalability:
   - Native CSS: Medium/Low
   - Motion Library: High
3. Baseline bundle safety:
   - Native CSS: High
   - Motion Library: Medium (if unmanaged)
4. Implementation speed for advanced flows:
   - Native CSS: Medium/Low
   - Motion Library: High
5. Long-term maintenance for simple states:
   - Native CSS: High
   - Motion Library: Medium

## Unclear / Needs Follow-up

1. Carbon AI Chat rounded-corner scalability pattern was referenced in
   discussion and should be validated directly in that repo before using as
   formal proof.
2. If we decide to formalize Motion adapter APIs, we need a governance decision:
   package location, ownership, and versioning policy.
3. Cross-framework conformance test shape is still to be defined (snapshot-only
   vs behavioral + visual + perf thresholds).

## Summary

1. Both approaches are feasible.
2. Native CSS is the right baseline for Carbon.
3. Motion Library is the better tool for advanced choreography.
4. The best Carbon implementation is hybrid: baseline native + optional Motion.
5. The new Accordion research stories provide a realistic implementation sample
   that can be expanded into production patterns.

## References

1. Carbon motion overview:
   <https://carbondesignsystem.com/elements/motion/overview/>
2. IBM Design Language animation overview:
   <https://www.ibm.com/design/language/animation/overview>
3. Motion React transitions: <https://motion.dev/docs/react-transitions>
4. Motion easing functions: <https://motion.dev/docs/easing-functions>
5. Motion npm package (license/install metadata):
   <https://www.npmjs.com/package/motion>
