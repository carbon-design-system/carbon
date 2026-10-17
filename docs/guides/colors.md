# Colors

<!-- prettier-ignore-start -->
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table of Contents

- [Contributing](#contributing)
  - [Colors](#colors)
  - [Themes](#themes)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->
<!-- prettier-ignore-end -->

## Contributing

Colors and theme tokens are authored as JSON in the
[Design Tokens Community Group (DTCG) 2025.10 format](https://www.designtokens.org/tr/2025.10/format/).
The Sass and JavaScript that the packages publish are generated from these files
at build time, so edit the JSON and never the generated output.

### Colors

The IBM Design Language color palette lives in
[`packages/colors/tokens/colors.tokens.json`](/packages/colors/tokens/colors.tokens.json).
Each color is a token with a `$value` that holds its color space, components,
and HEX code:

```json
"red": {
  "10": {
    "$type": "color",
    "$value": {
      "colorSpace": "srgb",
      "components": [1, 0.945098, 0.945098],
      "hex": "#fff1f1"
    },
    "$description": "red 10"
  }
}
```

After editing the file, run `yarn build` in `packages/colors` to regenerate the
JavaScript and Sass outputs. See the
[`@carbon/colors` README](/packages/colors/README.md) for the list of generated
files.

### Themes

Theme tokens live in
[`packages/themes/tokens/themes`](/packages/themes/tokens/themes), with one
folder per theme (`white`, `g10`, `g90`, and `g100`). The
[`white`](/packages/themes/tokens/themes/white/theme.tokens.json) theme is
considered the default theme.

A token's value is usually an alias to a palette color, such as `{blue.60}`. The
[theme tokens README](/packages/themes/tokens/README.md) covers how to author
values (including colors with alpha), add or change tokens, and build the
package.
