/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const postcss = require('postcss');
const scss = require('postcss-scss');

const CUSTOM_PROPERTY_REGEX = /^(.*)var\(--(.+),\s\$(.+)\)(.*)$/m;
const plugin = postcss.plugin('transform-custom-properties', () => {
  return root => {
    root.walkDecls(declaration => {
      const { prop, value, parent, raws } = declaration;
      // We're most likely in a Sass variable map
      if (prop[0] === '$') {
        return;
      }

      const match = CUSTOM_PROPERTY_REGEX.exec(declaration.value);
      if (!match) {
        return;
      }

      const before = match[1];
      const customPropertyName = match[2];
      const tokenName = match[3];
      const after = match[4];

      if (customPropertyName !== tokenName) {
        throw new Error('Expected token name to match property name');
      }

      declaration.before(
        `${raws.before}${prop}: ${before}$${tokenName}${after}`
      );
    });
  };
});

module.exports = plugin;
