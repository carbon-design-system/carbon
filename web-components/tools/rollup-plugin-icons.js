/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import path from 'path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'url';
import { createFilter } from '@rollup/pluginutils'
import icon from './svg-result-carbon-icon.js';

/**
 * @param {object} [options] The options.
 * @param {RegExp} [options.include=/\.scss/] The files to include.
 * @param {RegExp} [options.exclude] The files to exclude.
 * @returns {object} The rollup plugin to transform an `.svg` file to a `lit-html` template.
 */
export default function rollupPluginIcons(inputs) {
  return {
    name: 'carbon-icons',

    async buildEnd() {
      const __dirname = path.dirname(fileURLToPath(import.meta.url));
      const require = createRequire(import.meta.url);

      for (const input of inputs) {
        const iconPath = path.resolve(__dirname, `../${input}`);

        const svg = await import(iconPath);

        const iconsDir = path.dirname(require.resolve('@carbon/icons/lib'));
        const iconsESPath = path.resolve('es', 'icons', path.relative(iconsDir, iconPath));
        const spreadModulePath = path.resolve(__dirname, '../es/globals/directives/spread');

        const code = [
          `import { svg } from 'lit'`,
          `import spread from '${path.relative(path.dirname(iconsESPath), spreadModulePath)}'`,
          `const svgResultCarbonIcon = ${icon(svg.default)}`,
          `export default svgResultCarbonIcon;`,
        ].join(';');

        this.emitFile({
          type: 'asset',
          fileName: `icons/${path.relative(iconsDir, iconPath)}`,
          source: code
        });
      }
    }
  };
}

