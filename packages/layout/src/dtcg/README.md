# Layout Tokens (DTCG Format)

This directory contains `@carbon/layout` design tokens in the
[Design Tokens Community Group (DTCG)](https://tr.designtokens.org/format/)
format.

## File

```
dtcg/
└── layout.json    # All layout tokens organised into DTCG groups
```

Tokens are grouped using **native DTCG token groups**. Each top-level key in the
JSON (e.g. `"spacing"`, `"border-radius"`) is a group, and the tokens live
inside it:

```json
{
  "spacing": {
    "$description": "Spacing scale based on the 8px mini-unit grid.",
    "spacing-05": {
      "$type": "dimension",
      "$value": 2,
      "$extensions": { "carbon.layout": { "converter": "miniUnits" } }
    }
  }
}
```

The group name is the **authoritative category** for a token. The Style
Dictionary pipeline reads `token.path[0]` (the group key) to decide which
generated file the token belongs to — no name-prefix inference, no hidden
ordering rules.

## Token Format

All tokens follow the DTCG specification. Every token has `$type`, `$value`, and
`$description`. Some tokens carry a `carbon.layout` extension that describes how
the value was derived.

### Keys

| Key            | Required | Description                                         |
| -------------- | -------- | --------------------------------------------------- |
| `$type`        | ✅       | Always `"dimension"` for layout tokens              |
| `$value`       | ✅       | The token value — see **Authoring values** below    |
| `$description` | ✅       | Human-readable description of purpose and usage     |
| `$extensions`  | —        | Carbon-specific metadata — see **Extensions** below |

---

## Authoring values

The `$value` field has two modes depending on whether `$extensions` is present.

### Without extensions — resolved CSS value

When no `carbon.layout` extension is present, `$value` must be a **fully
resolved CSS value** including its unit. The build pipeline uses it as-is.

```json
"fluid-spacing-02": {
  "$type": "dimension",
  "$value": "2vw",
  "$description": "Fluid spacing token — 2vw."
}
```

Valid units: `rem`, `px`, `vw`, `vh`, `%`, or `0` (unitless zero).

### With extensions — raw numeric input + converter

When `carbon.layout.converter` is present, `$value` is the **raw numeric input**
to that converter function. The build pipeline resolves it to the final CSS
value. Do **not** include a unit in `$value` in this case.

```json
"spacing-05": {
  "$type": "dimension",
  "$value": 2,
  "$description": "Spacing token — 16px.",
  "$extensions": {
    "carbon.layout": {
      "converter": "miniUnits"
    }
  }
}
```

---

## Extensions — `carbon.layout`

### `converter`

Declares how to convert the raw `$value` number to a CSS value.

| `converter`   | Input           | Formula                  | Example           |
| ------------- | --------------- | ------------------------ | ----------------- |
| `"miniUnits"` | Grid step count | `steps × 8px ÷ 16 = rem` | `2` → `"1rem"`    |
| `"rem"`       | Pixel value     | `px ÷ 16 = rem`          | `4` → `"0.25rem"` |

**`miniUnits`** — Carbon's 8px base grid. Pass the number of grid steps. Use
this for spacing, container, and layout-scale tokens.

```json
"spacing-07": {
  "$type": "dimension",
  "$value": 4,
  "$description": "Spacing token — 32px.",
  "$extensions": {
    "carbon.layout": {
      "converter": "miniUnits"
    }
  }
}
```

**`rem`** — Direct pixel-to-rem conversion. Pass the value in pixels. Use this
for border-radius tokens and any token defined by an explicit px measurement
rather than a grid step.

```json
"border-radius-04": {
  "$type": "dimension",
  "$value": 4,
  "$description": "Border radius token — 4px.",
  "$extensions": {
    "carbon.layout": {
      "converter": "rem"
    }
  }
}
```

### `deprecated`

Marks a token as deprecated. Set to `true` alongside any other extension keys.
Tools and codemods can read this flag to warn consumers.

```json
"layout-01": {
  "$type": "dimension",
  "$value": 2,
  "$description": "Deprecated. Replaced by spacing scale. Do not use in new work.",
  "$extensions": {
    "carbon.layout": {
      "converter": "miniUnits",
      "deprecated": true
    }
  }
}
```

---

## Token naming and generated file routing

Token names in `layout.json` use **kebab-case**. Routing to a generated Sass
file is determined by the **DTCG group** the token belongs to — `token.path[0]`
in Style Dictionary terms. There is no name-prefix inference.

| DTCG group key  | Generated Sass file                  | Sass map variable           |
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
step:

```json
"spacing": {
  "spacing-14": {
    "$type": "dimension",
    "$value": 24,
    "$description": "Spacing token — 192px.",
    "$extensions": {
      "carbon.layout": {
        "converter": "miniUnits"
      }
    }
  }
}
```

This will add `$spacing-14: 12rem !default;` to `_spacing.scss` and
`export const spacing14 = '12rem';` to `layout-tokens.js`.

### Adding a token in a new category

If your token does not match any existing prefix (e.g. `gap-*`), you need to
also update the Style Dictionary pipeline:

1. Add your token to `layout.json` with the appropriate name prefix.
2. Add a new format function in
   [`style-dictionary/formats/scss-layout.js`](../style-dictionary/formats/scss-layout.js):
   ```js
   function formatGap({ dictionary }) {
     const tokens = tokensForGroup(dictionary, 'gap-');
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

1. Add an entry to `layout.json` following the examples above.
2. Choose the right name prefix (see table above).
3. Choose the right `$value` and `converter`:
   - Grid-aligned value? Use `converter: "miniUnits"` and pass the step count.
   - Explicit pixel value? Use `converter: "rem"` and pass the px number.
   - Non-rem unit (e.g. `vw`, `px`)? Omit extensions and write the full CSS
     value directly in `$value`.
4. Run the build to regenerate SCSS and JS outputs:
   ```bash
   cd packages/layout
   yarn build:dtcg
   ```
5. Verify the resolved value in `js/generated/layout-tokens.js` and the correct
   `scss/generated/_*.scss` file.

---

## Build pipeline

```
src/dtcg/layout.json          ← you edit this
        │
        ▼  yarn build:dtcg
        │  (style-dictionary/sd.config.js)
        │
        ├── scss/generated/_layout-tokens.scss   (Sass variables + maps)
        └── js/generated/layout-tokens.{js,d.ts} (ES module + types)
                │
                ▼
        src/index.ts  re-exports all tokens
```

The SD pipeline in
[`style-dictionary/sd.config.js`](../style-dictionary/sd.config.js) reads the
`carbon.layout.converter` extension and resolves `$value` before emitting. The
generated files always contain **resolved CSS values** regardless of how the
token was authored.
