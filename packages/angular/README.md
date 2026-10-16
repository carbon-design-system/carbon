# `@carbon/angular`

Angular components for the Carbon Design System, built as thin wrappers around
[`@carbon/web-components`](../web-components/README.md).

## Status

**Pre-release.** This package is in active development targeting Carbon v12. The
API is unstable until `1.0.0-rc.0`.

## Installation

```bash
npm install @carbon/angular @carbon/web-components @carbon/styles
# or
yarn add @carbon/angular @carbon/web-components @carbon/styles
```

Peer dependencies required in your project:

| Package                  | Version  |
| ------------------------ | -------- |
| `@angular/core`          | `>=17`   |
| `@carbon/web-components` | `^3.0.0` |
| `@carbon/styles`         | `^2.0.0` |

> **Note:** the Angular peer range is changing to `>=20`. The package is only
> built and tested against Angular 19 today, and the `>=17` range has not been
> validated. See
> [ADR 0018](../../docs/decisions/0018-angular-supported-major-versions.md).

## Usage

Import the component directly into your standalone component or NgModule:

```ts
// my.component.ts
import { Component } from '@angular/core';
import { ButtonComponent } from '@carbon/angular';

@Component({
  selector: 'app-root',
  standalone: true, // optional on Angular 19+, where it is the default
  imports: [ButtonComponent],
  template: `<cds-button kind="primary" (buttonClick)="onClick($event)"
    >Click me</cds-button
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
- **[Implementation Milestones](docs/milestones.md)** — Step-by-step roadmap and
  PR breakdown across six milestones.

## Migrating from `carbon-components-angular`

See the [migration guide](../../docs/guides/cca-to-angular.md) _(added in
Milestone 5)_ for a full list of breaking changes and automated codemods.

## Development

```bash
# Build the package
yarn workspace @carbon/angular build

# Run unit tests
yarn workspace @carbon/angular test

# Start Storybook
yarn workspace @carbon/angular storybook

# Scaffold a new component
yarn workspace @carbon/angular scaffold:component <ComponentName>
```

### Scaffolding new components

To scaffold boilerplate for a new component:

```bash
yarn workspace @carbon/angular scaffold:component Modal
```

This generates the following structure under `src/components/Modal/`:

- `Modal.component.ts` — Standalone Angular component wrapper rendering the
  `cds-ng-modal` custom element
- `index.ts` — Component barrel export
- `__stories__/Modal.stories.ts` — Storybook story file
- `__tests__/Modal.spec.ts` — Layer 1 Jest unit test suite

## License

Apache 2.0 — see [LICENSE](../../LICENSE).
