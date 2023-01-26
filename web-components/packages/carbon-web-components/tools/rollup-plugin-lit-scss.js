/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const path = require('path');
const { promisify } = require('util');
const sass = require('sass');
const { createFilter } = require('@rollup/pluginutils');

const renderSass = promisify(sass.render);
const noop = (s) => s;

/**
 * @param {string} css A CSS.
 * @returns {string} A `lit-html` template of the given CSS.
 */
function transformToTemplate(css) {
  return `import { css } from 'lit';export default css([${JSON.stringify(
    css
  )}])`;
}

/**
 * @param {object} [options] The options.
 * @param {RegExp} [options.include=/\.scss/] The files to include.
 * @param {RegExp} [options.exclude] The files to exclude.
 * @param {Function} [options.preprocessor] The CSS preprocessor to use.
 * @returns {object} The rollup plugin to transform an `.scss` file to a `lit-html` template.
 */
function rollupPluginLitSCSS({
  include = /\.scss$/i,
  exclude,
  preprocessor = noop,
  ...options
} = {}) {
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

      const finalContent = `
        $feature-flags: (
          enable-css-custom-properties: true,
        );
       ${contents}`;

      const { css } = await renderSass({
        ...options,
        file: id,
        data: finalContent,
      });

      return {
        code: transformToTemplate(await preprocessor(css.toString(), id)),
        map: {
          mappings: '',
        },
      };
    },
  };
}

module.exports = rollupPluginLitSCSS;
