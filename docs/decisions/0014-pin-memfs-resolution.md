# Pin memfs version via root resolutions

## Status

Accepted

## Context

`memfs` is used by `packages/icon-build-helpers` and `packages/upgrade` in Jest
tests that mock the `fs` module via
`jest.mock('fs', () => require('memfs').fs)`. Those tests also indirectly load
`fs-extra`, which patches the mocked `fs` object through `graceful-fs`.

In `memfs@4.80.0` a change was made to how the default `fs` export is assembled:

```js
module.exports = { ...module.exports, ...exports.fs };
```

This object spread copies all enumerable own properties from `exports.fs` into
`module.exports`, but the internal `kStreams` Symbol that backs the
`ReadStream`/`WriteStream` property descriptors is non-enumerable and is
therefore not carried across. When `graceful-fs` subsequently calls
`Object.defineProperty(fs, 'ReadStream', streamSlot(0))` the getter fires
immediately and reads `this[kStreams][0]` — but `this[kStreams]` is `undefined`
on the spread copy, throwing:

```
TypeError: Cannot read properties of undefined (reading '0')
    at memfs/src/index.ts:59
    at graceful-fs/graceful-fs.js:240
```

This crash took down every test suite that touches `fs-extra` inside a
`jest.mock('fs')` call. It was discovered when adding `packages/angular` to the
monorepo: that package's devDependencies brought in `jest-preset-angular@^16`,
which introduced additional `memfs@^4.x` ranges into the dependency graph.
`yarn dedupe` then consolidated all `memfs@^4` ranges to the latest resolved
version (4.80.0), silently upgrading past the breaking change from the
previously-locked 4.65.0.

## Decision

Pin `memfs` to `4.65.0` in the root `resolutions` field of `package.json`. This
prevents `yarn dedupe` or any transitive dependency upgrade from bumping `memfs`
past the known-good version without an explicit, intentional change.

Before removing or raising this pin, verify that the affected tests pass:

```
yarn test --ci --testPathPatterns="packages/icon-build-helpers|packages/upgrade/src/__tests__/workspace-test"
```

If they pass, the upstream `memfs` bug has been resolved and the pin can be
lifted. Track the issue at https://github.com/streamich/memfs/issues.

## Consequences

- The `memfs` version is frozen at 4.65.0 until the pin is explicitly removed.
  Security or performance improvements in newer releases will not be picked up
  automatically.
- Any future addition of workspace packages with `memfs` devDependencies will
  not cause a silent test regression via `yarn dedupe`.
- The pin is in one canonical place (`resolutions` in the root `package.json`)
  so it is easy to find and remove when the time comes.
