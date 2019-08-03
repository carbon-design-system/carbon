/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { reporter } = require('@carbon/cli-reporter');
const meta = require('@carbon/icons/build-info.json');
const fs = require('fs-extra');
const path = require('path');
const { rollup } = require('rollup');

const MODULE_IMPORTS = `
import { getAttributes } from '@carbon/icon-helpers';
`;

function createModuleFromInfo(info) {
  const source = `${MODULE_IMPORTS}
export default ${createComponentFromInfo(info)};`;
  return source;
}

function createComponentFromInfo(info) {
  const { descriptor, moduleName } = info;
  const { attrs, content } = descriptor;
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

function toString(descriptor) {
  const { elem, attrs = {}, content = [] } = descriptor;
  if (content.length === 0) {
    return `createElement('${elem}', { attrs: ${JSON.stringify(attrs)} })`;
  }
  return `createElement('${elem}', { attrs: ${JSON.stringify(
    attrs
  )} }, [${content.map(toString).join(', ')}])`;
}

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

async function build({ cwd }) {
  reporter.info(`Building components for ${meta.length} icons...`);
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
  await Promise.all(
    meta.map(async info => {
      const source = createModuleFromInfo(info);
      const jsFilepath = path.join(cwd, info.outputOptions.file);

      await fs.ensureDir(path.dirname(jsFilepath));
      await fs.writeFile(jsFilepath, source);

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

module.exports = build;
