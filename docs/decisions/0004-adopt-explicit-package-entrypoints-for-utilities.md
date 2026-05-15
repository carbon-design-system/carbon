# 4. Adopt explicit package entrypoints for the utilities packages

Date: 2026-03-03

## Status

Accepted

## Context

As part of #21659, the `@carbon/utilities` and `@carbon/utilities-react`
packages were migrated from a Rollup-based build to `tsdown`. Under the previous
build, both packages published a broad file tree under `es/`, `lib/`, and
`types/`. In practice, this meant consumers could import many undocumented deep
paths simply because the compiled files existed on disk.

That older structure caused a few problems:

- It made the package layout itself part of the public API, even when that was
  not intentional
- It increased the compatibility burden when changing build tools or output
  structure
- It required JavaScript files and type files to stay in sync across many
  accidental public entrypoints
- It made it difficult to distinguish between truly supported entrypoints and
  implementation details

At the same time, there is still value in supporting smaller, focused import
paths instead of forcing everything through one large root entrypoint. This can
help consumers import only what they need without forcing us to support the
entire compiled directory tree forever.

The migration to `tsdown` created a natural forcing function to make the package
contract explicit. Rather than reproduce the old "everything under `es/` and
`lib/` is importable" behavior, we chose to define a smaller set of supported
entrypoints and align the package metadata, runtime output, and type output to
that contract.

This decision is also intended to serve as a proving ground. The utilities
packages are lower-risk places to test an explicit-entrypoint packaging model,
gather feedback from consumers, and assess whether the approach provides the
right balance of maintainability, compatibility, and bundle-size behavior. If
the model proves effective, similar patterns may be adopted gradually in other
packages over time, including `@carbon/react` in a future major version.

## Decision

We will move the utilities packages away from exposing their raw compiled file
trees as de facto public API and instead publish explicit, supported
entrypoints.

The supported subpaths are defined by convention rather than a hardcoded list in
the build configuration: a top-level `src/<name>/index.*` module becomes a
public subpath entrypoint (`pkg/<name>`). This keeps the public contract
predictable while avoiding routine build-config edits every time a new utility
module is added. In the published output, these convention-based subpaths are
mapped through wildcard `exports` entries to nested generated files.

For `@carbon/utilities`:

- The package keeps its root entrypoint (`@carbon/utilities`)
- The package also exposes a curated set of supported subpaths through
  `package.json#exports` using a wildcard subpath pattern
- Any top-level `src/<name>/index.ts` module becomes a supported public subpath
  import at `@carbon/utilities/<name>`
- The build is configured so each supported module gets its own generated output
- Type files are generated once, from the ESM build, for each supported module
- The old standalone `types/` output tree is no longer published

For `@carbon/utilities-react`:

- The package keeps its root entrypoint (`@carbon/utilities-react`)
- The package also exposes a curated set of supported subpaths through
  `package.json#exports` using a wildcard subpath pattern
- Any top-level `src/<name>/index.*` module becomes a supported public subpath
  import at `@carbon/utilities-react/<name>`
- The build is configured so each supported module gets its own generated output
- Type files are generated once, from the ESM build, for each supported module
- The old standalone `types/` output tree is no longer published

For both packages:

- `main` and `module` are retained, so root CommonJS and ESM entrypoints remain
  available
- `types` points to the main generated type entrypoint
- CommonJS builds do not emit duplicate declaration files
- The publish contract is defined by `exports`, not by whatever build artifacts
  happen to exist in the package tarball

We will also include package metadata that helps bundlers remove unused code:

- `@carbon/utilities` declares a selective `sideEffects` allowlist for Sass
  assets so style imports are preserved while JavaScript can still be optimized
- `@carbon/utilities-react` declares `sideEffects: false` because it does not
  publish Sass assets and its JavaScript modules are intended to be safe to
  optimize as side-effect-free

This work intentionally does not preserve compatibility for arbitrary deep
imports into `es/`, `lib/`, or `types/` that are outside the newly defined
entrypoints.

## Consequences

The utilities packages now have a clearer, smaller, and more maintainable public
contract.

Positive outcomes:

- Consumers have an explicit set of supported import paths
- Maintainers can change internal file layout without automatically creating or
  preserving public API surface
- Generated JavaScript and generated type files now line up with the supported
  entrypoints
- Root imports continue to work in both ESM and CommonJS
- `@carbon/utilities` still offers smaller import surfaces than root-only via
  curated subpaths
- `@carbon/utilities-react` now offers the same kind of explicit smaller import
  surface for its React-specific helpers without exposing its raw build tree
- The utilities packages now provide a concrete example for evaluating an
  explicit-entrypoint packaging strategy before applying it to larger packages

Tradeoffs and breaking changes:

- Consumers who import undocumented deep paths under `es/`, `lib/`, or `types/`
  outside the supported entrypoints will break
- Some consumers may need to update imports if they were reaching into internal
  files instead of using supported package entrypoints
- Shared internal generated files may still exist, but they are implementation
  details rather than public API. The supported contract remains the explicit
  exported entrypoints.

This decision does not establish a rule that all Carbon packages must become
root-only. The key architectural choice is to make supported entrypoints
explicit. Some packages may ultimately use only a root entrypoint, while others
may expose a curated set of subpaths where that better serves consumers.
