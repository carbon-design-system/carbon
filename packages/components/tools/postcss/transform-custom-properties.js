/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

// eslint-disable-next-line import/no-extraneous-dependencies
const postcss = require('postcss');

const plugin = postcss.plugin('transform-custom-properties', () => {
  return root => {
    root.walkDecls(declaration => {
      const CUSTOM_PROPERTY_REGEX = /var\(--([a-z-0-9]+),\s\$([a-z-0-9]+)\)/g;
      const { prop, raws } = declaration;
      // We're most likely in a Sass variable map
      if (prop[0] === '$') {
        return;
      }

      const lines = declaration.value.split('\n');
      const values = [];
      let index = 0;

      // eslint-disable-next-line no-restricted-syntax
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
