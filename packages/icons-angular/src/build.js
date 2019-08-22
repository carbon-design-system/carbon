/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const icons = require('@carbon/icons/build-info.json');
const { toString } = require('@carbon/icon-helpers');
const { reporter } = require('@carbon/cli-reporter');
const fs = require('fs-extra');
const { dirname } = require('path');
const { param } = require('change-case');
// const ngc = require('@angular/compiler-cli/src/main');

// file templates
const {
  componentTemplate,
  rootBuildBazel,
  publicApi,
  rootPublicApi,
  iconBuildBazel,
} = require('./templates');
const { storyTemplate } = require('./story-templates');

// local utilities
const clean = require('./clean');
const paths = require('./paths');

const reformatIcons = () => {
  let iconMap = new Map();
  for (const icon of icons) {
    /**
     * index.js is generally the implied default import for a path
     * ex: `import { Foo } from '@bar/foo';` would try to import `Foo` from
     * `@bar/foo/index.js`.
     * We use this to export the values from our `public-api.ts` file,
     * however `@carbon/icons` uses this for 'glyph' size icons.
     * This block swaps that for a `glyph.ts` which is more useful.
     */
    if (icon.outputOptions.file.endsWith('index.js')) {
      icon.outputOptions.file = icon.outputOptions.file.replace(
        'index.js',
        'glyph.ts'
      );
    }

    // set the correct output options
    icon.outputOptions.file = icon.outputOptions.file
      .replace('es', 'ts')
      .replace('.js', '.ts');

    // the namespace consists of 1 or more values, seperated by a `/`
    // effectivly, the icon path without the root directory (`ts`) or output filename
    icon.namespace = dirname(icon.outputOptions.file.replace('ts/', ''));

    // add our modified icon descriptor to the output map by namespace
    if (iconMap.has(icon.namespace)) {
      iconMap.get(icon.namespace).push(icon);
    } else {
      iconMap.set(icon.namespace, [icon]);
    }
  }
  return iconMap;
};

async function generateComponents(iconMap) {
  for (const [namespace, icons] of iconMap) {
    // generate base icon files
    for (const icon of icons) {
      const className = icon.moduleName;
      const selectorName = param(icon.moduleName);
      const rawSvg = toString(icon.descriptor);
      const outputPath = icon.outputOptions.file;
      // try to write out the component
      try {
        await fs.ensureDir(dirname(outputPath));
        await fs.writeFile(
          outputPath,
          componentTemplate(
            selectorName,
            className,
            rawSvg,
            icon.descriptor.attrs
          )
        );
      } catch (err) {
        reporter.error(err);
      }
    }

    // write out the public api for all the icons in the module
    await fs.writeFile(`ts/${namespace}/public-api.ts`, publicApi(icons));
    // export everything from public-api
    await fs.writeFile(
      `ts/${namespace}/index.ts`,
      "export * from './public-api'"
    );
    // write the bazel build file for the icon
    await fs.writeFile(
      `ts/${namespace}/BUILD.bazel`,
      iconBuildBazel(namespace)
    );
  }

  // get all the namespaces to build the import definitions
  const namespaces = Array.from(iconMap.keys());
  await fs.writeFile('ts/BUILD.bazel', rootBuildBazel(namespaces));
  await fs.writeFile('ts/public-api.ts', rootPublicApi(namespaces));
  await fs.writeFile('ts/index.ts', "export * from './public-api'");
}

async function buildExamples(iconMap) {
  await fs.copy(paths.LIB, paths.EXAMPLES_LIB);
  let filesToWrite = [];
  for (const [namespace, icons] of iconMap) {
    filesToWrite.push(
      fs.writeFile(
        `${paths.STORIES}/${param(namespace)}.stories.ts`,
        storyTemplate(param(namespace), icons)
      )
    );
  }
  await Promise.all(filesToWrite);
}

async function build() {
  reporter.log('Cleaning build dirs...');
  try {
    // ensure we're starting in a clean build environment
    await clean();
    // ensure our build directories are created
    await Promise.all([fs.ensureDir(paths.STORIES), fs.ensureDir(paths.TS)]);
  } catch (err) {
    reporter.error(err);
  }

  const iconMap = reformatIcons();

  reporter.log('Generating source components...');
  await generateComponents(iconMap);

  // TODO: remove in v11
  // legacy steps
  // reporter.log('Compiling and generating modules...');
  // run the angular compiler over everything
  // ngc.main(['-p', './config/tsconfig-aot.json']);
  // end legacy steps

  // TODO: keep in v11
  // build the storybook examples
  reporter.log('Generating storybook examples...');
  buildExamples(iconMap);
}

module.exports = build;
