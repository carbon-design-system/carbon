/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const path = require('path');
const readPkgUp = require('read-pkg-up');
const MagicString = require('magic-string');
const { createFilter } = require('@rollup/pluginutils');

function rollupPluginLicense({ include, exclude, whitelist, sourcemap, sourceMap, licenseSelf } = {}) {
  const filter = createFilter(include, exclude);
  const licensesForPackages = {};

  return {
    name: 'license',

    async transform(contents, id) {
      if (!filter(id)) {
        return null;
      }

      const isSelf = /\/node_modules\//i.test(id);
      const packageContents = !isSelf ? undefined : await readPkgUp({ cwd: path.dirname(id) });
      const { name } = (packageContents && packageContents.packageJson) || {};

      if (!name || licensesForPackages[name]) {
        return null;
      }

      this.parse(contents, {
        onComment(block, text) {
          if (block && /(@license|copyright)/i.test(text)) {
            if (!licensesForPackages[name]) {
              licensesForPackages[name] = text.trim().replace(/^[*!]\s*/, '');
            }
          }
        },
      });

      if (!licensesForPackages[name]) {
        licensesForPackages[name] = null;
      }

      return null;
    },

    async renderChunk(contents) {
      const magicString = new MagicString(contents);

      const keys = Object.keys(licensesForPackages).filter((name) => !whitelist || !whitelist.test(name));
      if (keys.length > 0) {
        const thirdPartyLicenseNotice = [
          '@license',
          '',
          'This bundle contains the following third-party dependencies:',
          ...keys.filter((name) => licensesForPackages[name]).map((name) => `\n * ${name}:\n * \n ${licensesForPackages[name]}`),
          '',
          'Also refer to the following links for the license of other third-party dependencies:',
          '',
          ...keys.filter((name) => !licensesForPackages[name]).map((name) => `https://www.npmjs.com/package/${name}`),
        ].join('\n * ');
        magicString.prepend(`/**\n * ${thirdPartyLicenseNotice}\n */\n\n`);
      }

      magicString.prepend((typeof licenseSelf === 'function' ? await licenseSelf() : licenseSelf) || '');

      const result = { code: magicString.toString() };
      if (sourceMap !== false && sourcemap !== false) {
        result.map = magicString.generateMap({ hires: true });
      }
      return result;
    },
  };
}

module.exports = rollupPluginLicense;
