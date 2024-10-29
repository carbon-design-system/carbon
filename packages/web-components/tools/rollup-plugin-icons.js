/**
 * @license
 *
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import path from 'path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'url';
import icon from './svg-result-carbon-icon.js';

/**
 * @param {Array} [inputs] icon files of the @carbon/icons/lib folder from node_modules
 * @param {String} [banner] license banner to prepend to file
 * @returns {object} The rollup plugin to generate lit svg template icon files.
 */
export default function rollupPluginIcons(inputs, banner) {
  return {
    name: 'carbon-icons',

    async buildEnd() {
      const __dirname = path.dirname(fileURLToPath(import.meta.url));
      const require = createRequire(import.meta.url);

      for (const input of inputs) {
        const iconPath = path.resolve(__dirname, `../${input}`);

        const svg = await import(iconPath);

        const iconsDir = path.dirname(require.resolve('@carbon/icons/lib'));
        const iconsESPath = path.resolve(
          'es',
          'icons',
          path.relative(iconsDir, iconPath)
        );
        const spreadModulePath = path.resolve(
          __dirname,
          '../es/globals/directives/spread.js'
        );

        const code = `${banner}
import { svg } from 'lit';
import spread from '${path.relative(
          path.dirname(iconsESPath),
          spreadModulePath
        )}';

const svgResultCarbonIcon = ${icon(svg.default)};
export default svgResultCarbonIcon;`;

        this.emitFile({
          type: 'asset',
          fileName: `icons/${path.relative(iconsDir, iconPath)}`,
          source: code,
        });

        // emit icon type file
        const typeCode = `${banner}
import { SVGTemplateResult } from 'lit-html';
declare const svgResultCarbonIcon: ({ children, ...attrs }?: { children?: SVGTemplateResult; [attr: string]: any }) => SVGTemplateResult;
export default svgResultCarbonIcon;`;

        const typePath = path.format({
          ...path.parse(iconPath),
          base: '',
          ext: '.d.ts',
        });

        this.emitFile({
          type: 'asset',
          fileName: `icons/${path.relative(iconsDir, typePath)}`,
          source: typeCode,
        });
      }
    },
  };
}
