# Carbon Design Tokens (DTCG Format)

This directory contains Carbon Design System tokens in the
[Design Tokens Community Group (DTCG)](https://tr.designtokens.org/format/)
format. All Carbon themes and component tokens have been migrated to this
industry-standard format.

## Structure

```
dtcg/
├── themes.json            # All four themes in one file (white, g10, g90, g100)
├── color-palette.json     # Color palette aliases (generated from @carbon/colors)
└── components/
    ├── button.json        # Button component tokens
    ├── tag.json           # Tag component tokens
    ├── notification.json  # Notification component tokens
    ├── status.json        # Status indicator tokens
    └── content-switcher.json  # Content switcher tokens
```

## Token categories in each theme file

`themes.json` is organised into top-level groups. When searching for a token,
start with the group that matches the first segment of its name:

| Top-level key | Token name prefix examples                                  |
| ------------- | ----------------------------------------------------------- |
| `ai`          | `ai-aura-*`, `ai-popover-*`, `ai-skeleton-*`                |
| `background`  | `background`, `background-active`, `background-hover`       |
| `border`      | `border-subtle-*`, `border-strong-*`, `border-tile-*`       |
| `button`      | _(component tokens — see `components/button.json` instead)_ |
| `field`       | `field-01`, `field-02`, `field-hover-01`                    |
| `focus`       | `focus`, `focus-inset`, `focus-inverse`                     |
| `icon`        | `icon-primary`, `icon-on-color`, `icon-disabled`            |
| `layer`       | `layer-01`, `layer-active-01`, `layer-hover-01`             |
| `link`        | `link-primary`, `link-visited`, `link-inverse`              |
| `overlay`     | `overlay`                                                   |
| `skeleton`    | `skeleton-background`, `skeleton-element`                   |
| `support`     | `support-error`, `support-warning`, `support-success`       |
| `text`        | `text-primary`, `text-on-color`, `text-disabled`            |

> **Note:** Component tokens (`button`, `tag`, etc.) live in
> `components/<name>.json`, **not** in `themes.json`.

## Nested key → flat token name mapping

Token names in Carbon use a hyphenated convention (e.g. `border-subtle-02`,
`text-on-color-disabled`). In the DTCG JSON files these are represented as
**nested objects**, where each hyphen-separated segment becomes a JSON key
level:

| Flat token name          | JSON path                            |
| ------------------------ | ------------------------------------ |
| `border-subtle-02`       | `border` → `subtle` → `02`           |
| `text-on-color-disabled` | `text` → `on-color` → `disabled`     |
| `layer-accent-active-03` | `layer` → `accent` → `active` → `03` |

> **Tip for agents:** Do not `grep` for the full hyphenated name — it will not
> match. Instead grep for the last segment (`"02"`, `"disabled"`) and navigate
> up the JSON hierarchy to confirm the full path, or read the surrounding
> context to resolve ambiguity when short keys like `"01"` or `"02"` appear in
> multiple token groups.

## Contextual layer tokens (`$layer-*` without numbers)

In component styles (e.g. `$layer-accent`, `$layer-hover`, `$field`,
`$border-subtle`), you will often see unnumbered tokens used. These are
**dynamic layer-set tokens** defined in
`packages/styles/scss/layer/_layer-sets.scss`.

In DTCG JSON, tokens only exist as explicit numbered levels (`01`, `02`, `03`):

- `layer.01` / `layer.02` / `layer.03`
- `layer.accent.01` / `layer.accent.02` / `layer.accent.03`
- `layer.accent.active.01` / `layer.accent.active.02` / `layer.accent.active.03`

At runtime or inside a `<Layer>` component context, Carbon automatically
resolves the unnumbered token (e.g. `$layer-accent`) to its corresponding
numbered tier (`01`, `02`, or `03`) based on container nesting depth.

## Dual-role nodes (tokens that are also groups)

Some tokens are simultaneously a value **and** a group of related tokens. For
example, `background` has its own per-theme value but also has children like
`background-active` and `background-hover`. In `themes.json` these look like:

```json
"background": {
  "$type": "color",
  "$description": "…",
  "$extensions": {
    "carbon.themes": {
      "white": "{white.default}", "g10": "{gray.10}",
      "g90":   "{gray.90}",       "g100": "{gray.100}"
    }
  },
  "active": {
    "$type": "color",
    "$extensions": { "carbon.themes": { "white": { "value": "{gray.50}", "alpha": 0.5 }, … } }
  },
  "hover": {
    "$type": "color",
    "$extensions": { "carbon.themes": { "white": { "value": "{gray.50}", "alpha": 0.12 }, … } }
  }
}
```

The flat names generated are `background`, `background-active`,
`background-hover` — all siblings in the output even though they are
parent/child in the source JSON.

> **Tip for agents:** If you read a node and it has both a
> `$extensions["carbon.themes"]` entry and non-`$` children, both the node
> itself **and** every child are valid tokens. Do not assume a node with
> children is only a group.

## `carbon.themes` value aliases and `color-palette.json`

The `value` field inside each `carbon.themes` entry uses curly-brace alias
syntax referencing the color palette, e.g. `"{blue.60}"` or `"{gray.20}"`. These
references are resolved during the build against
`packages/themes/src/dtcg/color-palette.json`, which contains the full Carbon
color ramp (`gray.10` … `gray.100`, `blue.10` … `blue.100`, etc.) with their hex
values. If you need the actual hex for an alias, look it up in that file.

## Token Format

All tokens follow the DTCG specification with a structured format using specific
keys:

### DTCG Format Keys

#### Required Keys

- **`$schema`** - References the DTCG specification version. Always set to
  `"https://tr.designtokens.org/format/"` at the root level.

- **`$type`** - Defines the token type (e.g., `"color"`, `"dimension"`,
  `"fontFamily"`). This enables proper validation and tooling support.

- **`$value`** - The actual token value. Can be:

  - A reference to another token: `"{blue.60}"`, `"{gray.80}"`
  - References use curly brace syntax and resolve during build

- **`$description`** - Human-readable description explaining the token's purpose
  and usage. Should be clear and actionable for designers and developers.

#### Optional Keys

- **`$extensions`** - Custom metadata and vendor-specific information. Carbon
  uses two namespaces — see the dedicated sections below for full details.

## Semi-transparent tokens — the `alpha` field

Some tokens are a base color with an opacity applied. In `themes.json` the
opacity is expressed as an `alpha` field co-located with `value` inside the
per-theme entry:

```json
"background": {
  "hover": {
    "$type": "color",
    "$description": "Background color for hover state.",
    "$extensions": {
      "carbon.themes": {
        "white": { "value": "{gray.50}", "alpha": 0.12 },
        "g10":   { "value": "{gray.50}", "alpha": 0.12 },
        "g90":   { "value": "{gray.50}", "alpha": 0.16 },
        "g100":  { "value": "{gray.50}", "alpha": 0.16 }
      }
    }
  }
}
```

During the build the `carbon/alpha-modifier` Style Dictionary transform resolves
`{gray.50}` to its hex (`#8d8d8d`) and then emits `rgba(141, 141, 141, 0.12)`.

> **Reading the source:** When a `carbon.themes` entry is an object, the `value`
> field alone does **not** tell you the final color. The real output is
> `rgba(<palette hex at value>, <alpha>)`. Check `color-palette.json` for the
> hex, then apply `alpha` mentally.

> **`alpha: 0`** means fully transparent (`rgba(…, 0)`). Used for gradient "fade
> to transparent" endpoints (e.g. `ai-aura-end`).

> **Note for component token files:** `components/*.json` still use the legacy
> `$extensions["org.carbon"].alphaModifiers` map (plural, keyed by theme) rather
> than the co-located `alpha` field. The build preprocessor accepts both forms.

## `$extensions["carbon.themes"]` — the unified per-theme format

Both theme tokens (`themes.json`) and component tokens (`components/*.json`)
store per-theme values under the same `$extensions["carbon.themes"]` key. Each
entry for a theme is either:

- **A bare string** (palette alias or hex) when there is no alpha modifier:
  ```json
  "white": "{gray.10}"
  ```
- **An object `{ value, alpha }`** when an opacity modifier is needed:
  ```json
  "white": { "value": "{gray.50}", "alpha": 0.12 }
  ```

Example token from `themes.json`:

```json
"background": {
  "hover": {
    "$type": "color",
    "$description": "Background color for hover state.",
    "$extensions": {
      "carbon.themes": {
        "white": { "value": "{gray.50}", "alpha": 0.12 },
        "g10":   { "value": "{gray.50}", "alpha": 0.12 },
        "g90":   { "value": "{gray.50}", "alpha": 0.16 },
        "g100":  { "value": "{gray.50}", "alpha": 0.16 }
      }
    }
  }
}
```

The `carbon/component-tokens` preprocessor understands both entry shapes and
expands them into per-theme leaf tokens before Style Dictionary processes them.

### Comparison: theme tokens vs. component tokens

|               | Theme token (`themes.json`)                                           | Component token (`components/button.json`)                                 |
| ------------- | --------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| File scope    | All four themes                                                       | All four themes                                                            |
| Value field   | `$extensions["carbon.themes"]["<theme>"]` (string or `{value,alpha}`) | `$extensions["carbon.themes"]["<theme>"]` (string)                         |
| Alpha opacity | Co-located: `{ "value": "…", "alpha": 0.12 }`                         | Separate: `$extensions["org.carbon"].alphaModifiers.<theme>` (note plural) |
| Grepping      | Navigate nested keys                                                  | Same nesting rules apply                                                   |

> **Note:** Component files still use the legacy `org.carbon.alphaModifiers` map
> for backwards compatibility. Both forms are accepted by the preprocessor.

> **Reading theme token values:** Navigate to the nested key in `themes.json`,
> then read the value for the theme you care about from `carbon.themes`.

## Theme Tokens

All four Carbon themes are consolidated into `themes.json`:

- **white** — Light theme, high contrast for optimal readability
- **g10** — Gray 10 light theme, subtle contrast for data-dense interfaces
- **g90** — Gray 90 dark theme
- **g100** — Gray 100 dark theme, high contrast

The file contains 250+ tokens organised into categories:

- **Color tokens**: Background, layer, field, border, text, link, icon, support
  colors
- **Semantic tokens**: Focus, interactive, highlight, overlay, skeleton
- **AI tokens**: AI-specific colors for popover, chat, and skeleton states

## Using These Tokens

### Build Process

The DTCG tokens are automatically processed during the build:

```bash
cd packages/themes
yarn build
```

This generates SCSS files in `scss/generated/`:

- `_themes.scss` - All four theme token maps
- `_button-tokens.scss` - Button component tokens
- `_tag-tokens.scss` - Tag component tokens
- `_notification-tokens.scss` - Notification component tokens
- `_status-tokens.scss` - Status indicator tokens
- `_content-switcher-tokens.scss` - Content switcher tokens

These generated files are automatically forwarded by:

- `scss/_themes.scss` - Forwards theme tokens
- `scss/_component-tokens.scss` - Forwards component tokens

## Validation

All DTCG token files are validated against the official DTCG JSON Schema during
the build process. The validation ensures:

- Correct `$schema` reference
- Valid `$type` values (color, dimension, etc.)
- Proper token structure
- Required fields are present

Manual validation can be performed using any JSON Schema validator:

```bash
# Using ajv-cli
ajv validate -s https://tr.designtokens.org/format/schema.json -d themes.json
```

## Contributing

When adding or modifying tokens:

1. **Follow the DTCG specification** - Ensure all tokens conform to the official
   spec
2. **Include meaningful descriptions** - Every token should have a clear
   `$description`
3. **Use appropriate types** - Set correct `$type` values (color, dimension,
   etc.)
4. **Add theme-specific values** - Edit `themes.json` for theme tokens; use
   `$extensions["carbon.themes"]` in `components/<name>.json` for component
   tokens
5. **Validate your changes** - Run `yarn build` to validate against DTCG schema
6. **Test generated output** - Verify SCSS generation works correctly
7. **Update documentation** - Update this README if adding new token categories
   or components

### Adding a New Component Token File

1. Create `src/dtcg/components/your-component.json`
2. Follow the structure of existing component token files
3. Use `$extensions.carbon.themes` for theme-specific values
4. Add the component to the build process in `tasks/build.js`
5. Update this README to document the new component tokens

## Resources

- [DTCG Specification](https://tr.designtokens.org/format/) - Official Design
  Tokens Community Group format specification
- [DTCG JSON Schema](https://tr.designtokens.org/format/schema.json) - JSON
  Schema for validation
- [Design Tokens Community Group](https://www.w3.org/community/design-tokens/) -
  W3C Community Group
