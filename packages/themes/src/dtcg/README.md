# Carbon Design Tokens (DTCG Format)

This directory contains Carbon Design System tokens in the
[Design Tokens Community Group (DTCG)](https://tr.designtokens.org/format/)
format. All Carbon themes and component tokens have been migrated to this
industry-standard format.

## Structure

```
dtcg/
├── white.json              # White theme (light, high contrast)
├── g10.json               # Gray 10 theme (light)
├── g90.json               # Gray 90 theme (dark)
├── g100.json              # Gray 100 theme (dark, high contrast)
└── components/
    ├── button.json        # Button component tokens
    ├── tag.json           # Tag component tokens
    ├── notification.json  # Notification component tokens
    ├── status.json        # Status indicator tokens
    └── content-switcher.json  # Content switcher tokens
```

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
  uses this for:

  - **`carbon.themes`** - Theme-specific values for component tokens:
    ```json
    "$extensions": {
      "carbon.themes": {
        "white": "{blue.60}",
        "g10": "{blue.60}",
        "g90": "{blue.60}",
        "g100": "{blue.60}"
      }
    }
    ```
  - **`com.ibm.carbon`** - Carbon-specific metadata like alpha modifiers:
    ```json
    "$extensions": {
      "com.ibm.carbon": {
        "alphaModifier": 0.5,
        "color-scheme": "light"
      }
    }
    ```

### Example: Theme Token

```json
{
  "$schema": "https://tr.designtokens.org/format/",
  "$description": "White theme - Light theme with high contrast",
  "background": {
    "$type": "color",
    "$value": "{white.default}",
    "$description": "Default page background color. Use as the base surface for the entire application."
  },
  "background-hover": {
    "$type": "color",
    "$value": "{gray.50}",
    "$description": "Background color for hover state. Use when user hovers over interactive elements.",
    "$extensions": {
      "com.ibm.carbon": {
        "alphaModifier": 0.12
      }
    }
  }
}
```

### Example: Component Token

```json
{
  "$schema": "https://tr.designtokens.org/format/",
  "$description": "Button component color tokens",
  "button": {
    "primary": {
      "$type": "color",
      "$description": "Background color for primary buttons in default state.",
      "$extensions": {
        "carbon.themes": {
          "white": "{blue.60}",
          "g10": "{blue.60}",
          "g90": "{blue.60}",
          "g100": "{blue.60}"
        }
      }
    }
  }
}
```

## Theme Tokens

All four Carbon themes are available in DTCG format:

- **white.json** - White theme (light, high contrast)
- **g10.json** - Gray 10 theme (light)
- **g90.json** - Gray 90 theme (dark)
- **g100.json** - Gray 100 theme (dark, high contrast)

Each theme file contains 250+ tokens organized into categories:

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
ajv validate -s https://tr.designtokens.org/format/schema.json -d white.json
```

## Contributing

When adding or modifying tokens:

1. **Follow the DTCG specification** - Ensure all tokens conform to the official
   spec
2. **Include meaningful descriptions** - Every token should have a clear
   `$description`
3. **Use appropriate types** - Set correct `$type` values (color, dimension,
   etc.)
4. **Add theme-specific values** - Use `$extensions.carbon.themes` for component
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
