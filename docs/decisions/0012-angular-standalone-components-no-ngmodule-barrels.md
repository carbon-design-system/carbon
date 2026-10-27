# 12. Use Angular standalone components throughout; no NgModule barrel exports

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

Angular 14 introduced standalone components as an opt-in, Angular 17 made them
the default for CLI-generated apps, and Angular 19 made `standalone: true` the
default in the `@Component` decorator itself. A standalone component declares
its own dependencies and does not belong to any `NgModule`. It can be imported
directly, like a class, wherever it is needed.

Two export strategies were considered for `@carbon/angular`:

1. **NgModule barrels** — export `CDSAngularButtonModule`,
   `CDSAngularModalModule`, etc., mirroring the CCA pattern. Consumers import
   modules.
2. **Standalone components** — export `ButtonComponent`, `ModalComponent`, etc.
   directly. Consumers import the component classes. No NgModules are authored
   or exported.

## Decision

`@carbon/angular` uses Angular standalone components throughout. Every component
class is explicitly decorated with `standalone: true`. The flag is redundant on
Angular 19+ but required on Angular 17 and 18, which this package's peer range
(`>=17`) still supports. No `NgModule` barrel classes are exported as part of
the public API.

> **Update 2026-10-27.** [ADR 0018](0018-angular-supported-major-versions.md)
> was accepted with a peer floor of Angular 20. The explicit `standalone: true`
> can be dropped from components, because it is the decorator default from
> Angular 19.

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
- `CUSTOM_ELEMENTS_SCHEMA` is not needed. The wrapper template contains only
  `<ng-content />` (ADR 0015), so there are no custom elements in the Angular
  template for Angular to warn about. Confirmed removed from generated wrapper
  output (see ADR 0015 open questions).
- The `cca-update-module-imports` codemod handles the import path change. The
  selector rename (`ButtonModule` → `ButtonComponent`) cannot be automated for
  all cases and requires a one-line manual edit per import site.
