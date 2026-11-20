# 22. Add font family custom properties to the type helpers

Date: 2026-11-19

## Status

Proposed

## Context

Teams that ship their own brand fonts need to change the font family in Carbon
components without editing each component. That is hard to do for a component
that renders inside a shadow root. A stylesheet on the host page cannot select
elements inside the shadow root, so a value that the component's own styles
write as a literal can only be changed component by component, by a part
selector or a stylesheet added to each one. Only two kinds of values cross the
shadow boundary from outside: inherited properties, and CSS custom properties,
which also inherit.

Sass consumers can already change font families at compile time, because
`$font-families` is `!default`. That only helps a team that compiles Carbon's
Sass itself. It does not reach prebuilt CSS, web components that ship with their
styles bundled, or a host that switches fonts at runtime.

Carbon's color tokens already solve this. The Sass value of a color token is a
custom property with its default as the fallback, so `$text-primary` compiles to
`var(--cds-text-primary, #161616)`, and a host can change it from outside. The
fixed values that `type-style()` writes for sizes, weights, line heights and
letter spacing take the same shape, such as
`var(--cds-label-01-font-size, 0.75rem)`. This record does not change those, and
does not make them a supported contract.

Font family does not take that shape. The `font-family()` function and mixin in
`@carbon/type`, which `@carbon/styles` re-exports, return the full IBM Plex
stack as a literal. Four type tokens include a font family: `code-01`,
`code-02`, `quotation-01` and `quotation-02`. `type-style()` wraps the family of
the two code tokens as `--cds-code-01-font-family` and
`--cds-code-02-font-family`, but the fallback is still the literal stack. The
quotation tokens can only be used with fluid output, which writes the family as
a literal.

The literal stacks reach a lot of output: the `<body>` and `<code>` rules in the
type reset, the `.cds--type-*` family classes, and component styles that set a
family directly, such as code snippet, content switcher, form and number input
in `@carbon/styles`, and AI label, code snippet and slug in
`@carbon/web-components`. A host has no way to change the sans or mono family
inside a shadow root where one of these rules applies.

carbon-ai-chat#2709 (Open an ADR with `@carbon/styles` for custom-property type
helpers) opened this record because AI Chat, which renders in shadow roots,
needs its hosts to be able to use their own fonts.

## Decision

In v12, each font family is a token in the same shape as a color token. It has a
custom property named `--<prefix>-font-family-<name>`, where `<name>` is a key
of `$font-families`, and its Sass value is that property with the current stack
as the fallback:

```scss
font-family('mono')
// var(--cds-font-family-mono, 'IBM Plex Mono', system-ui, …, monospace)
```

`<prefix>` is the configured prefix, `cds` by default. These properties are
public API of `@carbon/type` and `@carbon/styles`, and renaming or removing one
is a breaking change.

Everything that reads a family from `font-family()` gets the token value: the
`font-family()` mixin, the type reset, the components that call either helper,
and the type classes, which change to call `font-family()` instead of reading
`$font-families` directly. The type token maps also hold the token value, so
`type.$code-01` has `font-family: var(--cds-font-family-mono, …)`. The theme
maps, which include the type tokens, hold it too. This is how code text, fluid
quotation output and the type properties that `theme()` declares follow a host's
family without any special handling. For example, `type-style('code-01')`
compiles to
`var(--cds-code-01-font-family, var(--cds-font-family-mono, 'IBM Plex Mono', …))`.

The family properties themselves are not part of the theme maps, because a font
family does not change with the theme. `theme()` never declares them, so it
never resets a host's choice inside a themed area.

The implementation has to meet three requirements:

- The configured prefix applies to every name, including the values stored in
  the token and theme maps. Those maps are built when `@carbon/type` loads, so
  the prefix has to be set before that point, not afterwards as `@carbon/styles`
  does today. Otherwise a consumer who sets `$prefix: 'acme'` gets
  `--acme-code-01-font-family` chained to `--cds-font-family-mono`.
