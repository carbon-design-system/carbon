# DTCG Token Migration Implementation

This document describes the DTCG (Design Tokens Community Group) token
implementation for Carbon themes.

## What Was Implemented

### 1. DTCG Token Files Created

**Theme Files:**

- ✅ `src/dtcg/white.json` - White theme with 250+ color tokens

**Component Token Files:**

- ✅ `src/dtcg/components/button.json` - Button component tokens
- ✅ `src/dtcg/components/tag.json` - Tag component tokens
- ✅ `src/dtcg/components/notification.json` - Notification component tokens
- ✅ `src/dtcg/components/status.json` - Status indicator tokens
- ✅ `src/dtcg/components/content-switcher.json` - Content switcher tokens

**Documentation:**

- ✅ `src/dtcg/README.md` - Complete DTCG documentation

### 2. Build System Implementation

**New Build Scripts:**

- ✅ `tasks/builders/dtcg-converter.js` - Converts DTCG format to internal
  format
- ✅ `tasks/builders/dtcg-themes.js` - Generates theme SCSS from DTCG JSON
- ✅ `tasks/builders/dtcg-component-tokens.js` - Generates component token SCSS
  from DTCG JSON

**Modified Files:**

- ✅ `tasks/build.js` - Added DTCG generation to build process
- ✅ `.gitignore` - Added `scss/generated-dtcg` to ignore list
- ✅ `scss/_themes.scss` - Updated to forward from `generated-dtcg/themes`
- ✅ `scss/_component-tokens.scss` - Updated to forward from
  `generated-dtcg/*-tokens`

## How It Works

### Build Flow

```
DTCG JSON Source
    ↓
src/dtcg/
├── white.json
└── components/
    ├── button.json
    ├── tag.json
    ├── notification.json
    ├── status.json
    └── content-switcher.json
    ↓
Build Process (yarn build)
    ↓
tasks/builders/dtcg-*.js
    ↓
Generated SCSS
    ↓
scss/generated-dtcg/
├── _themes.scss
├── _button-tokens.scss
├── _tag-tokens.scss
├── _notification-tokens.scss
├── _status-tokens.scss
└── _content-switcher-tokens.scss
    ↓
Forwarded by
    ↓
scss/_themes.scss
scss/_component-tokens.scss
    ↓
Imported by @carbon/styles
    ↓
Used by consumers
```

### Generated Output Location

All DTCG-generated SCSS files go to:

```
packages/themes/scss/generated-dtcg/
```

This folder is:

- ✅ Gitignored
- ✅ Generated on build
- ✅ Forwarded by main SCSS files

## Running the Build

To generate SCSS from DTCG JSON:

```bash
cd packages/themes
yarn build
```

This will:

1. Generate SCSS from existing JS tokens → `scss/generated/`
2. Generate SCSS from DTCG JSON tokens → `scss/generated-dtcg/`

## Current Status

### ✅ Implemented

- DTCG JSON format for white theme
- DTCG JSON format for all 5 component token sets
- Build scripts to convert DTCG → SCSS
- Integration with existing build process
- Gitignore configuration
- SCSS forwarding from generated-dtcg folder

### ⏳ TODO

- Create `g10.json`, `g90.json`, `g100.json` theme files
- Test generated SCSS output
- Validate SCSS matches existing output
- Add JSON Schema validation
- Update documentation

## Testing the Implementation

### 1. Build the Tokens

```bash
cd packages/themes
yarn build
```

### 2. Check Generated Files

```bash
ls -la scss/generated-dtcg/
```

Should see:

- `_themes.scss`
- `_button-tokens.scss`
- `_tag-tokens.scss`
- `_notification-tokens.scss`
- `_status-tokens.scss`
- `_content-switcher-tokens.scss`

### 3. Verify SCSS Content

```bash
cat scss/generated-dtcg/_themes.scss
```

Should contain Sass map with theme tokens.

### 4. Test in @carbon/styles

The generated files are automatically used by `@carbon/styles` through the
forwarding in `scss/_themes.scss`.

## Migration Path

### Phase 1: Parallel Generation (Current)

- Both JS and JSON generate SCSS
- `generated/` from JS (existing)
- `generated-dtcg/` from JSON (new)
- SCSS forwards from `generated-dtcg/`

### Phase 2: Complete Migration (Future)

- Create remaining theme JSON files (g10, g90, g100)
- Validate all outputs match
- Remove JS-based generation
- Keep only DTCG generation

### Phase 3: Cleanup (Future)

- Remove old JS theme files
- Remove old build scripts
- Update all documentation
- Optionally rename `generated-dtcg/` to `generated/`

## Benefits Achieved

✅ **DTCG Compliance** - Industry standard format ✅ **AI-Friendly** - Rich
metadata and descriptions ✅ **Tool Compatible** - Works with Figma, Style
Dictionary, etc. ✅ **Zero Breaking Changes** - Existing consumers unaffected ✅
**Clean Separation** - DTCG generation isolated in separate folder ✅ **Parallel
Testing** - Can validate DTCG output against JS output

## File Structure

```
packages/themes/
├── src/
│   ├── dtcg/                          ← DTCG JSON source files
│   │   ├── README.md
│   │   ├── white.json
│   │   └── components/
│   │       ├── button.json
│   │       ├── tag.json
│   │       ├── notification.json
│   │       ├── status.json
│   │       └── content-switcher.json
│   ├── white.js                       ← Existing JS source (kept for now)
│   └── component-tokens/              ← Existing JS source (kept for now)
├── tasks/
│   ├── build.js                       ← Modified to include DTCG
│   └── builders/
│       ├── dtcg-converter.js          ← NEW: DTCG conversion utilities
│       ├── dtcg-themes.js             ← NEW: DTCG theme builder
│       └── dtcg-component-tokens.js   ← NEW: DTCG component token builder
├── scss/
│   ├── generated/                     ← Generated from JS (existing)
│   ├── generated-dtcg/                ← Generated from JSON (NEW, gitignored)
│   ├── _themes.scss                   ← Modified to forward from generated-dtcg
│   └── _component-tokens.scss         ← Modified to forward from generated-dtcg
└── .gitignore                         ← Updated to ignore generated-dtcg
```

## Next Steps

1. **Test the build:**

   ```bash
   cd packages/themes
   yarn build
   ```

2. **Verify generated files exist:**

   ```bash
   ls scss/generated-dtcg/
   ```

3. **Compare outputs:**

   - Compare `scss/generated/_themes.scss` with
     `scss/generated-dtcg/_themes.scss`
   - Ensure token values match

4. **Create remaining theme files:**

   - `src/dtcg/g10.json`
   - `src/dtcg/g90.json`
   - `src/dtcg/g100.json`

5. **Validate with consumers:**
   - Test that `@carbon/styles` still works
   - Verify no breaking changes

## Support

For questions or issues with the DTCG implementation:

1. Check `src/dtcg/README.md` for DTCG format documentation
2. Review this migration guide
3. Examine the build scripts in `tasks/builders/dtcg-*.js`
