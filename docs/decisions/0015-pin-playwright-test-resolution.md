# Use @playwright/test directly and pin via root resolutions

## Status

Accepted

## Context

Playwright ships two related packages:

- `@playwright/test` — the test runner, assertion library, and CLI (`playwright`
  binary). This is the package that must be unique on the module resolution
  path.
- `playwright` — a meta-package that re-exports `@playwright/test` and adds
  higher-level browser-automation helpers.

When a workspace package declares `"playwright"` as a devDependency, yarn may
resolve it to a newer version than the `@playwright/test` that other workspace
packages already depend on. Because `playwright` bundles or peer-requires its
own `@playwright/test`, two different versions of `@playwright/test` end up on
the resolution path simultaneously. Playwright detects this at startup and
hard-aborts with:

```
Error: Playwright Test did not expect test.describe() to be called here.
– You have two different versions of @playwright/test. This usually happens
  when one of the dependencies in your package.json depends on @playwright/test.
```

This was discovered when `packages/angular` was added with
`"playwright": "^1.45.0"`, which yarn resolved to `1.63.0`, while the rest of
the monorepo (`packages/web-components`, root) depended on
`"@playwright/test": "^1.36.2"` resolved to `1.46.1`. The `angular-e2e` CI job
failed immediately with the error above.

## Decision

1. **All workspace packages must declare `@playwright/test` as their
   devDependency**, never the `playwright` meta-package. The `@playwright/test`
   package ships the `playwright` CLI binary directly, so scripts such as
   `playwright test` and `playwright install` work without the meta-package.

2. **Pin `@playwright/test` to a single exact version in the root `resolutions`
   field of `package.json`.** This ensures `yarn dedupe` and transitive
   dependency additions can never silently introduce a second copy.

Before raising the pin, verify that all Playwright-dependent packages still pass
their e2e suites:

```
yarn workspace @carbon/web-components e2e
yarn workspace @carbon/angular e2e
```

## Consequences

- Every workspace package that needs Playwright uses the same version, and the
  `playwright` CLI binary resolves from that single installation.
- The `playwright` meta-package must not be added as a devDependency to any
  workspace package. Code review should catch additions of `"playwright"` (bare)
  in `package.json` files.
- Raising the Playwright version requires a single change: update the pin in
  root `resolutions` and the `devDependency` range in each consuming workspace
  package, then re-run `yarn install`.
