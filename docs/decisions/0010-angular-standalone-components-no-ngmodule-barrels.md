# 10. Use Angular standalone components throughout; no NgModule barrel exports

Date: 2026-09

## Status

Accepted

## Context

Angular historically required components to be declared in an `NgModule` before
they could be used. The conventional library pattern was to export a
`ButtonModule`, `ModalModule`, etc. — one module per component or per feature
area — and have consumers import the modules they need into their own
`NgModule`.

`carbon-components-angular` follows this pattern: consumers write
`imports: [ButtonModule, ModalModule]` in their `NgModule` declaration.

Angular 14 introduced standalone components as an opt-in, and Angular 17 made
them the default. A standalone component declares its own dependencies and does
not belong to any `NgModule`. It can be imported directly, like a class,
wherever it is needed.

Two export strategies were considered for `@carbon/angular`:

1. **NgModule barrels** — export `CDSAngularButtonModule`,
   `CDSAngularModalModule`, etc., mirroring the CCA pattern. Consumers import
   modules.
2. **Standalone components** — export `ButtonComponent`, `ModalComponent`, etc.
   directly. Consumers import the component classes. No NgModules are authored
   or exported.

## Decision

`@carbon/angular` uses Angular standalone components throughout. Every component
class is decorated with `standalone: true` (the Angular 17+ default). No
`NgModule` barrel classes are exported as part of the public API.

NgModule barrels were rejected for three reasons:

- **Tree-shaking**: Angular's Ivy compiler can tree-shake individual standalone
  components. NgModule imports pull in the entire module even if only one
  component is used.
- **Boilerplate**: NgModules require consumers to maintain a separate imports
  array in their own module declarations — extra ceremony with no benefit when
  the underlying components are already standalone.
- **Direction of the platform**: Angular 17+ actively discourages new
  NgModule-based libraries. Standalone is the documented path forward and the
  default for all Angular CLI scaffolding.

This is a deliberate break from CCA, where `ButtonModule` is the import unit.
The `cca-update-module-imports` codemod in `@carbon/upgrade` automates the
mechanical part of this migration for consumers.

## Consequences

- Consumers import component classes directly:
  `import { ButtonComponent } from '@carbon/angular'` rather than
  `import { ButtonModule } from 'carbon-components-angular'`.
- Angular CLI's tree-shaking will only bundle components that are actually
  imported, reducing bundle size for apps that use a subset of the library.
- `CUSTOM_ELEMENTS_SCHEMA` — required to suppress Angular's unknown-element
  warnings for the `cds-ng-*` internal WC tags — is declared per component
  wrapper class, scoped to that component only. It does not bleed into consumer
  `NgModule` schemas.
- The `cca-update-module-imports` codemod handles the import path change. The
  selector rename (`ButtonModule` → `ButtonComponent`) cannot be automated for
  all cases and requires a one-line manual edit per import site.
