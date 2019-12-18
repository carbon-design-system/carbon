/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

/**
 * Generate an icon component, which in our case is the string representation
 * of the component, from a given moduleName and icon descriptor.
 * @param {string} moduleName
 * @param {object} descriptor
 * @returns {object}
 */
function createIconComponent(moduleName, descriptor) {
  const { attrs, content } = descriptor;
  const { width, height, viewBox } = attrs;
  const source = `/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { getAttributes } from '@carbon/icon-helpers';

export default {
  name: '${moduleName}',
  functional: true,
  // We use title as the prop name as it is not a valid attribute for an SVG
  // HTML element
  props: ['title'],
  render(createElement, context) {
    const { children, data, listeners, props } = context;
    const attrs = getAttributes({
      width: '${width}',
      height: '${height}',
      viewBox: '${viewBox}',
      preserveAspectRatio: 'xMidYMid meet',
      xmlns: 'http://www.w3.org/2000/svg',
      // Special case here, we need to coordinate that we are using title,
      // potentially, to get the right focus attributes
      title: props.title,
      ...data.attrs
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
      svgData.class = svgData.class || {}; // may be no static class
      svgData.class[data.class] = true;
    }

    // remove style set by getAttributes
    delete svgData.attrs.style;

    // combine incoming staticStyle, style with default willChange
    svgData.style = { willChange: 'transform', ...data.staticStyle, ...data.style };

    return createElement('svg', svgData, [
      props.title && createElement('title', null, props.title),
      ${content.map(convertToVue).join(', ')},
      children,
    ]);
  },
};`;

  return {
    source,
  };
}

/**
 * Convert the given node to a Vue string source
 * @param {object} node
 * @returns {string}
 */
function convertToVue(node) {
  const { elem, attrs } = node;
  return `createElement('${elem}', { attrs: ${JSON.stringify(attrs)} })`;
}

module.exports = {
  createIconComponent,
};
