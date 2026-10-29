# 8. Choosing an isolation strategy for breaking `@carbon/web-components` changes

Date: 2026-09-09

## Status

Accepted

This decision sits alongside
[ADR 0007](0007-provide-pure-class-exports-for-web-components.md), which covers
the v3 registration model, and [ADR 0003](0003-use-preview-moniker.md), which
established `preview` as the moniker for features we ship for feedback ahead of
stabilising them.

## Context

`@carbon/web-components` now has three different ways to ship a change that
would otherwise break consumers, and they have been picked ad hoc:

- The **`<feature-flags>` element**, which resolves flags at runtime by walking
  up from an instance (`enable-v12-*`, `enable-dialog-element`).
- **Shim, deprecate, delete at the major**, used for the pure exports refactor,
  the `es-custom` build, and the WCA manifest.
- **A `next/` directory registering separate `cds-preview-*` tags**, introduced
  for the date picker rewrite and reused for native form association.

The third is new, and its early success invited a broader question: should the
whole v3 API move into `next/` so consumers can adopt it without any risk to v2
usage?

Answering that surfaced a hard constraint. `next/` isolates an **element**. It
cannot isolate the **package**, because a tag name can only be registered once.
`customElements.define()` throws on a duplicate, `carbonElement` swallows that
error with a `console.warn`, and the winner is whichever module is imported
first — which is frequently decided by a transitive import rather than by the
consumer. Two implementations of `cds-button` cannot coexist, so a change to how
`cds-button` registers cannot be previewed under a second tag without changing
the tag, which defeats the purpose.

The same limit was reached from the other direction while implementing form
association. `static formAssociated` is read exactly once, at
`customElements.define()`. Setting it afterwards has no effect, and a
`static get` accessor is invoked a single time during registration. No runtime
flag can reach it, which is why that work needed `next/` rather than
`<feature-flags>`.

These two facts bound the problem from both sides: some changes are beyond the
reach of a runtime flag, and some are beyond the reach of a separate tag.

## Decision

Keep all three strategies, and choose between them by asking what the change
actually touches. In order of preference:

**1. `<feature-flags>`, when the behavior can be toggled per instance at
runtime.** This is the cheapest option — no new tags, no duplicated stories, no
second migration for consumers — and it should stay the default.

**2. A `next/` directory with `cds-preview-*` tags, when the change is scoped to
an element but cannot be toggled at runtime.** In practice this means values the
browser reads once, at definition or construction: `static formAssociated`,
`shadowRootOptions` (including `delegatesFocus`), the element's base class or
mixin composition, removal or renaming of public properties, and wholesale
restructuring of shadow DOM. It also covers a rewrite substantial enough that a
flag inside one implementation is not honest, as with the date picker.

**3. Shim, deprecate, and delete at the major, for anything at package, build,
or module level.** Registration semantics, build artifacts, generated manifests,
and package exports all fall here. `next/` cannot help with these, and they do
not need it.

Specifically: **the v3 API work stays on strategy 3 and does not move into
`next/`.** The registration shims (#22818), the `es-custom` removal (#22819) and
the WCA-to-CEM replacement (#22820) are all deletions of temporary scaffolding
at the major. The non-breaking path for each is already solved by shipping the
replacement to `main` behind shims and deprecation warnings.

`next/` is a narrow tool for a narrow problem. It is not the general answer to
"this change is breaking."

## Consequences

Each `next/` component carries real, recurring cost, and that cost is what keeps
strategy 2 from becoming the default:

- **Tag proliferation.** Form association alone added eleven preview tags. Each
  one needs its own stories — which are consumer contract, not a demo surface —
  along with tests, manifest entries, and accessibility verification.
- **Consumers migrate twice**: onto the preview tag, then back onto the
  canonical tag when the major lands.
- **Composite components need a per-tag audit.** Anything that finds children by
  tag name must learn the preview tag; `CDSCheckboxGroup.selectorCheckbox`
  needed broadening for exactly this reason.
- **Subclass previews drift.** A preview implemented as a subclass inherits
  changes to its base for as long as the preview lives.
- **Subclass previews re-register their base.** Importing
  `checkbox/next/index.js` also registers `cds-checkbox`, because the preview
  subclasses a class whose module self-registers. Preview components therefore
  participate in the transitive-registration cleanup tracked in #22818 rather
  than sidestepping it.

Against those costs, the strategy buys something the other two cannot: real
consumer feedback on a definition-time change, gathered before the major, with
zero risk to existing tags. That trade is worth making deliberately and rarely.

A preview tag is always temporary. Every `next/` directory should have a removal
issue filed against the major that absorbs it, so the preview surface shrinks to
nothing at each major rather than accumulating.
