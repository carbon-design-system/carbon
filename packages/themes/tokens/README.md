# Theme Tokens

This directory contains the `@carbon/themes` design tokens in the
[Design Tokens Community Group (DTCG) 2025.10 format](https://www.designtokens.org/tr/2025.10/format/).
It is the source of truth for the package's generated Sass and JavaScript.

## Files

```
tokens/
├── themes.resolver.json          # Lists the token files of each theme
└── themes/
    ├── white/
    │   ├── theme.tokens.json     # Theme tokens (background, layer, text, …)
    │   ├── button.tokens.json    # Component tokens, one file per component
    │   ├── tag.tokens.json
    │   ├── notification.tokens.json
    │   ├── status.tokens.json
    │   └── content-switcher.tokens.json
    ├── g10/                      # Same files as white/
    ├── g90/
    └── g100/
```

Each theme has its own folder, and every file in it holds that theme's values
only. To compare a token across themes, build the package and open
`docs/generated/theme-tokens.md` at the root of the repository. It lists every
token with its value in all four themes.

## Token names

The key of a token is its name in Sass and CSS. Tokens are not nested in groups:

| Token key in the JSON    | Sass variable             | CSS custom property            |
| ------------------------ | ------------------------- | ------------------------------ |
| `background`             | `$background`             | `--cds-background`             |
| `background-hover`       | `$background-hover`       | `--cds-background-hover`       |
| `layer-accent-active-03` | `$layer-accent-active-03` | `--cds-layer-accent-active-03` |
| `button-danger-active`   | `$button-danger-active`   | `--cds-button-danger-active`   |

To find a token, search the theme's folder for its name in quotes, for example
`"layer-accent-active-03"`.

Component tokens start with the name of their component and live in the file
named after it: `tag-background-blue` is in `tag.tokens.json`.

## Token format

Every token has `$type`, `$value`, and `$description`.

| Key            | Required | Description                                         |
| -------------- | -------- | --------------------------------------------------- |
| `$type`        | ✅       | Always `"color"`                                    |
| `$value`       | ✅       | The token value — see **Authoring values** below    |
| `$description` | ✅       | Human-readable description of purpose and usage     |
| `$extensions`  | —        | Carbon-specific metadata — see **Extensions** below |

`$type`, `$description` and `$extensions` of a token are the same in every
theme. Only `$value` differs. The tests fail when they drift apart.

## Authoring values

### A palette color

Most tokens are an alias of a color from the `@carbon/colors` palette, defined
in
[`packages/colors/tokens/colors.tokens.json`](../../colors/tokens/colors.tokens.json).
The alias is the path of the palette token in curly braces.

```json
"background-inverse": {
  "$type": "color",
  "$value": "{gray.80}",
  "$description": "Inverse background color for dark UI elements."
}
```

Examples: `{blue.60}`, `{gray.80Hover}`, `{coolGray.10}`, `{white}`, `{black}`,
`{whiteHover}`.

### A palette color with its own alpha

A semi-transparent token reuses the `colorSpace` and `components` of a palette
color and sets its own `alpha`. An alias always points at a whole token, so
these use
[JSON Pointer references](https://www.designtokens.org/tr/2025.10/format/#json-pointer-notation)
to the two properties instead.

```json
"background-hover": {
  "$type": "color",
  "$value": {
    "colorSpace": { "$ref": "#/gray/50/$value/colorSpace" },
    "components": { "$ref": "#/gray/50/$value/components" },
    "alpha": 0.12
  },
  "$description": "Background color for hover state."
}
```

This is `{gray.50}` (`#8d8d8d`) at 12% opacity, and the build writes it as
`rgba(141, 141, 141, 0.12)`. An `alpha` of `0` is fully transparent, which the
gradient end tokens such as `ai-aura-end` use.

The pointer is the path of the palette token with `/` between the keys:
`{gray.50}` is `#/gray/50`, and `{white}` is `#/white`.

### A color that is not in the palette

A few tokens have a value of their own. Write these as a color object. `hex` is
what the build writes out, and `components` are the red, green and blue channels
from 0 to 1, rounded to six decimals.

```json
"button-danger-hover": {
  "$type": "color",
  "$value": {
    "colorSpace": "srgb",
    "components": [0.721569, 0.098039, 0.129412],
    "hex": "#b81921"
  },
  "$description": "Background color for danger buttons on hover."
}
```

## Extensions

Carbon-specific metadata is in `$extensions` under the `com.ibm.carbon` key. A
tool that ignores extensions still reads the correct value of every token.

| Where                            | Key            | Description                                                                                                                   |
| -------------------------------- | -------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| Root of each `theme.tokens.json` | `color-scheme` | `"light"` or `"dark"`. The build adds it to the theme as `color-scheme`.                                                      |
| A component token                | `fallback`     | The value a component token has when the current theme is not one of the four Carbon themes. Only `button-separator` has one. |

## Tokens that are not in every theme

A component token can be left out of a theme. `notification-action-hover`, for
example, is only defined for `white` and `g10`, so the generated Sass map and
JavaScript object for it only have those two themes. Theme tokens must be
defined in all four themes.

## The resolver file

[`themes.resolver.json`](./themes.resolver.json) is a
[DTCG resolver document](https://www.designtokens.org/tr/2025.10/resolver/). It
describes how the files combine:

1. the `palette` set, which is the `@carbon/colors` token file;
2. the `theme` modifier, with one context per theme that lists the theme's token
   files.

Resolving the document for a theme gives one token tree with the palette and
that theme's tokens, in which every alias and reference resolves.

The reference to the palette is the relative path
`../../colors/tokens/colors.tokens.json`. It works both in this repository and
when `@carbon/themes` and `@carbon/colors` are installed next to each other in
`node_modules`.

## Contextual layer tokens (`$layer`, `$field`, `$border-subtle`)

Component styles often use tokens without a number, such as `$layer`,
`$layer-accent`, `$field` and `$border-subtle`. These are not in the token
files. They are assigned at runtime by the layer sets in
`packages/styles/scss/layer/_layer-sets.scss`, which point each one at its
numbered token (`layer-01`, `layer-02` or `layer-03`) for the current layer
level.

## Build

```bash
cd packages/themes
yarn build
```

The build runs [Style Dictionary](https://styledictionary.com/) once per theme
(see [`style-dictionary/`](../style-dictionary)) and generates:

- `scss/generated/_themes.scss`: the four theme maps
- `scss/generated/_<component>-tokens.scss`: the component tokens, each a map of
  its value in every theme
- `js/generated/themes/` and `js/generated/component-tokens/`: the JavaScript
  modules and their type declarations
- `docs/generated/theme-tokens.md`: every token side by side for all themes

Do not edit generated files.

## Changing tokens

1. Edit the token in the file of **every** theme that defines it.
2. Run `yarn build` in this package.
3. Run `yarn test packages/themes` from the root of the repository. The tests
   check the files against the format, check that the themes agree with each
   other, and compare the generated output with snapshots of the public API.

To add a theme token, also add it to the token metadata in
[`src/tokens/`](../src/tokens), which generates the `$<token>` Sass variables.

To add a component token file, create `<component>.tokens.json` in each theme
folder and add it to each context in `themes.resolver.json`. Then forward the
generated Sass in `scss/_component-tokens.scss` and export the generated
JavaScript from `src/index.ts`.

## Resources

- [DTCG Format Module 2025.10](https://www.designtokens.org/tr/2025.10/format/)
- [DTCG Color Module 2025.10](https://www.designtokens.org/tr/2025.10/color/)
- [DTCG Resolver Module 2025.10](https://www.designtokens.org/tr/2025.10/resolver/)