- A name that is not in `$font-families` writes no declaration, as today. A
  consumer who replaces `$font-families` with a map that has no `mono` key must
  not get `font-family: var(--cds-font-family-mono, )`, which is invalid but
  still wins the cascade.
- The fallback keeps the quoting of the stack, so a consumer stack such as
  `('3rd Font', sans-serif)` stays valid.

These are the new properties, one for each family in `$font-families`, with
their defaults. Each default is the stack that `font-family()` writes today. In
the default `@carbon/styles` build only `sans` and `mono` reach a `font-family`
declaration. `serif` appears only in the quotation type properties that
`theme()` declares on `.cds--guidebanner`. The others are used only where a
stylesheet calls `font-family()` with that name or includes `type-classes()`.

```css
--cds-font-family-sans: 'IBM Plex Sans', system-ui, -apple-system,
  BlinkMacSystemFont, '.SFNSText-Regular', sans-serif;
--cds-font-family-sans-condensed: 'IBM Plex Sans Condensed', system-ui,
  -apple-system, BlinkMacSystemFont, '.SFNSText-Regular', sans-serif;
--cds-font-family-sans-arabic: 'IBM Plex Sans Arabic', system-ui, -apple-system,
  BlinkMacSystemFont, '.SFNSText-Regular', sans-serif;
--cds-font-family-sans-devanagari: 'IBM Plex Sans Devanagari', system-ui,
  -apple-system, BlinkMacSystemFont, '.SFNSText-Regular', sans-serif;
--cds-font-family-sans-hebrew: 'IBM Plex Sans Hebrew', system-ui, -apple-system,
  BlinkMacSystemFont, '.SFNSText-Regular', sans-serif;
--cds-font-family-sans-jp: 'IBM Plex Sans JP', system-ui, -apple-system,
  BlinkMacSystemFont, '.SFNSText-Regular', sans-serif;
--cds-font-family-sans-kr: 'IBM Plex Sans KR', system-ui, -apple-system,
  BlinkMacSystemFont, '.SFNSText-Regular', sans-serif;
--cds-font-family-sans-thai: 'IBM Plex Sans Thai', system-ui, -apple-system,
  BlinkMacSystemFont, '.SFNSText-Regular', sans-serif;
--cds-font-family-sans-thai-looped: 'IBM Plex Sans Thai Looped', system-ui,
  -apple-system, BlinkMacSystemFont, '.SFNSText-Regular', sans-serif;
--cds-font-family-mono: 'IBM Plex Mono', system-ui, -apple-system,
  BlinkMacSystemFont, '.SFNSText-Regular', monospace;
--cds-font-family-serif: 'IBM Plex Serif', system-ui, -apple-system,
  BlinkMacSystemFont, '.SFNSText-Regular', serif;
```

A key that a consumer adds to `$font-families` becomes part of a property name,
so it must be a valid CSS identifier: `brand-sans`, not `brand sans`.

`emit-type-custom-properties()`, which `$css--emit-type-custom-props` turns on,
also emits the `--cds-font-family-*` properties on `:root`, so its output lists
them with the other type properties.

The names follow the `$font-families` keys, which consumers already write in
Sass. The DTCG token files added since #22326 (feat(tokens): DTCG Explorations)
use the same rule: a token's JSON key is its Sass and CSS name.

With this in place, a host page can use its own fonts in Carbon components,
inside shadow roots or not, without writing a component selector:

```css
:root {
  --cds-font-family-sans: 'Acme Sans', system-ui, sans-serif;
  --cds-font-family-mono: 'Acme Mono', ui-monospace, monospace;
}
```

## Consequences

Consumers who set none of these properties see no change in rendering. When a
custom property is not set, the browser uses the fallback, which is the stack
written today. We compiled `packages/styles/index.scss` with and without this
change, replaced every `var(--name, fallback)` in both outputs with its
fallback, and got the same declarations. We also compiled `font-family()`
against a customized `$font-families`: names that are not in the map still write
nothing, and quoted family names keep their quotes.

We measured the cost by compiling `packages/styles/index.scss` with Dart Sass
1.108.2 and `style: compressed`, at `next` commit `29e83c58dd`:

