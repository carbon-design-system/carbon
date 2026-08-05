# 7. Migrate components from carbon-for-ibm-products to Carbon core

Date: 2025-01-01 DRI: Carbon core team / dev leads Deciders: Carbon dev leads
(aligned 13 July 2026 for Storybook sub-decision)

## Status

Proposed

## Context

`carbon-for-ibm-products` (c4ip) is a separate monorepo that extends IBM's
Carbon Design System with React components, web components, Sass styles, and
patterns built specifically for IBM product teams. All components in that
repository are layered on top of foundational Carbon components. While this
separation was useful early in the design-system's life, it now creates friction
for teams maintaining and consuming both repositories simultaneously.

Several forces are converging as Carbon prepares for its next major version
(v12):

- **Duplicated infrastructure.** c4ip maintains its own CI pipelines, tooling,
  release workflows, and Storybook configuration — work that largely mirrors
  what already exists in the core monorepo. Maintaining two environments in
  parallel increases overhead without adding value.
- **Slower v12 adoption.** v12 code paths (motion, rounded corners, updated
  tokens) will be delivered inside this monorepo. Components living in a
  separate repo cannot easily consume in-flight monorepo changes, lengthening
  the feedback loop and delaying adoption.
- **Consumer package overhead.** Adopters currently need to install and manage
  two separate packages — `@carbon/react` and `@carbon/ibm-products` — to access
  the full component set. A single-package consumption model is simpler and more
  ergonomic.
- **Visibility between squads.** When work is split across two repos, PRs and
  issues from different teams cannot easily reference each other. Co-locating
  development brings cross-team visibility and reduces coordination costs.

A component audit was performed across the entire c4ip surface to classify each
component according to its production adoption, future potential, and
architectural compatibility with core Carbon. Three broad outcomes were
identified: migrate to core, leave in c4ip with minimal maintenance, or move to
Carbon Labs.

## Decision

### Chosen: Option 2 — Selective component migration

