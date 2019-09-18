/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

// eslint-disable-next-line import/no-extraneous-dependencies
const postcss = require('postcss');

/**
 * This plugin transforms our usage of custom properties to an appropriate
 * fallback in the Sass source. For full support, view the test file associated
 * with this transform. A quick overview:
 *
 * Input:
 * .my-selector {
 *   // How we author in our source code
 *   color: var(--token-01, $token-01);
 * }
 *
 * Output:
 * .my-selector {
 *   // Output fallback in code shipped in `scss` folder
 *   color: $token-01;
 *   color: var(--token-01, $token-01);
 * }
 */
const plugin = postcss.plugin('transform-custom-properties', () => {
  return root => {
    // Our strategy for this plugin is to walk through all the declarations that
    // it can find and test for the existence of a custom property using the
    // `CUSTOM_PROPERTY_REGEX`. If we've found matches, then we know that we
    // have to provide a fallback in the resulting code.
    root.walkDecls(declaration => {
      const CUSTOM_PROPERTY_REGEX = /var\(--([a-z-0-9]+),\s\$([a-z-0-9]+)\)/g;
      const { prop, raws } = declaration;
      // We're most likely in a Sass variable map
      if (prop[0] === '$') {
        return;
      }

      // Before testing our regex, we try and map source code to a normal-ish
      // structure given that formatting tools can cause values to wrap in
      // unpredictable ways. As a result, we're going to split on newlines and
      // then consolidate values between `,` so that we can view each part of
      // the value of property in isolation and safely substitute CSS Custom
      // Properties
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

      // For our fallback values, we're going to replace any `var()` match with
      // the fallback token in capture group $2
      const fallback = values.map(value => {
        return value.replace(CUSTOM_PROPERTY_REGEX, '$$$2');
      });

      declaration.before(`${raws.before}${prop}: ${fallback.join('\n')}`);
    });
  };
});

module.exports = plugin;
