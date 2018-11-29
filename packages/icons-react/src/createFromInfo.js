'use strict';

const { camelCase } = require('change-case');
const prettier = require('prettier');

const prettierOptions = {
  parser: 'babylon',
  printWidth: 80,
  singleQuote: true,
  trailingComma: 'es5',
};

const MODULE_IMPORTS = `
import { getAttributes } from '@carbon/icon-helpers';
import PropTypes from 'prop-types';
import React from 'react';
`;

function createEntrypointFromMeta(meta) {
  const components = meta.map(info => {
    const source = createComponentFromInfo(info);
    return `export ${source}`;
  });
  const source = `${MODULE_IMPORTS}
${components.join('\n')}`;

  return prettier.format(source, prettierOptions);
}

function createModuleFromInfo(info) {
  const source = `
${MODULE_IMPORTS}

${createComponentFromInfo(info)}

export default ${info.moduleName};
`;
  return prettier.format(source, prettierOptions);
}

function iconToString(descriptor) {
  const { elem, attrs = {}, content = [] } = descriptor;
  const props = Object.keys(attrs).reduce((acc, key) => {
    return {
      ...acc,
      [camelCase(key)]: attrs[key],
    };
  }, {});
  if (content.length === 0) {
    return `React.createElement('${elem}', ${JSON.stringify(props)})`;
  }
  const children = content.map(iconToString);
  return `React.createElement('${elem}', ${JSON.stringify(
    props
  )}, ${children.join(', ')})`;
}

function createComponentFromInfo({ descriptor, moduleName }) {
  const source = `
function ${moduleName}({ className, children, tabIndex, ...rest }) {
  const { tabindex, ...props } = getAttributes({
    ...rest,
    tabindex: tabIndex,
  });

  if (className) {
    props.className = className;
  }

  if (tabindex !== undefined && tabindex !== null) {
    props.tabIndex = tabindex;
  }

  return React.createElement(
    'svg',
    props,
    children,
    ${descriptor.content.map(iconToString).join(', ')}
  );
}

${moduleName}.displayName = '${moduleName}';
${moduleName}.propTypes = {
  'aria-hidden': PropTypes.bool,
  'aria-label': PropTypes.string,
  'aria-labelledby': PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
  height: PropTypes.number,
  preserveAspectRatio: PropTypes.string,
  tabIndex: PropTypes.string,
  title: PropTypes.string,
  viewBox: PropTypes.string,
  width: PropTypes.number,
  xmlns: PropTypes.string,
};
${moduleName}.defaultProps = {
  width: ${descriptor.attrs.width},
  height: ${descriptor.attrs.height},
  viewBox: '${descriptor.attrs.viewBox}',
  xmlns: 'http://www.w3.org/2000/svg',
  preserveAspectRatio: 'xMidYMid meet',
};`;
  return prettier.format(source, prettierOptions);
}

module.exports = {
  createModuleFromInfo,
  createEntrypointFromMeta,
  createComponentFromInfo,
};
