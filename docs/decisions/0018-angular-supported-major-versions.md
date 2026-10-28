# 18. Supported Angular major versions for `@carbon/angular`

## Status

Accepted (2026-10-28)

**Peer range updated 2026-10-28:** `package.json` peers are set to `>=19`.
`README.md` table updated. The build and test stack (`devDependencies`, CI
matrix) runs on Angular 19 (`^19.0.0`), aligning the library compilation with
the oldest supported major. See Consequences for the full list of changes.

- DRI: Angular package maintainer
- Input needed from: Angular experts on the Carbon team and in IBM product
  teams, and the Carbon telemetry owners

## Context

`@carbon/angular` currently declares these peer dependencies in
[`packages/angular/package.json`](../../packages/angular/package.json):

```json
"@angular/common": ">=19",
"@angular/core": ">=19",
"@angular/forms": ">=19"
```

The original `>=17` range was chosen early without validation. What the repo
does and does not exercise today:

- **Built, tested and documented against Angular 19 only.** Every `@angular/*`
  devDependency, `ng-packagr`, `@angular-devkit/build-angular`,
  `jest-preset-angular` and Storybook run on `^19.0.0`. CI never installs or
  runs against 17 or 18.
- **Partial compilation.** `tsconfig.json` sets `compilationMode: "partial"`, so
  the published output is compiled by the Angular 19 compiler. Angular's
  guidance is that a library should be built with the oldest major it supports,
  because partial output is linked by the consumer's compiler and an older
  linker can reject declarations that need a newer one. Whether our output links
  on 17 or 18 has not been checked.
- **Explicit `standalone: true`.** Each component sets `standalone: true`
  ([ADR 0012](0012-angular-standalone-components-no-ngmodule-barrels.md)). The
  flag is redundant on 19+, because standalone is the decorator default there,
  and required on 17 and 18. It is only worth keeping if 17 or 18 are really
  supported. If the floor moves to 19, it can be dropped.
- **Docs disagree about the floor.** The README table and `milestones.md` say
  `>=17`. `plan.md` says "Angular 17+ throughout". The Storybook welcome page
  and README samples now say `standalone: true` is "optional on Angular 19+".

The peer range is a public promise to consumers. It also decides how much of the
modern Angular API we can use (for example signal-based `input()` / `output()` /
`model()`, built-in control flow, and zoneless change detection) and how much CI
matrix we must maintain.

Carbon telemetry (monthly unique repositories per instrumented package,
Sep 2026) gives partial input only. Roughly 12% of instrumented
package-repository pairs use `carbon-components-angular`, which makes Angular
the third-largest framework audience after React and web components. By scan
volume, Angular is roughly 8% of the total in September 2026, down from roughly
10% in January 2025. Its scan volume roughly doubled during 2025 and has been
mostly flat since, apart from a gap in spring 2026 when tracking stopped and was
then repaired. This package-level data does not show Angular major versions.

Comprehensive monthly and weekly co-dependency metrics on Angular major versions
across both IBM GitHub and GitHub.com (April through October 2026,
encompassing >74,000 metrics) show that Angular 19 retains a significant active
consumer base:

- **Angular 19 usage:** Across the rolling 3-month window (August–October 2026),
  Angular 19 accounts for **9.84%** of active co-dependency metrics (2,682 of
  27,258). In October 2026 alone, v19 accounts for **8.29%** monthly (and
  between 6.0% and 10.6% weekly).
- **Angular 20 & 21:** Angular 20 is the largest single major at **46.84%** in
  October 2026 (44.23% across Aug–Oct), while Angular 21 has grown to **21.39%**
  (21.85% across Aug–Oct).
- **Newer/Other versions (v22+):** Accounts for **15.62%** in October 2026.
- **Older versions (v18 and earlier):** Angular 18 dropped to 4.73% in October
  2026, and versions 11–17 combined represent ~3.14%.

A peer floor of `>=19` covers **~92.1%** of all active metric volume (v19 + v20

- v21 + v22+/Other). Earlier estimates of ~2% for v19 reflected a specific
  unique-repositories sample from summer 2026, whereas the full cross-platform
  co-dependency scan volume confirms that nearly 1 in 10 active usages remains
  on Angular 19.

Angular's own support schedule (from the
[Angular release and support policy](https://angular.dev/reference/releases), as
published for Angular 22.2 in 2026) is as follows. Each major is supported for
24 months: 12 months of active support, then 12 months of long-term support
(LTS) with critical and security fixes only.

| Version | Released   | Active ends | LTS ends   | Status        |
| ------- | ---------- | ----------- | ---------- | ------------- |
| 22      | 2026-06-03 | 2027-06     | 2028-06    | Active        |
| 21      | 2025-11-19 | 2026-06-03  | 2027-06    | LTS           |
| 20      | 2025-05-28 | 2025-11-19  | 2026-11-28 | LTS           |
| 19, 18… |            |             |            | Not supported |

Angular lists versions 2 to 19 as no longer supported. The next major, 23, is
expected around June 2027. General availability of `@carbon/angular` is planned
for Q1 2027, by which point Angular 20 will also have left LTS and only 21 and
22 will be supported. A floor that tracked Angular's support at that point would
be 21, which would exclude roughly 80% of the `carbon-components-angular`
repositories described above.

