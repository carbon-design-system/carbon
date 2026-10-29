# `@carbon/angular`

Angular components for the Carbon Design System, built as thin wrappers around
[`@carbon/web-components`](../web-components/README.md).

## Status

**Pre-release.** This package is in active development targeting Carbon v12. The
API is unstable until `1.0.0-rc.0`.

## Installation

```bash
npm install @carbon/angular @carbon/styles
# or
yarn add @carbon/angular @carbon/styles
```

`@carbon/angular` bundles its own `cds-ng-*` prefixed copy of the web
components, so you do not install `@carbon/web-components` (ADR 0020).

Peer dependencies required in your project:

| Package           | Version          |
| ----------------- | ---------------- |
| `@angular/common` | `>=19`           |
| `@angular/core`   | `>=19`           |
| `@angular/forms`  | `>=19`           |
| `@carbon/styles`  | `^2.0.0-alpha.3` |

The components do not import `@carbon/styles`. You need it because they read
Carbon's `--cds-*` theme tokens from the page, and `@carbon/styles` is what
provides them. Without it the tokens are empty and the components render
unthemed.

> **Note:** the package is built and tested against Angular 19. See
> [ADR 0018](../../docs/decisions/0018-angular-supported-major-versions.md).

## Usage

Import the component directly into your standalone component or NgModule:

```ts
// my.component.ts
import { Component } from '@angular/core';
import { ButtonComponent } from '@carbon/angular/button';

@Component({
  selector: 'app-root',
  standalone: true, // optional on Angular 19+, where it is the default
  imports: [ButtonComponent],
  template: `<cds-ng-button kind="primary" (click)="onClick($event)"
    >Click me</cds-ng-button
  >`,
})
export class AppComponent {
  onClick(e: MouseEvent) {}
}
```

Import Carbon global styles once in your app entry:

```scss
@use '@carbon/styles';
```

## Planning & Architecture

- **[Architecture & Implementation Plan](docs/plan.md)** — Core design
  decisions, wrapper architecture, component tiers, CVA mapping, and test
  strategy.
- **[Porting web component tests](docs/porting-web-component-tests.md)** — How
  to reuse the `@carbon/web-components` tests to verify each wrapper. Required
  for every new component, alongside its stories.
- **[Status and open questions](docs/status-and-open-questions.md)** — The
  living record of what is built, what is open, and the suggested next steps.
  `plan.md` and `milestones.md` are partly out of date; this file is current.
- **[Implementation Milestones](docs/milestones.md)** — Original roadmap and PR
  breakdown. Partly out of date.

## Migrating from `carbon-components-angular`

See the **Migration** page in Storybook for the known breaking changes. A full
migration guide (`docs/guides/cca-to-angular.md`) and codemods are planned and
do not exist yet. See [`docs/migration-support.md`](docs/migration-support.md).

## Development

```bash
# Build the package (generate wrappers, build entries, ng-packagr)
yarn workspace @carbon/angular build

# Run unit tests (run jest from packages/angular)
yarn workspace @carbon/angular test

# Start Storybook
yarn workspace @carbon/angular storybook

# Regenerate the wrappers in .entries/ only
yarn workspace @carbon/angular generate:wrappers
```

Building requires `packages/web-components/es/` to exist. Run
`yarn workspace @carbon/web-components build` first if it doesn't.

### Adding a component

Wrappers are generated, not scaffolded. See the generator
[README](tasks/generate-wrappers/README.md) for how to add one, and
[`docs/porting-web-component-tests.md`](docs/porting-web-component-tests.md) for
the stories and parity spec each component needs.

## License

Apache 2.0 — see [LICENSE](../../LICENSE).
