/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const prettier = require('prettier');

const prettierOptions = {
  parser: 'babylon',
  printWidth: 80,
  singleQuote: true,
  trailingComma: 'es5',
  proseWrap: 'always',
};

const MODULE_IMPORTS = `
import { getAttributes } from '@carbon/icon-helpers';
`;

function createEntrypointFromMeta(meta) {
  const install = `export const CarbonIconsVue = {
  install(Vue, options) {
    const { components } = options;
    Object.keys(components).forEach(key => {
      Vue.component(key, components[key]);
    });
  },
}`;
  const components = meta.map(info => {
    const source = createComponentFromInfo(info);
    return `export const ${info.moduleName} = ${source}`;
  });
  const source = `${MODULE_IMPORTS}
${components.join('\n')}
${install}`;

  return prettier.format(source, prettierOptions);
}

function createModuleFromInfo(info) {
  const source = `${MODULE_IMPORTS}
export default ${createComponentFromInfo(info)};`;
  return prettier.format(source, prettierOptions);
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

module.exports = {
  createModuleFromInfo,
  createEntrypointFromMeta,
};
