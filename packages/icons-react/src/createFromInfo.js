/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { defaultAttributes } = require('@carbon/icon-helpers');
const babel = require('@babel/core');
const { camelCase } = require('change-case');
const prettier = require('prettier');

const babelOptions = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
        targets: ['last 1 version', 'ie >= 11', 'Firefox ESR'],
      },
    ],
  ],
};
const prettierOptions = {
  parser: 'babel',
  printWidth: 80,
  singleQuote: true,
  trailingComma: 'es5',
  proseWrap: 'always',
};

const MODULE_IMPORTS = `
import { getAttributes } from '@carbon/icon-helpers';
import PropTypes from 'prop-types';
import React from 'react';

const defaultStyle = ${JSON.stringify(
  transformStyleIntoObject(defaultAttributes.style)
)};
`;

function createEntrypointFromMeta(meta) {
  const components = meta.map(info => {
    const source = createComponentFromInfo(info);
    return `export ${source}`;
  });
  const source = `${MODULE_IMPORTS}
${components.join('\n')}`;

  return babel.transformSync(source, babelOptions);
}

function createModuleFromInfo(info) {
  const source = `
${MODULE_IMPORTS}

${createComponentFromInfo(info)}

export default ${info.moduleName};
`;
  return babel.transformSync(source, babelOptions);
}

function iconToString(descriptor) {
  const { elem, attrs = {}, content = [] } = descriptor;
  const props = Object.keys(attrs).reduce((acc, key) => {
    if (key.includes('data-')) {
      return {
        ...acc,
        [key]: attrs[key],
      };
    }
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
    const ${moduleName} = React.forwardRef(({
      className,
      children,
      style,
      tabIndex,
      ...rest,
    }, ref) => {
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

      if (typeof style === 'object') {
        props.style = {
          ...defaultStyle,
          ...style,
        };
      } else {
        props.style = defaultStyle;
      }

      if (ref) {
        props.ref = ref;
      }

      return React.createElement(
        'svg',
        props,
        children,
        ${descriptor.content.map(iconToString).join(', ')}
      );
    });
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
    };
  `;
  return prettier.format(source, prettierOptions);
}

function transformStyleIntoObject(string) {
  return string.split(';').reduce((acc, declaration) => {
    const [property, value] = declaration.split(':').map(s => s.trim());
    return {
      ...acc,
      [camelCase(property)]: value,
    };
  }, {});
}

module.exports = {
  createModuleFromInfo,
  createEntrypointFromMeta,
  createComponentFromInfo,
};
