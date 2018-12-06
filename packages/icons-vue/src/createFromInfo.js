'use strict';

const prettier = require('prettier');

const prettierOptions = {
  parser: 'babylon',
  printWidth: 80,
  singleQuote: true,
  trailingComma: 'es5',
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
  const { descriptor, moduleName, size } = info;
  const { attrs, content } = descriptor;
  return `{
  name: '${moduleName}',
  functional: true,
  props: [
    'ariaLabel',
    'ariaLabelledBy',
    'height',
    'title',
    'viewBox',
    'width',
    'preserveAspectRatio',
    'tabindex',
    'xmlns',
  ],
  render(createElement, context) {
    const { props, listeners, slots } = context;
    const {
      ariaLabel,
      ariaLabelledBy,
      width = '${attrs.width}',
      height = '${attrs.height}',
      viewBox = '${attrs.viewBox}',
      preserveAspectRatio = 'xMidYMid meet',
      xmlns = 'http://www.w3.org/2000/svg',
      ...rest
    } = props;
    const attrs = getAttributes({
      ...rest,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      width,
      height,
      viewBox,
      preserveAspectRatio,
      xmlns,
    });
    return createElement('svg', {
      attrs,
      on: listeners,
    }, [
      slots.title,
      ${content.map(toString).join(', ')},
      slots.default,
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
