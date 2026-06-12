# Carbon Design Tokens (DTCG Format)

This directory contains Carbon Design System tokens in the
[Design Tokens Community Group (DTCG)](https://tr.designtokens.org/format/)
format.

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

All tokens follow the DTCG specification with the following structure:

```json
{
  "$schema": "https://tr.designtokens.org/format/",
  "$description": "Theme description",
  "color": {
    "token-name": {
      "$type": "color",
      "$value": "#ffffff",
      "$description": "Token description"
    }
  }
}
```

## Theme Tokens

Theme files (`white.json`, `g10.json`, `g90.json`, `g100.json`) contain:

- **Color tokens**: Background, layer, field, border, text, link, icon, support
  colors
- **Semantic tokens**: Focus, interactive, highlight, overlay, skeleton
- **AI tokens**: AI-specific colors for popover, chat, and skeleton states

### Token Categories

- `color.background.*` - Page and container backgrounds
- `color.layer.*` - Layered UI element backgrounds
- `color.field.*` - Form field backgrounds
- `color.border.*` - Border colors for various contexts
- `color.text.*` - Text colors for different hierarchies
- `color.link.*` - Link colors and states
- `color.icon.*` - Icon colors
- `color.support.*` - Status and feedback colors
- `color.focus` - Focus indicator colors
- `color.skeleton.*` - Loading skeleton colors

## Component Tokens

Component token files contain theme-specific overrides for individual
components.

### Button Tokens (`components/button.json`)

Button-specific colors that vary per theme:

- Primary, secondary, tertiary button colors
- Danger button variants
- Hover, active, and disabled states

### Tag Tokens (`components/tag.json`)

Tag colors for different semantic meanings:

- Red, blue, green, gray variants
- Background, text, and hover colors per variant

### Notification Tokens (`components/notification.json`)

Notification-specific colors:

- Error, success, info, warning backgrounds
- Action button colors for notifications

## Using These Tokens

### In Build Process

The build process reads these JSON files and generates:

1. Sass variables and maps
2. JavaScript/TypeScript exports
3. CSS Custom Properties

### Example Build Integration

```javascript
// tasks/build.js
const whiteTheme = require('./src/dtcg/white.json');
const buttonTokens = require('./src/dtcg/components/button.json');

// Convert DTCG to internal format
const theme = convertDTCGToTheme(whiteTheme);
const components = convertDTCGComponents(buttonTokens);

// Generate Sass
generateSass(theme, components);
```

### Token Extensions

Component tokens use the `$extensions` field to specify theme-specific values:

```json
{
  "button": {
    "primary": {
      "$type": "color",
      "$description": "Primary button background",
      "$extensions": {
        "carbon.themes": {
          "white": "#0f62fe",
          "g10": "#0f62fe",
          "g90": "#0f62fe",
          "g100": "#0f62fe"
        }
      }
    }
  }
}
```

## Validation

Tokens can be validated against the DTCG JSON Schema:

```bash
# Using a JSON Schema validator
ajv validate -s https://tr.designtokens.org/format/schema.json -d white.json
```

## Migration from JavaScript

These JSON files replace the JavaScript theme files:

| Old (JS)                                  | New (JSON)                              |
| ----------------------------------------- | --------------------------------------- |
| `src/white.js`                            | `src/dtcg/white.json`                   |
| `src/g10.js`                              | `src/dtcg/g10.json`                     |
| `src/g90.js`                              | `src/dtcg/g90.json`                     |
| `src/g100.js`                             | `src/dtcg/g100.json`                    |
| `component-tokens/button/tokens.js`       | `src/dtcg/components/button.json`       |
| `component-tokens/tag/tokens.js`          | `src/dtcg/components/tag.json`          |
| `component-tokens/notification/tokens.js` | `src/dtcg/components/notification.json` |

## Benefits of DTCG Format

1. **Industry Standard**: Compatible with design tools and token platforms
2. **Tool Interoperability**: Works with Style Dictionary, Theo, Figma, etc.
3. **Rich Metadata**: Descriptions, extensions, and semantic information
4. **AI-Friendly**: Self-documenting format for AI assistants
5. **Validation**: JSON Schema validation available
6. **Version Control**: Easy to diff and track changes

## Contributing

When adding or modifying tokens:

1. Follow the DTCG specification
2. Include meaningful `$description` fields
3. Use appropriate `$type` values (color, dimension, etc.)
4. Add theme-specific values in `$extensions` for component tokens
5. Validate against the DTCG schema
6. Update this README if adding new token categories

## Resources

- [DTCG Specification](https://tr.designtokens.org/format/)
- [Carbon Design System](https://carbondesignsystem.com/)
- [Design Tokens Community Group](https://www.w3.org/community/design-tokens/)
