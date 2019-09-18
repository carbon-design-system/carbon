/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

// ^([\s\S]*)var\(--([a-z-]+),\s\$([a-z-]+)\)*([\s\S])$

const postcss = require('postcss');
const scss = require('postcss-scss');

const plugin = postcss.plugin('transform-custom-properties', () => {
  return root => {
    root.walkDecls(declaration => {
      const CUSTOM_PROPERTY_REGEX = /var\(--([a-z-0-9]+),\s\$([a-z-0-9]+)\)/g;
      const { prop, parent, raws } = declaration;
      // We're most likely in a Sass variable map
      if (prop[0] === '$') {
        return;
      }

      const lines = declaration.value.split('\n');
      const values = [];
      let index = 0;

      for (const line of lines) {
        if (!values[index]) {
          values[index] = '';
        }

        values[index] = `${values[index]} ${line.trim()}`.trim();

        if (line.match(/,$/)) {
          index++;
        }
      }

      const valuesWithCustomProperties = values.filter(value => {
        return value.match(CUSTOM_PROPERTY_REGEX);
      });

      if (valuesWithCustomProperties.length === 0) {
        return;
      }

      const fallback = values.map(value => {
        return value.replace(CUSTOM_PROPERTY_REGEX, '$$$2');
      });

      declaration.before(`${raws.before}${prop}: ${fallback.join('\n')}`);
    });
  };
});

module.exports = plugin;
