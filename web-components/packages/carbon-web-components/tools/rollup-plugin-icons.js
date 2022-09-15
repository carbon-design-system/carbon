/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const path = require('path');
const { createFilter } = require('rollup-pluginutils');
const createSVGResultCarbonIcon = require('./svg-result-carbon-icon');

/**
 * @param {object} [options] The options.
 * @param {RegExp} [options.include=/\.scss/] The files to include.
 * @param {RegExp} [options.exclude] The files to exclude.
 * @returns {object} The rollup plugin to transform an `.svg` file to a `lit-html` template.
 */
function rollupPluginIcons({ include = /@carbon[\\/]icons[\\/]/i, exclude } = {}) {
  const filter = createFilter(include, exclude);
  return {
    name: 'lit-scss',

    /**
     * Enqueues the module contents for loading.
     *
     * @param {string} id The module ID.
     */
    load(id) {
      if (filter(id)) {
        this.addWatchFile(path.resolve(id));
      }
      return null;
    },

    /**
     * Transforms the module contents.
     *
     * @param {string} contents The module contents.
     * @param {string} id The module ID.
     * @returns {object} The transformed module contents.
     */
    async transform(contents, id) {
      if (!filter(id)) {
        return null;
      }

      const svg = require(id); // eslint-disable-line global-require,import/no-dynamic-require

      const code = [
        `import { svg } from 'lit-html'`,
        `import spread from '${path.resolve(__dirname, '../src/globals/directives/spread')}';`,
        `const svgResultCarbonIcon = ${createSVGResultCarbonIcon(svg)};`,
        `export default svgResultCarbonIcon;`,
      ].join(';');

      return {
        code,
        map: {
          mappings: '',
        },
      };
    },
  };
}

module.exports = rollupPluginIcons;