| Build                              | Raw (bytes) | gzip -9 (bytes) | Brotli (bytes) |
| ---------------------------------- | ----------: | --------------: | -------------: |
| Today                              |   1,255,687 |         113,489 |         78,280 |
| With font family custom properties |   1,257,460 |         113,681 |         78,280 |

The change adds 1,773 bytes raw (0.14%), 192 bytes gzipped (0.17%) and 0 bytes
with Brotli across 61 declarations: 55 `font-family` declarations and the 6 type
properties that `theme()` declares on `.cds--guidebanner`. The 90 `@font-face`
rules keep their literal family names, because `@font-face` descriptors cannot
use custom properties.

The Sass values change, and this is a breaking change for v12. `font-family()`,
the `font-family` entries in `$code-01`, `$code-02`, `$quotation-01`,
`$quotation-02` and their fluid aliases, and the same entries in every theme map
now hold a `var()` expression instead of a font stack. A consumer who passes one
of these values somewhere a custom property is not allowed, such as an
`@font-face` descriptor or a non-CSS target like an SVG attribute, or who treats
it as a list or concatenates it in Sass, needs to read `$font-families`
directly. Carbon's own styles do not do this. Snapshot tests in `@carbon/styles`
and the public API snapshot in `@carbon/themes` need updating.

The JavaScript exports of `@carbon/type`, such as `fontFamilies`, keep their
literal values, so CSS-in-JS consumers get no override hook from this change.
They already differ from the Sass stacks and list fewer families, so the 11
defaults above describe the Sass and CSS output only. React consumers get the
change through `@carbon/styles` with no API change.

Inside an area styled with `theme()`, the type properties that `theme()`
declares, such as `--cds-code-01-font-family`, resolve on the themed element. A
host that sets `--cds-font-family-mono` on `:root` or any ancestor of that
element reaches code text inside it. A value set below the themed element
changes text written with `font-family()` but not `code-01` and `code-02` text.

Maintainers take on keeping these names stable. A new font family adds a
property. The properties should be documented next to `$font-families`. Tests
should cover the list of names, a custom prefix, a customized `$font-families`
with a missing key and a quoted name, and that every fallback equals today's
stack.

A host that sets a value that is not a font list, such as `12px`, does not get
Carbon's fallback. The declaration becomes invalid at computed value time, and
`font-family` falls back to its inherited value. A misspelled or missing font is
still a valid value: the browser moves on to the next font in the host's list.

This change lands on `next`, so it ships in v12. Its implementation pull
request, not this record, must update `docs/migration/v12.md` for
`@carbon/type`, `@carbon/themes` and `@carbon/styles`. The update should cover
the new `--cds-font-family-*` properties and the Sass values that now hold a
`var()` expression.

We considered and rejected these alternatives:

- **An opt-in Sass flag for the font family custom properties.** It would save
  the 192 bytes gzipped for consumers who do not need it, but Carbon would have
  two output modes to test and maintain, and prebuilt CSS and bundled web
  components could only ship one of them.
- **A font family property on every type token.** This would give names such as
  `--cds-body-01-font-family`, matching `code-01` and `code-02`. It adds a
  property to every type token, and a single brand font would become a change to
  dozens of properties.
- **Leaving the token and theme maps literal and wrapping the family only when
  CSS is written.** Sass values would not change, but `type-style()`, its fluid
  output and `theme()` would each have to recognize a font stack and map it back
  to its family name. v12 can change the values, and a family token in the same
  shape as a color token is simpler to explain and maintain.
- **Declaring the font family properties on `:host` in each component.** A value
  set on the component itself overrides anything it inherits, so a host would
  have to target each component's tag. For components nested in another
  component's shadow root, such as `cds-code-snippet` → `cds-copy-button` →
  `cds-copy`, a host page cannot select the tag at all. The remaining route,
  `::part()` with `exportparts` at every level, makes each part name public API
  and needs a rule per chain. Only three components use `exportparts` today.
