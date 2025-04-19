# @carbon/upgrade

> A tool for upgrading Carbon versions

## Getting started

To install `@carbon/upgrade` in your project, you will need to run the following
command using [npm](https://www.npmjs.com/):

```bash
npm install -S @carbon/upgrade
```

If you prefer [Yarn](https://yarnpkg.com/en/), use the following command
instead:

```bash
yarn add @carbon/upgrade
```

## Usage

You can install `@carbon/upgrade` in your project, or use a tool like
[`npx`](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b)
by running the following command in your project:

```bash
npx @carbon/upgrade
```

Below is a full output of the options and commands available:

```bash
Usage: @carbon/upgrade [options]

Commands:
  @carbon/upgrade upgrade                   upgrade your project       [default]
  @carbon/upgrade migrate <migration>       run a Carbon migration on your
  [paths...]                                source files
  @carbon/upgrade migrate list              list all available migrations

Options:
      --help     Show help                                             [boolean]
      --version  Show version number                                   [boolean]
      --force    force execution if the cli encounters an error while doing
                 safety checks                        [boolean] [default: false]
  -w, --write    update the files with changes found by running the migration
                                                      [boolean] [default: false]
  -v, --verbose  optionally include additional logs, useful for debugging
                                                      [boolean] [default: false]
```

### Migrations

Included within the CLI are a number of migrations available to you to be ran on
your project's source files.

Migrations are automated scripts (codemods) ran using the
[jscodeshift](https://github.com/facebook/jscodeshift) runner, that will apply
intelligent transformations to your code.

These migrations range from simple automations like a find and replace of import
statements, to more sophisticated migrations that rewrite component prop usage,
configuration, and set up. The source of these migrations can be viewed within
the
[transforms folder](https://github.com/carbon-design-system/carbon/tree/main/packages/upgrade/transforms).
Each is tested against a series of test fixtures to ensure transforms are
predictable and consistently provide the intended output.

#### Output formatting

The output of a codemod may not match your codebase's formatting style. It is
recommended to always run the result of a codemod through an autoformatter like
[Prettier](https://prettier.io/).

### Feature Flag Codemods

The following codemods help you adopt changes introduced by feature flags in
preparation for Carbon v12. Each codemod transforms your code to work with
specific feature flags enabled.

### Enable v12 tile default icons

Enables default icons for Tile components.

**Usage:**

```bash
npx @carbon/upgrade migrate enable-v12-tile-default-icons --write
```

This codemod wraps Tile components with
`<FeatureFlags enableV12TileDefaultIcons>` and adds the necessary imports.

**Example:**

```jsx
// Before
import { Tile } from '@carbon/react';

<Tile>Content</Tile>;

// After
import { Tile } from '@carbon/react';
import { FeatureFlags } from '@carbon/feature-flags';

<FeatureFlags enableV12TileDefaultIcons>
  <Tile>Content</Tile>
</FeatureFlags>;
```

### Enable v12 overflowmenu

Updates OverflowMenu to use the new Menu-based implementation.

**Usage:**

The OverflowMenu codemod provides two different options:

1. With FeatureFlags wrapping (default):

```bash
npx @carbon/upgrade migrate enable-v12-overflowmenu --write
```

2. API migration only (for apps already using FeatureFlags at the root):

```bash
npx @carbon/upgrade migrate enable-v12-overflowmenu --wrap=false --write
```

This codemod:

- Converts `OverflowMenuItem` to `MenuItem` components
- Maps props: `itemText` → `label`, `isDelete` → `kind="danger"`
- Adds `MenuItemDivider` for items with `hasDivider`
- Optionally wraps with `<FeatureFlags enableV12Overflowmenu>` based on your
  needs

**Example with wrapping:**

```jsx
// Before
<OverflowMenu>
  <OverflowMenuItem itemText="Option 1" />
  <OverflowMenuItem itemText="Delete" isDelete />
</OverflowMenu>

// After
<FeatureFlags enableV12Overflowmenu>
  <OverflowMenu>
    <MenuItem label="Option 1" />
    <MenuItem label="Delete" kind="danger" />
  </OverflowMenu>
</FeatureFlags>
```

**Example without wrapping (API changes only):**

```jsx
// Before
<OverflowMenu>
  <OverflowMenuItem itemText="Option 1" />
  <OverflowMenuItem itemText="Delete" isDelete />
</OverflowMenu>

// After
<OverflowMenu>
  <MenuItem label="Option 1" />
  <MenuItem label="Delete" kind="danger" />
</OverflowMenu>
```

### Enable v12 tile radio icons

Enables default icons for RadioTile components.

**Usage:**

```bash
npx @carbon/upgrade migrate enable-v12-tile-radio-icons --write
```

This codemod wraps RadioTile components and TileGroups containing RadioTiles
with `<FeatureFlags enableV12TileRadioIcons>`.

**Example:**

```jsx
// Before
<RadioTile value="option1">Option 1</RadioTile>

// After
<FeatureFlags enableV12TileRadioIcons>
  <RadioTile value="option1">Option 1</RadioTile>
</FeatureFlags>
```

### Enable v12 structured list visible icons

Makes icon components within StructuredList always visible.

**Usage:**

```bash
npx @carbon/upgrade migrate enable-v12-structured-list-visible-icons --write
```

This codemod:

- Adds the `selection` attribute to StructuredListRow components
- Removes custom CheckmarkFilled icons from cells
- Works with both direct components and those generated by functions

**Example:**

```jsx
// Before
<StructuredListWrapper selection>
  <StructuredListRow>
    <StructuredListCell>Data</StructuredListCell>
    <StructuredListCell>
      {isSelected && <CheckmarkFilled />}
    </StructuredListCell>
  </StructuredListRow>
</StructuredListWrapper>

// After
<StructuredListWrapper selection>
  <StructuredListRow selection>
    <StructuredListCell>Data</StructuredListCell>
  </StructuredListRow>
</StructuredListWrapper>
```

## Other V12 Codemods

### Light to layer

Replaces deprecated `light` prop with `Layer` component wrapping.

**Usage:**

```bash
npx @carbon/upgrade migrate refactor-light-to-layer --write
```

This codemod:

- Finds all components with the `light` prop
- Removes the `light` prop
- Wraps the component with `<Layer>`
- Adds the necessary Layer import

**Example:**

```jsx
// Before
import { Button } from '@carbon/react';

<Button light>Click me</Button>;

// After
import { Button, Layer } from '@carbon/react';

<Layer>
  <Button>Click me</Button>
</Layer>;
```

### Slug to decorator

Changes all occurrences of the `slug` prop to `decorator`.

**Usage:**

```bash
npx @carbon/upgrade migrate slug-prop-to-decorator-prop --write
```

**Example:**

```jsx
// Before
<Component slug="my-identifier">Content</Component>

// After
<Component decorator="my-identifier">Content</Component>
```

### FeatureFlag deprecate flags prop

Updates FeatureFlags component to use individual boolean props instead of the
`flags` object.

**Usage:**

```bash
npx @carbon/upgrade migrate featureflag-deprecate-flags-prop --write
```

**Example:**

```jsx
// Before
<FeatureFlags flags={{ 'enable-v12-tile-default-icons': true }}>
  <App />
</FeatureFlags>

// After
<FeatureFlags enableV12TileDefaultIcons>
  <App />
</FeatureFlags>
```

## TypeScript Support

All codemods support TypeScript files (`.ts` and `.tsx`) in addition to
JavaScript files (`.js` and `.jsx`).

## 🙌 Contributing

If you have ideas on how we could make your migration experience easier, please
reach out by
[opening a new discussion](https://github.com/carbon-design-system/carbon/discussions/new).

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our [Contributing Guide](/.github/CONTRIBUTING.md)! 👀

## 📝 License

Licensed under the [Apache 2.0 License](/LICENSE).

## <picture><source height="20" width="20" media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/ibm-telemetry/telemetry-js/main/docs/images/ibm-telemetry-dark.svg"><source height="20" width="20" media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/ibm-telemetry/telemetry-js/main/docs/images/ibm-telemetry-light.svg"><img height="20" width="20" alt="IBM Telemetry" src="https://raw.githubusercontent.com/ibm-telemetry/telemetry-js/main/docs/images/ibm-telemetry-light.svg"></picture> IBM Telemetry

This package uses IBM Telemetry to collect de-identified and anonymized metrics
data. By installing this package as a dependency you are agreeing to telemetry
collection. To opt out, see
[Opting out of IBM Telemetry data collection](https://github.com/ibm-telemetry/telemetry-js/tree/main#opting-out-of-ibm-telemetry-data-collection).
For more information on the data being collected, please see the
[IBM Telemetry documentation](https://github.com/ibm-telemetry/telemetry-js/tree/main#ibm-telemetry-collection-basics).
