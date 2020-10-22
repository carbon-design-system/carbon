## Building an Icon Library

<!-- prettier-ignore-start -->
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table of Contents

- [Introduction](#introduction)
- [Getting Started](#getting-started)
  - [Philosophy](#philosophy)
  - [Project structure](#project-structure)
    - [`package.json` scripts](#packagejson-scripts)
    - [Breaking down `tasks/build.js`](#breaking-down-tasksbuildjs)
    - [Understanding `@carbon/icon-helpers`](#understanding-carbonicon-helpers)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->
<!-- prettier-ignore-end -->

## Introduction

So you want to build an icon library for your favorite framework? That's
awesome! We're so happy to hear that 🎉 We hope that this guide can serve as a
reference to help get you up-and-running quickly so you can start using these
icons as quickly as possible.

However, before getting started, make sure that you have
[created an issue](https://github.com/IBM/carbon-elements/issues/new?labels=&template=feature_request.md)
on the Carbon Elements project and have received a green light from one of the
core contributors. This is in order to verify that the work is going to the
right place in the Carbon Elements ecosystem.

After you've received the green light, then you're ready to get started!

## Getting Started

The main package that exports all icon information is
[`@carbon/icons`](/packages/icons). This package contains all of the source SVG
assets, in addition to exporting the following assets:

- Optimized SVG assets from source files
- Icon descriptors that encode SVG information in JavaScript
- A `meta.json` file useful for individuals like yourself building an icon
  library!

If you're curious about `@carbon/icons` and want to learn more, definitely check
out our [Icon documentation](/docs/guides/icons.md)!

### Philosophy

At a high-level, each icon library should have the following design goals when
determining how to best architect their implementation:

- Given the size of the IBM Design Language icon set, each library should aim to
  support both direct imports and a tree-shakeable entrypoint
  - Direct path: `/es/icon-name/16.js`
  - Entrypoint: `/es/index.js`
  - In general, this means that we cannot support a generic
    `<Icon name="icon-name">` component given that we could not tree-shake
    `@carbon/icons` descriptors
  - A system could support `<Icon icon={descriptor} />`, however this would
    require a user to install two dependencies versus only your icon library
- Minimize the amount of runtime logic that has to be run. As a result, prefer
  generating markup statically from SVG data versus using the data at runtime to
  build up the SVG markup
- Verify that your `<svg>` containers have the right attributes by using the
  `@carbon/icon-helpers` package. This includes a helper called `getAttributes`
  that will provide the proper attributes to apply on the `<svg>` container
- Make sure that the import paths of your icons are consistent with the
  `@carbon/icons` package. This information is made available through
  `@carbon/icons/meta.json`
  - In other words, don't create ad-hoc direct import paths. We should try and
    stay consistent across packages

### Project structure

After following our [contribution guidelines](/.github/CONTRIBUTING.md), you
should have a local version of Carbon Elements on your own machine. In order to
add a new package to the project, you add a folder in the `packages` directory
and run `yarn init -y` to generate the `package.json` file. Make sure to edit
the `name` field in the `package.json` file and then run the following task:

```bash
yarn sync
```

This should populate your `package.json` with all the necessary information in
order to be published correctly.

Each icon library package ends up taking on the following folder structure when
everything is built:

```
icon-library-package-name
├── README.md
├── es              # Output directory for ESM
├── examples        # Examples directory for showing usage in projects
├── lib             # Output directory for CommonJS modules
├── package.json
├── src
├── tasks
│   └── build.js    # Build task for generating the icon library
└── umd             # Output directory for UMD modules
```

#### `package.json` scripts

Most icon libraries should have the following scripts available in their
`package.json`:

```json
{
  "...": "...",
  "scripts": {
    "build": "yarn clean && node tasks/build.js",
    "clean": "rimraf es lib umd"
  }
}
```

The `clean` task allows us to integrate with the global `yarn clean` command at
the workspace root. The `build` task should be run before a package is
published. In addition, exposing the `build` task will allow the workspace root
to build all application assets with `yarn build`.

#### Breaking down `tasks/build.js`

The `tasks/build.js` script structure is intentionally generic in order to allow
you to implement whatever logic is needed for your icon library. At a
high-level, the pattern for this file matches:

```js
'use strict';

const path = require('path');
const build = require('../src/build');

build({ cwd: path.resolve(__dirname, '../') }).catch((error) => {
  console.error(error);
});
```

The path to the `build` command is dependant on your implementation. The `build`
command itself should take on the following shape:

```js
'use strict';

// Reporter for logging information to the console
// Useful for `reporter.info`, `reporter.success`, `reporter.error`, etc.
const { reporter } = require('@carbon/cli-reporter');

// Meta information from the icons build process
const meta = require('@carbon/icons/meta.json');

const fs = require('fs-extra');
const path = require('path');
const rollup = require('rollup');

async function build({ cwd }) {
  // Define our bundle entrypoints for ESM, CJS, and UMD
  const ESM_DIR = path.join(cwd, 'es');
  const BUNDLE_FORMATS = [
    {
      format: 'cjs',
      directory: 'lib',
    },
    {
      format: 'umd',
      directory: 'umd',
    },
  ];

  reporter.info('Building ESM and bundle sources...');

  // Use the fan-out pattern with Promise.all to try and make these tasks run in
  // parallel
  await Promise.all(
    // `meta` is a map that provides a hash of information about the current
    // icon to build
    meta.map(async (info) => {
      // Typically, implementations will have a way to create a source module
      // from a source file and use that to write to the ESM path.
      const source = createModuleFromInfo(info);
      const jsFilepath = path.join(cwd, info.outputOptions.file);

      await fs.ensureDir(path.dirname(jsFilepath));
      await fs.writeFile(jsFilepath, source);

      // Afterwards, use BUNDLE_FORMATS and rollup to compile the ESM module to
      // CJS and UMD
      await Promise.all(
        BUNDLE_FORMATS.map(async ({ format, directory }) => {
          const bundle = await rollup({
            input: jsFilepath,
            external: ['@carbon/icon-helpers', 'prop-types', 'react'],
          });
          const outputOptions = {
            format,
            file: jsFilepath.replace(/\/es\//, `/${directory}/`),
          };
          if (format === 'umd') {
            outputOptions.name = info.moduleName;
            outputOptions.globals = {
              '@carbon/icon-helpers': 'CarbonIconHelpers',
            };
          }
          await bundle.write(outputOptions);
        })
      );
    })
  );

  // Afterwards, you should try and construct an entrypoint of all icons for
  // your library under `es/index.js`. It's important that this entrypoint is
  // tree-shakeable given the size of our library
  reporter.info('Building ESM and bundle entrypoints...');

  // You can then use `BUNDLE_FORMATS` again to generate CJS and UMD entrypoints

  // After constructing all the necessary module files, feel free to use this to
  // generate example information in the `examples` directory

  // And then we're all done!
  reporter.success('Done! 🎉');
}

module.exports = build;
```

#### Understanding `@carbon/icon-helpers`

The [`@carbon/icon-helpers`](/packages/icon-helpers) package provides a variety
of methods that help with converting icon descriptors from the `@carbon/icons`
package into DOM nodes or strings, in addition to getting the correct attributes
for the overall `<svg>` container.

You can import this helper from `@carbon/icon-helpers` by including the
following in your icon module source:

```
import { getAttributes } from '@carbon/icon-helpers';
```

At a high-level, `getAttributes` helps with setting a variety of attributes for
accessibility, like `aria-label`, in addition to browser quirks in IE11, like
the `focusable` attribute. Feel free to re-implement this logic if you feel like
it would be better suited embedded in your icon library.
