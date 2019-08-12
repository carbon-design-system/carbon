/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';
// Grabs and formats input, sends output and any errors
const { reporter } = require('@carbon/cli-reporter');
// Essentially all the information about an icon: name, size, format, attribs...
const meta = require('@carbon/icons/build-info.json');
// Extra non-standard goodies and promise support to FS
const fs = require('fs-extra');
// Has various helper methods for working with paths
const path = require('path');
const { rollup } = require('rollup');

/**
 * Used when mapping over elements, attributes, or "content" objects.
 * Returns createElement functions with the arguments passed in
 *
 * @param { any } descriptor - keys on an icon in build-info.json elem, attributes, content
 */
function toString(descriptor) {
  const { elem, attrs = {}, content = [] } = descriptor;
  // if "content" wasn't passed in
  if (content.length === 0) {
    // return a stringified version of the createElement function with the
    // element and it's attributes passed in as arguments
    return `createElement('${elem}', { attrs: ${JSON.stringify(attrs)} })`;
  }
  // Otherwise return a stringified createElement function with element,
  // attributes AND icon "content" (elements, attributes, content (the actual paths))
  return `createElement('${elem}', { attrs: ${JSON.stringify(
    attrs
  )} }, [${content.map(toString).join(', ')}])`;
}

/**
 * Takes in SVG info and returns a stringified object that
 * we'll parse to create our component.
 *
 * @param {object} info - information about each SVG icon
 */
function createComponentFromInfo(info) {
  // grab information we need from "meta" pertaining to our SVG's
  const { descriptor, moduleName } = info;
  const { attrs, content } = descriptor;

  /**
   * Using a custom Vue render method we set our instance properties.
   * Our Vue components are "functional" (stateless, instanceless) so we use
   * context to pass our component all the information it needs.
   *
   * @ref https://vuejs.org/v2/guide/render-function.html
   */
  return `{
  name: '${moduleName}',
  functional: true,
  // We use title as the prop name as it is not a valid attribute for an SVG
  // HTML element
  props: ['title'],
  render(createElement, context) {
    const { children, data, listeners, props } = context;
    const attrs = getAttributes({
      width: '${attrs.width}',
      height: '${attrs.height}',
      viewBox: '${attrs.viewBox}',
      preserveAspectRatio: 'xMidYMid meet',
      xmlns: 'http://www.w3.org/2000/svg',
      // Special case here, we need to coordinate that we are using title,
      // potentially, to get the right focus attributes
      title: props.title,
      ...data.attrs,
    });
    const svgData = {
      attrs,
      on: listeners,
    };

    if (data.staticClass) {
      svgData.class = {
        [data.staticClass]: true,
      };
    }

    if (data.class) {
      svgData.class[data.class] = true;
    }

    return createElement('svg', svgData, [
      props.title && createElement('title', null, props.title),
      ${content.map(toString).join(', ')},
      children,
    ]);
  },
};`;
}

/**
 * Stringify and set our icon module's imports to a variable for use in
 * createModuleFromInfo. Icon-helpers gets the width, height viewbox,
 * any aria attributes of an SVG and return them as an iconAttributes object
 * so they can be set on some eventual HTML element
 */
const MODULE_IMPORTS = `
import { getAttributes } from '@carbon/icon-helpers';
`;

/**
 * Sets up our icon's module. Imports our icon-helpers and exports
 * the stringified custom Vue render method from createComponentFromInfo
 *
 * @param {object} info - information about the SVG icon from build.json
 */
function createModuleFromInfo(info) {
  const source = `${MODULE_IMPORTS} export default ${createComponentFromInfo(
    info
  )};`;

  return source;
}

/**
 * Makes a Storybook story for each icon.
 *
 * @param {object} info - an individual icon from build-info.json
 */
