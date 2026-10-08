# Layout Tokens

This directory contains the `@carbon/layout` design tokens in the
[Design Tokens Community Group (DTCG) 2025.10 format](https://www.designtokens.org/tr/2025.10/format/).
It is the source of truth for the package's generated Sass and JavaScript.

## File

```
tokens/
└── layout.tokens.json    # All layout tokens organised into token groups
```

Each top-level key in the JSON (e.g. `"spacing"`, `"border-radius"`) is a
**token group**, and the tokens live inside it:

```json
{
  "spacing": {
    "$description": "Spacing scale based on the 8px mini-unit grid.",
    "spacing-05": {
      "$type": "dimension",
      "$value": { "value": 1, "unit": "rem" },
      "$description": "Spacing token — 16px."
    }
  }
}
```

The group name is the **authoritative category** for a token. The Style
Dictionary pipeline reads `token.path[0]` (the group key) to decide which
generated file the token belongs to — no name-prefix inference, no hidden
ordering rules.

## Token format

Every token has `$type`, `$value`, and `$description`.

| Key            | Required | Description                                               |
| -------------- | -------- | --------------------------------------------------------- |
| `$type`        | ✅       | `"dimension"`, or `"number"` for viewport-relative values |
| `$value`       | ✅       | The token value — see **Authoring values** below          |
| `$description` | ✅       | Human-readable description of purpose and usage           |
| `$deprecated`  | —        | `true` when the token should not be used in new work      |
| `$extensions`  | —        | Carbon-specific metadata — see **Extensions** below       |

---

## Authoring values

### Dimensions — `px` and `rem`

A dimension `$value` is an object with a numeric `value` and a `unit`. The
format allows two units, `px` and `rem`. The build writes them out as
`<value><unit>`, with no conversion.

```json
"spacing-07": {
  "$type": "dimension",
  "$value": { "value": 2, "unit": "rem" },
  "$description": "Spacing token — 32px."
}
```

Carbon's scales are defined in pixels on an 8px mini-unit grid and published in
`rem`, with a base font size of 16px. To work out the `rem` value, divide the
pixel value by 16:

| Design value          | Calculation | `$value`                            |
| --------------------- | ----------- | ----------------------------------- |
| 4 mini-units (32px)   | `32 ÷ 16`   | `{ "value": 2, "unit": "rem" }`     |
| 4px                   | `4 ÷ 16`    | `{ "value": 0.25, "unit": "rem" }`  |
| A value that stays px | —           | `{ "value": 999999, "unit": "px" }` |

### Numbers — viewport-relative values

The DTCG dimension type has no viewport units, so the fluid spacing tokens are
`number` tokens: the `$value` is the count of viewport-width units, and the unit
is recorded in `$extensions`.

```json
"fluid-spacing-02": {
  "$type": "number",
  "$value": 2,
  "$description": "Fluid spacing token — 2vw.",
  "$extensions": {
    "com.ibm.carbon": {
      "layout": { "unit": "vw" }
    }
  }
}
```

A `number` token with no unit is written out as the bare number, which is how
`fluid-spacing-01` produces a unitless `0`.

### Deprecated tokens

Mark a deprecated token with the format's own `$deprecated` property. Tools and
codemods can read it to warn consumers.

```json
"layout-01": {
  "$type": "dimension",
  "$value": { "value": 1, "unit": "rem" },
  "$description": "Deprecated layout token — 16px. Replaced by spacing scale. Do not use in new work.",
  "$deprecated": true
}
```

---

## Extensions — `com.ibm.carbon`

All Carbon-specific metadata lives under the single `com.ibm.carbon` key,
grouped by concern. Layout uses one property:

| Property      | Applies to      | Description                                            |
| ------------- | --------------- | ------------------------------------------------------ |
| `layout.unit` | `number` tokens | CSS unit appended to the number in the output (`"vw"`) |

---

## Token naming and generated file routing

Token names in `layout.tokens.json` use **kebab-case**. Routing to a generated
Sass file is determined by the **group** the token belongs to — `token.path[0]`
in Style Dictionary terms. There is no name-prefix inference.

| Group key       | Generated Sass file                  | Sass map variable           |
| --------------- | ------------------------------------ | --------------------------- |
| `spacing`       | `scss/generated/_spacing.scss`       | `$spacing`                  |
| `fluid-spacing` | `scss/generated/_fluid-spacing.scss` | `$fluid-spacing`            |
| `container`     | `scss/generated/_container.scss`     | `$container`                |
| `icon-size`     | `scss/generated/_icon-size.scss`     | `$icon-size`                |
| `border-radius` | `scss/generated/_border-radius.scss` | `$border-radius`            |
| `layout`        | `scss/generated/_layout.scss`        | `$layout`                   |
| `size`          | `scss/generated/_size.scss`          | _(no map — bare variables)_ |

The JS export name is the camelCase version of the token's own key: `spacing-05`
→ `spacing05`, `border-radius-04` → `borderRadius04`, `fluid-spacing-02` →
`fluidSpacing02`.

### Adding a token to an existing category

Place the token inside the correct group object — it will automatically be
included in the right file on the next build. For example, to add a new spacing
step of 192px:

```json
"spacing": {
  "spacing-14": {
    "$type": "dimension",
    "$value": { "value": 12, "unit": "rem" },
    "$description": "Spacing token — 192px."
  }
}
```

This will add `$spacing-14: 12rem !default;` to `_spacing.scss` and
`export const spacing14 = '12rem';` to `layout-tokens.js`.

### Adding a token in a new category

A new group (e.g. `gap`) also needs a change to the Style Dictionary pipeline:

1. Add the group and its tokens to `layout.tokens.json`.
2. Add a new format function in
   [`style-dictionary/formats/scss-layout.js`](../style-dictionary/formats/scss-layout.js):
   ```js
   function formatGap({ dictionary }) {
     const tokens = tokensForGroup(dictionary, 'gap');
     return buildStandardFile(tokens, 'gap', BANNER_2023);
   }
   ```
3. Export it from the `module.exports` array at the bottom of that file.
4. Register the new output file in
   [`style-dictionary/sd.config.js`](../style-dictionary/sd.config.js) under the
   `scss` platform's `files` array:
   ```js
   { destination: '_gap.scss', format: 'carbon/scss-gap' }
   ```
5. Forward the new file from the appropriate `scss/_*.scss` entry point (or
   create a new one and forward it from `index.scss`).

---

## Adding a new token

1. Add an entry to `layout.tokens.json` following the examples above.
2. Put it in the right group (see the table above).
3. Choose the right `$type` and `$value`:
   - A `rem` or `px` value? Use `"dimension"` with `{ "value", "unit" }`.
   - A viewport-relative value? Use `"number"` with the `layout.unit` extension.
4. Run the build to regenerate the Sass and JS outputs:
   ```bash
   cd packages/layout
   yarn build:tokens
   ```
5. Check the value in `js/generated/layout-tokens.js` and the matching
   `scss/generated/_*.scss` file.
6. Run `yarn test packages/layout` from the repo root. The conformance test
   validates the file against the DTCG schema.

---

## Build pipeline

```
tokens/layout.tokens.json     ← you edit this
        │
        ▼  yarn build:tokens
        │  (style-dictionary/sd.config.js)
        │
        ├── scss/generated/*.scss                (Sass variables + maps, one file per token group)
        └── js/generated/layout-tokens.{js,d.ts} (ES module + types)
                │
                ▼
        src/index.ts  re-exports all tokens
```