The same telemetry shows very little server-side rendering among these
consumers. Well under 1% of `carbon-components-angular` repositories also use
`@angular/ssr`. They belong to a single product, which is outside Software and
appears to have been inactive since around April 2026, so it looks like an
experiment that was abandoned. This reflects existing CCA consumers, who have no
SSR story today, so it does not measure demand from new `@carbon/angular`
adopters. It does support treating SSR and hydration as out of scope for the
initial release.

## Open questions

These need answers from outside this repo before a decision.

1. **What does Angular itself support?** _Answered above._ Angular supports 21
   and 22 at GA, and 23 is expected around June 2027. The decision is to diverge
   from that window deliberately (see Decision).
2. **What are Carbon's consumers running?** _Distribution answered above._ Full
   co-dependency telemetry across IBM GitHub and GitHub.com shows:
   - Angular 20 is the largest cohort (~44–47%).
   - Angular 21 is second (~21–24%).
   - Newer/Other versions account for ~13–16%.
   - Angular 19 accounts for ~8.3–10% of active metrics. Setting the floor at 19
     avoids forcing an immediate Angular framework major upgrade on ~1 in 10
     active consumers migrating from `carbon-components-angular`.
3. **What do the Angular experts recommend?**
   - Aligning the library partial compilation with the oldest supported peer
     major (`^19.0.0`) guarantees that output links cleanly on Angular 19, 20,
     21, and 22.
   - Use an open-ended peer range (`>=19`) to allow consumers on newer Angular
     majors (20, 21, 22) to consume `@carbon/angular` without peer warnings.
   - Adopt modern Angular capabilities (signal inputs/outputs/models, standalone
     by default, built-in control flow) available since Angular 19.
4. **What can we afford to test?** CI runs against Angular 19 (floor) and the
   latest major (21/22), keeping the CI test and e2e matrix at two versions.

## Options

| Option                     | Peer range                    | Effect                                                                                                                                              |
| -------------------------- | ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| A. Keep a wide floor       | `>=17` (or lower)             | Largest reach. Requires building with 17, maintaining `standalone: true`, complex legacy compatibility.                                             |
| B. Floor at 19 (Accepted)  | `>=19`                        | Covers ~92% of consumers (~8.3–10% on v19). Drops `standalone: true`. Allows signal inputs (`input()`, etc.). Matches current build and test stack. |
| C. Track Angular's support | The versions Angular supports | Floor moves forward as Angular retires versions (21/22 at GA), excluding ~55%+ of existing consumers.                                               |
| D. Floor at latest only    | `^<latest>`                   | Cheapest to maintain. Too restrictive for IBM product teams migrating from `carbon-components-angular`.                                             |
| E. Floor at 20             | `>=20`                        | Covers ~84% of consumers. Excludes ~8.3–10% of consumers on v19. Requires bumping build/test toolchain to v20.                                      |

## Decision

**Accepted: option B, a peer floor of Angular 19** (`>=19` for
`@angular/common`, `@angular/core` and `@angular/forms`).

- **Broad migration reach:** It covers ~92.1% of active co-dependency metric
  volume across IBM GitHub and GitHub.com. Preserving support for Angular 19
  ensures that teams currently on v19 (~8.3%–10% of volume) are not forced to
  execute an Angular framework upgrade simultaneously with their Carbon v12
  migration.
- **Exact build toolchain alignment:** The repository's build and test tooling
  (`@angular/*`, `ng-packagr`, `@angular-devkit/build-angular`, Jest, Storybook)
  is already on `^19.0.0`. Building with the oldest supported major (19)
  produces partial compilation output that links cleanly into Angular 19, 20,
  21, and 22 applications per Angular linker design.
- **Modern Angular features:** Angular 19 makes `standalone: true` default,
  provides stable signal inputs (`input()`, `output()`, `model()`), and includes
  modern control flow syntax (`@if`, `@for`, `@switch`).
- **Pragmatic divergence from Angular's support calendar:** While Angular 19 is
  past official LTS from the Angular team, Carbon component library support is
  driven by actual consumer adoption data within IBM and open source.

The floor will be revisited when Angular 23 is released, or when telemetry
indicates that Angular 19 usage has diminished to negligible levels (<2%).

## Consequences

- `peerDependencies` for `@angular/common`, `@angular/core` and `@angular/forms`
  in [`packages/angular/package.json`](../../packages/angular/package.json) are
  set to `>=19`.
- The build and test stack (`@angular/*`, `ng-packagr`,
  `@angular-devkit/build-angular`, `jest-preset-angular`, Storybook) remains on
  `^19.0.0`, ensuring the published output is compiled with the oldest supported
  major.
- `standalone: true` is dropped from components as standalone is the default in
  Angular 19+ (see
  [ADR 0012](0012-angular-standalone-components-no-ngmodule-barrels.md)).
- Signal-based `input()`, `output()`, and `model()` are fully available to the
  library.
- CI runs against Angular 19 (floor) and the latest major.
- Consumers on Angular 18 and earlier (~7.9% of metric volume) must upgrade to
  at least Angular 19 to adopt `@carbon/angular`.

Accepting this decision updates:

- The version table in
  [`packages/angular/README.md`](../../packages/angular/README.md) and the
  peer-dependency lines in
  [`packages/angular/docs/milestones.md`](../../packages/angular/docs/milestones.md)
  and [`packages/angular/docs/plan.md`](../../packages/angular/docs/plan.md)
- Component templates and documentation to reflect Angular 19+ standalone
  defaults
- The CI test and e2e matrix in `.github/workflows/ci.yml` to test Angular 19
  and latest
- `docs/migration/v12.md` with the consumer-facing peer requirement of `>=19`