function createIconStory(info) {
  const { moduleName, outputOptions } = info;
  return `import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import ${moduleName} from '../../../${outputOptions.file}';

storiesOf('${moduleName}', module)
  .add('default', () => ({
    components: {
      icon: ${moduleName},
    },
    template: \`<icon></icon>\`,
  }))
  .add('with title', () => ({
    components: {
      icon: ${moduleName},
    },
    template: \`<icon><title slot="title">${moduleName}</title></icon>\`,
  }))
  .add('with aria-label and tabindex', () => ({
    components: {
      icon: ${moduleName},
    },
    template: \`<icon aria-label="${moduleName}" tabindex="0"></icon>\`,
  }))
  .add('with event handler', () => ({
    components: {
      icon: ${moduleName},
    },
    template: \`<icon v-on:click="action"></icon>\`,
    methods: {
      action: action('clicked'),
    },
  }))
  .add('with custom classes', () => ({
    components: {
      icon: ${moduleName},
    },
    template: \`<icon class="custom classes" :class="'dynamic classes_2'"></icon>\`,
  }));`;
}

const STORYBOOK_DIR = path.resolve(__dirname, '../examples/storybook/stories');

/**
 * Build is what we'll call to kick off the whole process.
 *
 * @param {object} { cwd } - the current working directory
 */
async function build({ cwd }) {
  // Send a string to the users terminal
  reporter.info(`Building components for ${meta.length} icons...`);
  // path.join joins all arguments together as a path
  const ESM_DIR = path.join(cwd, 'es');
  // We provide CJS, and UMD modules as well as our ecmascript modules
  // DA's NOTE: Why do we also provide UMD separately -- since UMD is compatible with CJS?
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

  // Send another string to the user's console
  reporter.info('Building ESM and bundle sources...');
  // Returns an array of results -- or throws an error if any promise is rejected
  await Promise.all(
    // Map over all the information about every icon "info" here refers to all
    // the information about each icon: name, size, format, description, attributes etc...
    meta.map(async info => {
      // our module's code derived from "info"
      const source = createModuleFromInfo(info);
      // take the current working directory and the format and filename specified by info
      // and create a Filepath for our icon module
      const jsFilepath = path.join(cwd, info.outputOptions.file);

      // HELP! JOSH!
      await fs.ensureDir(path.dirname(jsFilepath));
      await fs.writeFile(jsFilepath, source);

      // Map over the bundles and adjust the outputs according to outputOptions
      await Promise.all(
        BUNDLE_FORMATS.map(async ({ format, directory }) => {
          const bundle = await rollup({
            input: jsFilepath,
            external: ['@carbon/icon-helpers'],
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

  reporter.info('Building ESM and bundle entrypoints...');
  const entrypoint = `export const CarbonIconsVue = {
  install(Vue, options) {
    const { components } = options;
    Object.keys(components).forEach(key => {
      Vue.component(key, components[key]);
    });
  },
}`;
  const entrypointPath = path.join(ESM_DIR, 'index.js');

  await fs.ensureDir(ESM_DIR);
  await fs.writeFile(entrypointPath, entrypoint);

  await Promise.all(
    BUNDLE_FORMATS.map(async ({ format, directory }) => {
      const bundle = await rollup({
        input: entrypointPath,
        external: [],
      });
      const outputOptions = {
        format,
        file: entrypointPath.replace(/\/es\//, `/${directory}/`),
      };
      if (format === 'umd') {
        outputOptions.name = 'CarbonIconsVue';
      }
      await bundle.write(outputOptions);
    })
  );

  reporter.info('Generating Storybook stories...');
  await fs.remove(STORYBOOK_DIR);
  await fs.ensureDir(STORYBOOK_DIR);
  await Promise.all(
    meta.map(info => {
      const { moduleName } = info;
      const outputPath = path.join(STORYBOOK_DIR, `${moduleName}-story.js`);
      return fs.writeFile(outputPath, createIconStory(info));
    })
  );

  reporter.success('Done! 🎉');
}

build({ cwd: path.resolve(__dirname, '../') }).catch(error => {
  console.log(error);
});