After evaluating two alternatives (see
[Options Considered](#options-considered)), we will selectively migrate
high-value components into the Carbon core monorepo. The
`carbon-for-ibm-products` repository and package will remain in place, but the
source of truth for migrated components will become this monorepo. After the v12
transition, `carbon-for-ibm-products` will enter a minimal maintenance and
support mode with no new feature development.

### Why Option 1 was rejected

Moving the entire package as-is gives adopters zero short-term migration cost,
but it does not eliminate the dual-package install burden, does not promote
components to first-class Carbon API status, and imports c4ip's infrastructure
wholesale without aligning it to Carbon conventions. It defers the hard problem
rather than solving it.

### Why Option 2 was chosen

The audit-gated approach concentrates effort on components with proven adoption
or clear strategic value, limits package-size growth to components that earn
their place, and preserves the option to not migrate low-value components at
all. The one-time import-path cost for adopters is manageable with codemods.

### What moves and where

The component audit classified every c4ip component into one of four outcomes.

#### Migrating to Carbon core

These components have sufficient adoption, standalone utility, or architectural
fit to justify first-class status in `@carbon/react` and
`@carbon/web-components`. They are exported as part of the public API from v12
onwards.

| #   | Component           | c4ip export name(s)                                     | Notes                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| --- | ------------------- | ------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Add and select      | `MultiAddSelect`, `SingleAddSelect` → composable system | The monolithic `MultiAddSelect`/`SingleAddSelect` prebuilt pattern is deprecated. Replaced by a composable component system: smaller, focused presentation components are composed together rather than driven by a single opinionated component. Includes `AddSelectData`, a framework-agnostic utility class that manages hierarchical selection data and state separately from the UI, enabling efficient data operations while keeping components presentation-only |
| 2   | Big number          | `BigNumber`                                             | Lightweight component with good potential but low current adoption. Entering core as a preview candidate. Labs remains the fallback if adoption does not grow post-v12                                                                                                                                                                                                                                                                                                  |
| 3   | Coachmark           | `Coachmark`                                             | Old monolithic version deprecated; new composable version already delivered in c4ip as a preview. Moving to core as **stable** — no further composability work required                                                                                                                                                                                                                                                                                                 |
| 4   | Composable card     | `Card`                                                  | Replaces the expressive/productive card split, which will be deprecated and left in c4ip. Unlike other migrating components, this will be visible in the Carbon core Storybook and exported from `@carbon/react` **before v12** as a preview component                                                                                                                                                                                                                  |
| 5   | Condition builder   | `ConditionBuilder`                                      | Currently a preview candidate in c4ip with ~5 product adoptions and strong expressed potential. Accessibility and composability reviews must be completed before moving to core. Moves to core as **preview**. No web components equivalent exists yet — WC port is a follow-up                                                                                                                                                                                         |
| 6   | Full-page error     | `FullPageError`                                         | Looks more like a pattern but has high adoption and is composable. Migrating to core as **stable**                                                                                                                                                                                                                                                                                                                                                                      |
| 7   | Guide banner        | `GuideBanner`                                           | ~6–7 product adoptions                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| 8   | Inline edit         | `EditInPlace`                                           | moves to core as stable                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| 9   | Interstitial screen | `InterstitialScreen`                                    | Already re-implemented as a stable composable component in c4ip. Migrating to core as **stable**                                                                                                                                                                                                                                                                                                                                                                        |
| 10  | Notifications panel | `NotificationsPanel`                                    | Moves to core as a **preview candidate**. Post-v12, a composable redesign will be developed and delivered as preview → stable                                                                                                                                                                                                                                                                                                                                           |
| 11  | Options tile        | `OptionsTile`                                           | Good adoption. Migrating to core as **stable**                                                                                                                                                                                                                                                                                                                                                                                                                          |
| 12  | Page header         | `PageHeader`                                            | Old `PageHeader` deprecated; new composable version already delivered in c4ip as a preview. Migrating to core as **stable**                                                                                                                                                                                                                                                                                                                                             |
| 13  | Scroll gradient     | `ScrollGradient`                                        |                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| 14  | Side panel          | `SidePanel`                                             | Stable in c4ip but identified for composability improvements. Moves to core as a **preview candidate**; composable redesign will follow alongside new design exploration                                                                                                                                                                                                                                                                                                |
| 15  | Tag overflow        | `TagOverflow`                                           | Functions as a utility rather than a standalone component. Originally intended to replace `TagSet` with greater flexibility (supporting avatars, icons, and other non-tag content). Similar functionality can now be achieved with overflow utilities, but those require more boilerplate — which is why migrating `TagOverflow` is still under consideration                                                                                                           |
| 16  | Tearsheet           | `Tearsheet`                                             | Old monolithic `Tearsheet` deprecated; new composable version already delivered in c4ip as a preview. Migrating to core as **stable**                                                                                                                                                                                                                                                                                                                                   |
| 17  | Truncated text      | `TruncatedText`                                         | Lightweight utility used internally across multiple components (`Tearsheet`, `PageHeader`, etc.). Exporting it lets adopters handle overflowing text with the same behaviour as the built-in usages                                                                                                                                                                                                                                                                     |
| 18  | User avatar         | `UserAvatar`                                            | Migrating to core as **stable**                                                                                                                                                                                                                                                                                                                                                                                                                                         |

#### Moving to Carbon Labs

Carbon Labs is community-maintained. These components have low adoption or are
being reconsidered as patterns rather than importable components, but retain
enough value that they should remain available to teams who want to use and
contribute to them.

| #   | Component         | c4ip export name(s) | Notes                                                                           |
| --- | ----------------- | ------------------- | ------------------------------------------------------------------------------- |
| 1   | Cascade           | `Cascade`           | Shifting to a pattern; held in case it is useful for v12 motion work            |
| 2   | Checklist         | `Checklist`         | Low adoption; useful for onboarding and time-to-value flows                     |
| 3   | Inline tip        | `InlineTip`         | No production adoption. Moving to Labs so the community can use and maintain it |
| 4   | Nonlinear reading | `NonLinearReading`  | 0–1 product adoptions                                                           |
| 5   | Truncated list    | `TruncatedList`     |                                                                                 |

#### Deprecating in carbon-for-ibm-products

These components will be deprecated in `carbon-for-ibm-products` and will not
migrate to Carbon core. Each has a stated reason: zero or near-zero adoption,
replacement by a newly delivered component, or suitability as a documented
pattern rather than an exported component.

| #   | Component        | c4ip export name(s) | Reason for deprecation                                                                                                                                                                                                                                                                                                                                   |
| --- | ---------------- | ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | About modal      | `AboutModal`        | At its core a simple modal with structured content. Suitable to be treated as a reusable pattern rather than an exported component. Deprecated and shared as an example pattern                                                                                                                                                                          |
| 2   | Action bar       | `ActionBar`         | No adoption; used only internally by the old `PageHeader`. With the new composable `PageHeader` migrating to core, this internal dependency is no longer needed                                                                                                                                                                                          |
| 3   | Action set       | `ActionSet`         | `ButtonSet` covers the use case. No need to migrate a separate component                                                                                                                                                                                                                                                                                 |
| 4   | Decorator        | `Decorator`         | No adoption                                                                                                                                                                                                                                                                                                                                              |
| 5   | Expressive card  | `ExpressiveCard`    | Replaced by the new composable `Card` component migrating to core                                                                                                                                                                                                                                                                                        |
| 6   | Get started card | `GetStartedCard`    | Can be delivered as a pattern built on top of the new composable `Card` component                                                                                                                                                                                                                                                                        |
| 7   | Productive card  | `ProductiveCard`    | Replaced by the new composable `Card` component migrating to core                                                                                                                                                                                                                                                                                        |
| 8   | Search bar       | `SearchBar`         | No adoption                                                                                                                                                                                                                                                                                                                                              |
| 9   | Tag set          | `TagSet`            | `TagSet` has solid adoption and has been treated as stable. `TagOverflow` was originally intended to replace it with greater flexibility (avatars, icons, non-tag content). That flexibility can be recreated with overflow utilities, though at the cost of more boilerplate. Decision: deprecate `TagSet` in favour of `TagOverflow` migrating to core |
| 10  | Toolbar          | `Toolbar`           | No adoption                                                                                                                                                                                                                                                                                                                                              |

#### Patterns and examples

These are usage patterns and example flows built on top of Carbon and c4ip
components. They are not exported as standalone components but will be
documented in the Carbon core Storybook under a `Patterns/` section. The
underlying composed components (e.g. `Tearsheet`, `SidePanel`) are what gets
migrated and exported; the patterns show adopters how to compose them.

| #   | Pattern                 | c4ip export name(s)                                                                            | Notes                                                                                                |
| --- | ----------------------- | ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| 1   | Add and select patterns | `AddSelect` (composable sub-components)                                                        | Pattern examples built on top of the new composable `AddSelect` component system                     |
| 2   | Coachmark patterns      | `CoachmarkFixed`, `CoachmarkOverlayElements`, `CoachmarkStacked`                               | Pattern variants built on top of the composable `Coachmark` component                                |
| 3   | Create flows            | `CreateFullPage`, `CreateModal`, `CreateSidePanel`, `CreateTearsheet`, `CreateTearsheetNarrow` | Full-page and modal creation patterns composed from `Tearsheet`, `SidePanel`, and related components |
| 4   | Delete and remove       | `RemoveModal`                                                                                  | Pattern for destructive confirmation flows                                                           |
| 5   | Export                  | `ExportModal`                                                                                  | Pattern for export confirmation flows                                                                |
| 6   | Generate an API key     | `APIKeyModal`                                                                                  | Pattern for API key generation flows                                                                 |
| 7   | Import and upload       | `ImportModal`                                                                                  | Pattern for import and file upload flows                                                             |

### Storybook organisation

The question of how to house migrated components inside the Carbon core
Storybook is tracked in
[issue #22641](https://github.com/carbon-design-system/carbon/issues/22641). Two
options were evaluated and a decision was reached by dev leads on 13 July 2026.

#### carbon-for-ibm-products Storybook

The c4ip Storybook is **left as-is** throughout the migration period. Its
current structure — Components (Stable / Preview / Preview candidates),
Utilities, and Pattern examples — will not be disrupted while work is in
progress.

After v12 ships and the migration set is finalised, the c4ip Storybook will be
updated to carry an explicit status label on every component that was affected
by the migration:

- **Migrated to `@carbon/react`** — links adopters to the new location in the
  Carbon core Storybook and the corresponding import-path change.
- **Deprecated** — signals components that are not moving and have no planned
  replacement in either repo.
- **Moved to Carbon Labs** — points to the community-maintained Labs repo, where
  the component can continue to be used and contributed to independently.

Carbon Labs is community-maintained; the Carbon core team does not own or gate
releases there. The labels in c4ip Storybook serve as a permanent redirect
rather than a support commitment.

#### Carbon core Storybook structure for migrated components

**Option 1 — retain product-based grouping (rejected).** Keep a logical
separation in the sidebar that mirrors the current c4ip structure, giving
adopters a distinct section for "product components" even after they are
exported from `@carbon/react`.

**Option 2 — unified sidebar (selected).** Migrated components sit alongside
existing core components with no separate product-based grouping. This matches
the structure of the Carbon website and reduces the cognitive overhead of
maintaining two parallel navigation hierarchies inside a single Storybook.

The dev-leads discussion on 13 July 2026 aligned on Option 2. Concretely:

- Migrated components are placed in the standard `Components/` tree alongside
  existing core components, ordered alphabetically.
- A `Utilities/` section (already present in the monorepo Storybook) will house
  utility components such as `TruncatedText`, `ActionSet`, `ScrollGradient`, and
  any other components that are utility-oriented rather than
  UI-pattern-oriented.
- A `Patterns/` sub-section may be added to cover pattern examples previously
  carried in c4ip — these are usage demonstrations, not exported components, and
  follow the guidance in [ADR 0006](./0006-storybook-organization.md).
- For components where composability work is still pending at the time of
  migration (e.g. `SidePanel`), the component is moved as-is and any composable
  redesign is delivered separately under a feature flag. This avoids blocking
  the migration on exploratory API work.

Story titles follow the convention already established in ADR 0006:

```js
// Migrated component — React
export default {
  title: 'Components/SidePanel',
  component: SidePanel,
};

// Utility component — React
export default {
  title: 'Utilities/TruncatedText',
  component: TruncatedText,
};
```

### Versioning strategy

- **In v11:** Components may be migrated into the monorepo but will not be
  exported from the public package API. Exports will be commented out behind a
  TODO note.
- **In v12+:** Migrated components will be uncommented, officially exported, and
  fully supported as part of `@carbon/react` and `@carbon/web-components`.

### Technical migration approach

Assets (component source, tests, Storybook stories, and documentation) are moved
manually from c4ip into this monorepo. This is not a Git-history merge. CI
workflows from the c4ip repository are not carried over; components adopt the
existing monorepo CI infrastructure.

Each migrated component is integrated into the public APIs of `@carbon/react`
(React implementation) and `@carbon/web-components` (web components port). The
Carbon monorepo follows a **dual-flagship model**: both packages must maintain
visual and functional parity, though implementation details may differ.

#### Target package structure

Each migrated React component lives in two packages:

```
packages/react/src/components/<ComponentName>/
├── ComponentName.tsx          ← main component (TypeScript + forwardRef)
├── ComponentName.mdx          ← Storybook docs page
├── ComponentName.stories.js   ← Storybook stories
├── ComponentName-test.js      ← jest/RTL unit tests
├── index.ts                   ← re-exports component + types
├── constants.js               ← (optional) shared constants / enums
└── hooks/                     ← (optional) component-specific hooks

packages/styles/scss/components/<component-name>/
├── _index.scss                ← @forward + @use + emit mixin call
└── _<component-name>.scss     ← @mixin with BEM styles
```

Internal hooks shared across more than one component go in
`packages/react/src/internal/`.

Web components live in:

```
packages/web-components/src/components/<component-name>/
├── <component-name>.ts        ← LitElement class (@customElement decorator)
├── <component-name>.stories.ts
├── index.ts                   ← registers custom element
└── defs.ts                    ← enums / constants shared with stories
```

#### Key c4ip → Carbon code conversions

| ibm-products pattern                                   | Carbon core replacement                               |
| ------------------------------------------------------ | ----------------------------------------------------- |
| `pkg.prefix` / `settings.prefix`                       | `const prefix = usePrefix()`                          |
| `getDevtoolsProps(componentName)`                      | `data-component-name={componentName}` on root element |
| `import cx from '@carbon/ibm-products/…/classnames'`   | `import cx from 'classnames'`                         |
| `blockClass = \`${pkg.prefix}--component-name\``       | `const blockClass = \`${prefix}--component-name\``    |
| Cross-package `import { Button } from '@carbon/react'` | Relative imports: `import Button from '../Button'`    |
| `import { prepareProps } from '…/props-helper'`        | Inline the utility in the component file              |
| ibm-products `PropTypes` validation                    | TypeScript interface + runtime `warning()`            |
| `import { pkg } from '../../package-settings'`         | Remove entirely                                       |

## Options Considered

### Option 1: Move the package as-is to the core monorepo

Move the entire `@carbon/ibm-products` package into this monorepo without
altering the package name or its public API. The package would continue to be
published under its existing name and adopters would see no import-path changes.

- **Pros:** Zero migration cost for adopters short-term; all components land in
  one repo immediately.
- **Cons:** Does not eliminate the dual-package install burden; does not promote
  components to first-class status in `@carbon/react`; carries c4ip's full CI
  and infrastructure into the monorepo unchanged; package landscape remains
  fragmented for consumers.
- **Cost / effort:** Low upfront (copy-paste), high ongoing (two parallel
  infrastructure footprints indefinitely).
- **Risk:** High — the structural problems this ADR aims to solve persist.

**Status: Rejected.**

### Option 2: Selective component migration _(selected)_

Retain the `carbon-for-ibm-products` repository and package, but migrate
individual high-value components into the core monorepo over time through a
structured audit. Components not migrated are either deprecated, left in c4ip
with minimal maintenance, or moved to Carbon Labs. Adopters consuming migrated
components will have a one-time import-path change from `@carbon/ibm-products`
to `@carbon/react`.

- **Pros:** Components earn first-class API status; package landscape converges
  toward a single consumption point; effort is focused on high-value components
  only; v12 adoption is accelerated; CI/tooling overhead is reduced over time.
- **Cons:** One-time breaking import-path change for adopters of migrated
  components; parallel maintenance window during the v11–v12 transition;
  per-component porting effort (TypeScript conversion, Sass adaptation,
  web-components port).
- **Cost / effort:** Moderate per-component; bounded by the audit list.
- **Risk:** Medium — adopter disruption is mitigated by codemods; migration
  completeness risk is mitigated by the audit and tracking issue.

**Status: Selected.**

## Consequences

### Positive

- Adopters can consume all components from a single package (`@carbon/react` /
  `@carbon/web-components`) without installing a second dependency.
- Migrated components benefit immediately from v12 features (updated motion,
  rounded corners, new tokens) developed inside this monorepo.
- CI infrastructure, tooling, and Storybook configuration are shared, reducing
  the maintenance burden on the c4ip team.
- Cross-squad visibility improves: PRs and issues for all components exist in
  one place.
- The feedback loop for v12 changes is shortened — migrated components are in
  the same development environment as the features they depend on.

### Negative

- **Breaking change for adopters:** Import paths must change from
  `@carbon/ibm-products` to `@carbon/react`. A migration guide and codemods will
  be provided to ease this transition.
- **Package size increase:** `@carbon/react` and `@carbon/styles` will grow as
  components are added. Tree-shaking reduces the runtime impact for consumers
  who import selectively, but the full package download size will increase.
- **Migration effort:** Porting each component requires manual code changes
  (removing c4ip-specific utilities, converting to TypeScript, adapting Sass,
  writing web-components ports). The audit-based approach focuses this effort on
  high-value components only.
- **Parallel maintenance window:** During the v11–v12 transition, both the c4ip
  repo and this monorepo will need attention. Clear communication to adopters
  about the timeline is required.

## Implementation Plan

The migration work is tracked in
[issue #22572](https://github.com/carbon-design-system/carbon/issues/22572).

High-level sequence:

1. Bootstrap the first components in this fork (`ActionSet`, `SidePanel`,
   `TruncatedText` are already in progress).
2. Per-component migration follows a consistent checklist: React component +
   types → Sass styles → internal hooks → Storybook → tests → exports →
   web-components port.
3. Exports remain commented out in v11; uncommented and published in v12.
4. After v12 ships, the `carbon-for-ibm-products` repository enters minimal
   maintenance and support mode. No new features or components will be developed
   there.
5. Clear deprecation notices and a codemods-based migration guide will be
   published for adopters.

Each component is delivered as one PR per component (React implementation) with
a follow-up PR for the web-components port where needed. Dependency order is
respected: lower-level components (e.g. `ActionSet`) are merged before
dependents (e.g. `SidePanel`).

## Reversibility

This is a **one-way door** for migrated components. Once a component is exported
from `@carbon/react` as part of the v12 public API, removing it would be a
breaking change for consumers. The decision on _which_ components to migrate
(the audit list) is a two-way door — components can be added to or removed from
the migration set until they are publicly exported. The deprecation of c4ip is
also reversible up to the point where the minimal maintenance announcement is
made publicly.

## Open Questions / Dissent

- `TagOverflow` inclusion decision required before v12 exports are uncommented.
  Whether `TagOverflow` migrates to core or is superseded by existing overflow
  utilities is still unresolved (see audit table row 16). _Owner needed.
  Unresolved at time of writing._

- **⚠️ Composable-readiness two-track migration.** Composability work across
  c4ip has been a multi-release effort. The outcome is two distinct tracks at
  migration time:
  - **Already composable (migrate as stable):** `InterstitialScreen`,
    `Coachmark`, `Tearsheet`, `PageHeader`, `Card`, `AddSelect` — all have been
    re-implemented as composable systems and are ready for stable export from
    v12.
  - \*\*Not yet composable (migrate as `preview__candidate` ) Post-v12,
    composable redesigns will be developed and delivered as `preview`, promoted
    to `stable`, and at that point the original migrated `preview__candidate`
    will be deprecated.
  - An audit tracking which components fall into which track exists in
    [carbon#22881](https://github.com/carbon-design-system/carbon/issues/22881).
    _Review the audit before finalising the v12 export list._

> Silence in this section is not consent. Reviewers are encouraged to add
> dissenting views or unresolved concerns before this ADR is accepted.

## Risks and Mitigations

| Risk                                                   | Mitigation                                                                                                                                             |
| ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Adopter confusion during the v11–v12 transition window | Publish a clear migration guide with automated codemods; maintain deprecation warnings in c4ip for migrated components pointing to the new import path |

|  
| Audit list becomes stale as c4ip receives new components | Maintain the audit
as a living document; re-evaluate new c4ip components against migration criteria
before each release cycle | | Circular imports when migrated components
reference `@carbon/react` | All cross-component imports inside the monorepo must
use relative paths rather than the package name; enforced through lint and code
review | | Package size regression for existing `@carbon/react` adopters |
Monitor bundle-size CI checks; ensure components are tree-shakeable and not
included in the default build unless imported |

## References

- Implementation tracking issue (epic):
  [carbon#22572](https://github.com/carbon-design-system/carbon/issues/22572)
- ADR tracking issue:
  [carbon#22866](https://github.com/carbon-design-system/carbon/issues/22866)
- Storybook organisation for migrated components:
  [carbon#22641](https://github.com/carbon-design-system/carbon/issues/22641)
- Migration guide (this fork):
  [`ibm-products-carbon-migration-guide.html`](../../ibm-products-carbon-migration-guide.html)
- Dual-flagship model: [`AGENTS.md`](../../AGENTS.md)
- Developer handbook: [`docs/developer-handbook.md`](../developer-handbook.md)
- Storybook organisation standards: [ADR 0006](./0006-storybook-organization.md)
- Carbon for IBM Products repository:
  https://github.com/carbon-design-system/ibm-products
- Carbon Labs repository: https://github.com/carbon-design-system/carbon-labs
