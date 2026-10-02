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

| Package                  | Version |
| ------------------------ | ------- |
| `@angular/core`          | `>=17`  |
| `@carbon/web-components` | `>=2`   |
| `@carbon/styles`         | `>=1`   |

## Usage

Import the module for the component you need:

```ts
// app.module.ts
import { CDSAngularButtonModule } from '@carbon/angular';

@NgModule({
  imports: [CDSAngularButtonModule],
})
export class AppModule {}
```

```html
<!-- app.component.html -->
<cds-button kind="primary" (click)="onClick()">Click me</cds-button>
```

Import Carbon global styles once in your app entry:

```scss
@use '@carbon/styles';
```

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
```

## License

Apache 2.0 — see [LICENSE](../../LICENSE).
