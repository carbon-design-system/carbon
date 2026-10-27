# 18. Supported Angular major versions for `@carbon/angular`

## Status

Proposed

**Proposed: a peer floor of Angular 20.** Do not mark the ADR accepted until the
remaining open questions below have been answered.

**Peer range updated 2026-10-27:** `package.json` peers are now `>=20`.
`README.md` table updated. The build and test stack (`devDependencies`, CI
matrix) still runs on Angular 19 and must move to Angular 20 in a follow-up pull
request. Until then the published output is compiled with Angular 19, which is
not the oldest supported major. See Consequences for the full list of changes.

- DRI: Angular package maintainer
- Input needed from: Angular experts on the Carbon team and in IBM product
  teams, and the Carbon telemetry owners

## Context

`@carbon/angular` currently declares these peer dependencies in
[`packages/angular/package.json`](../../packages/angular/package.json):

```json
"@angular/common": ">=17",
"@angular/core": ">=17",
"@angular/forms": ">=17"
```

The `>=17` range was chosen early, and no one has validated it. What the repo
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

Weekly telemetry on `@angular/core` major versions among
`carbon-components-angular` repositories (unique repositories, July to early
October 2026) shows that nearly all consumers are on recent releases. Roughly
80% are on Angular 20, roughly 15% on 21, and roughly 1% on 22. About 2% are on
19, and under 1% are on 18 or earlier. Earlier figures are not comparable.
Before tracking was repaired in spring 2026 the data was dominated by Angular 18
and 19, and the shift to 20 happens across the gap in tracking, so it is not
evidence of how fast consumers migrate. This answers the distribution part of
open question 2. It does not answer how quickly consumers adopt new majors, or
whether any large consumers are pinned to an older one.

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
2. **What are Carbon's consumers running?** _Distribution answered above._ Still
   open:
   - Are there large consumers pinned to Angular 19 or earlier who would be
     blocked? (Roughly 2% of repositories are on 19 or earlier.)
   - How quickly do consumers move to new Angular majors? The current data
     crosses the spring 2026 tracking gap, so it cannot answer this.
3. **What do the Angular experts recommend?** Ask for their view on:
   - Whether a floor of 20, built with Angular 20, is sound, and whether to
     support N and N-1, every major still in LTS, or a fixed floor
   - Whether the peer range should be open-ended (`>=20`) or limited to the
     majors that CI runs against
   - Whether to adopt signal inputs and outputs (`input()`, `output()`,
     `model()`) and zoneless change detection now that they are available
   - What comparable libraries (Angular Material, PrimeNG, others) do about
     their support window
4. **What can we afford to test?** The decision assumes CI runs against Angular
   20 and the latest major. A maintainer needs to confirm that two versions of
   build, jest and Playwright is affordable.

## Options

| Option                     | Peer range                    | Effect                                                                                                                                              |
| -------------------------- | ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| A. Keep a wide floor       | `>=17` (or lower)             | Largest reach. Requires building with the lowest supported Angular, a CI matrix, `standalone: true`, and no signal-based APIs newer than the floor. |
| B. Floor at current tested | `>=19`                        | Matches what is built and tested today. Drops `standalone: true`. Allows signal inputs (`input()` etc.). Excludes under 1% of consumers.            |
| C. Track Angular's support | The versions Angular supports | Floor moves forward as Angular retires versions, which may need a semver-major or a documented exception. At GA this is 21, excluding about 80%.    |
| D. Floor at latest only    | `^<latest>`                   | Cheapest to maintain. Likely too restrictive for IBM product teams migrating from `carbon-components-angular`.                                      |
| E. Floor at 20             | `>=20`                        | Covers roughly 98% of consumers. Drops `standalone: true`. Allows signal inputs. Builds with Angular 20, which is already the dominant major.       |

This table is a starting point. Percentages are from the telemetry above.

## Decision

**Proposed: option E, a peer floor of Angular 20** (`>=20` for
`@angular/common`, `@angular/core` and `@angular/forms`).

- It covers roughly 98% of `carbon-components-angular` repositories, so almost
  no migrating team is blocked. Angular 20 is also where about 80% of them are
  today, which matters because consumer teams move slowly.
- It does not match Angular's own support window. At GA only Angular 21 and 22
  are supported, and Angular 20 will already be out of LTS. Following Angular's
  window (option C) would exclude most of the people this package is meant to
  help, so the floor is chosen from consumer usage instead.
- Compared with option B (`>=19`), it costs about 1–2% more of consumers and
  gives a better build baseline: Angular 19 is already unsupported, and the
  library's partial-compilation output is linked by the consumer's compiler, so
  building with the oldest supported major (20) is the safer choice.

The floor should be revisited when Angular 23 is released, and whenever
telemetry shows the share of consumers on 20 falling to a level where raising
the floor would block few teams.

Still to confirm before accepting: whether any large consumers are pinned below
20, and the view of the Angular experts (open question 3).

## Consequences

- `peerDependencies` for `@angular/common`, `@angular/core` and `@angular/forms`
  in [`packages/angular/package.json`](../../packages/angular/package.json) move
  from `>=17` to `>=20`.
- The build and test stack (`@angular/*`, `ng-packagr`,
  `@angular-devkit/build-angular`, `jest-preset-angular`, Storybook) moves from
  `^19.0.0` to `^20.0.0`, so the published output is compiled by the oldest
  supported major.
- `standalone: true` can be dropped from components, because it is the decorator
  default from Angular 19 (see
  [ADR 0012](0012-angular-standalone-components-no-ngmodule-barrels.md)).
- Signal-based `input()`, `output()` and `model()` become available to the
  library.
- Consumers on Angular 19 and earlier, roughly 2% of the repositories measured,
  cannot adopt `@carbon/angular` until they upgrade.
- CI runs against Angular 20 and the latest major, which keeps the matrix at two
  versions.
- Consumers should be told plainly that Angular 20 will be out of Angular's own
  support by GA, and that upgrading Angular is on them.

Accepting this decision also needs these updates:

- The version table in
  [`packages/angular/README.md`](../../packages/angular/README.md) and the
  peer-dependency lines in
  [`packages/angular/docs/milestones.md`](../../packages/angular/docs/milestones.md)
  and [`packages/angular/docs/plan.md`](../../packages/angular/docs/plan.md)
- Removing `standalone: true` from the component template under
  `packages/angular/tasks/scaffold-component/templates/`, and from the README
  and Storybook welcome samples (see
  [ADR 0012](0012-angular-standalone-components-no-ngmodule-barrels.md))
- The CI jobs `angular-test` and `angular-e2e` in `.github/workflows/ci.yml`,
  which need to run against Angular 20 and the latest major
- `docs/migration/v12.md`, if the supported range is consumer-visible migration
  information
