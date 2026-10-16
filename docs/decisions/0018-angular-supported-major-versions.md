# 18. Supported Angular major versions for `@carbon/angular`

## Status

Proposed

**Decision needed.** Do not mark this accepted until the open questions below
have been answered. Until then, `@carbon/angular` keeps its current
(unvalidated) peer range of `>=17`.

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
then repaired. This data is at package level. It does not show Angular major
versions, which open question 2 still needs.

The same telemetry shows very little server-side rendering among these
consumers. Well under 1% of `carbon-components-angular` repositories also use
`@angular/ssr`, and only one of those identifies as a Software product. This
reflects existing CCA consumers, who have no SSR story today, so it does not
measure demand from new `@carbon/angular` adopters. It does support treating SSR
and hydration as out of scope for the initial release.

## Open questions

These need answers from outside this repo before a decision.

1. **What does Angular itself support?** Check the current
   [Angular release and support policy](https://angular.dev/reference/releases).
   Which majors are in active support or LTS today, and which will drop out
   during the lifetime of `@carbon/angular` v1? Consider whether we should
   support only versions Angular itself supports.
2. **What are Carbon's consumers running?** Review telemetry for the Angular
   major versions used by consumers of `carbon-components-angular` (and, where
   available, IBM product teams that will migrate). Record the distribution in
   this ADR, with the date and source of the data. Specific things to find out:
   - What share of usage is on each of 16, 17, 18, 19 and later?
   - How quickly do consumers move to new Angular majors?
   - Are there large consumers pinned to an older major who would be blocked?
3. **What do the Angular experts recommend?** Ask for their view on:
   - Whether to support N and N-1, every major still in LTS, or a fixed floor
   - Whether a library built on Angular 19 can safely declare a lower peer
     floor, or whether we must build with the lowest supported compiler
   - Whether to use signal inputs and outputs, and what that does to the floor
   - What comparable libraries (Angular Material, PrimeNG, others) do about
     their support window
4. **What can we afford to test?** Supporting more than one major means a CI
   matrix (build, jest and Playwright against each). Decide how many majors we
   will run.

## Options

| Option                     | Peer range                    | Effect                                                                                                                                              |
| -------------------------- | ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| A. Keep a wide floor       | `>=17` (or lower)             | Largest reach. Requires building with the lowest supported Angular, a CI matrix, `standalone: true`, and no signal-based APIs newer than the floor. |
| B. Floor at current tested | `>=19`                        | Matches what is built and tested today. Drops `standalone: true`. Allows signal inputs (`input()` etc.). Excludes consumers still on 17 and 18.     |
| C. Track Angular's support | The versions Angular supports | Floor moves forward as Angular retires versions, which may need a semver-major or a documented exception. Smallest long-term burden.                |
| D. Floor at latest only    | `^<latest>`                   | Cheapest to maintain. Likely too restrictive for IBM product teams migrating from `carbon-components-angular`.                                      |

This table is a starting point, not a recommendation. The recommendation should
follow from the answers to the open questions.

## Decision

**To be decided.** Record the chosen option here, along with the telemetry
figures and expert input that supported it.

## Consequences

To be completed once a decision is made. At a minimum the decision will need to
update:

- `peerDependencies` for `@angular/common`, `@angular/core` and `@angular/forms`
  in [`packages/angular/package.json`](../../packages/angular/package.json)
- The version table in
  [`packages/angular/README.md`](../../packages/angular/README.md) and the
  peer-dependency lines in
  [`packages/angular/docs/milestones.md`](../../packages/angular/docs/milestones.md)
  and [`packages/angular/docs/plan.md`](../../packages/angular/docs/plan.md)
- Whether components keep `standalone: true`, in the component template under
  `packages/angular/tasks/scaffold-component/templates/`, and in the README and
  Storybook welcome samples (see
  [ADR 0012](0012-angular-standalone-components-no-ngmodule-barrels.md))
- The CI jobs `angular-test` and `angular-e2e` in `.github/workflows/ci.yml`, if
  a version matrix is needed
- `docs/migration/v12.md`, if the supported range is consumer-visible migration
  information
