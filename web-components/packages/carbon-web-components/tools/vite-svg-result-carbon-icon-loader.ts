/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const path = require('path');
const createSVGResultFromCarbonIcon = require('./svg-result-carbon-icon');

/**
 * A Vite plugin to generate `lit-html`'s `SVGResult` from an icon descriptor from `@carbon/icons`.
 *
 * @returns {string} The massaged module content.
 */
export default function svgResultCarbonIconLoader() {
  const svgRegex = /@carbon[\\/]icons[\\/]/i

  const paths = new Map<string, string>()

  return {
      name: 'svg-loader',
      enforce: 'pre',

      resolveId(id: string): string | null {
      if (id.match(svgRegex)) {
          paths.set(id, id)
          return id
      } else {
          return null
      }
      },

      async load(id: string): Promise<string | undefined> {
      let outcome: string | undefined
      if (!id.match(svgRegex)) {
          return outcome
      }
      return ``
      },

      async transform(src: string, id: string) {

      if (!paths.has(id)) {
          return null
      }

      let outcome: string | undefined = src
      if (!id.match(svgRegex)) {
          return outcome
      }

      const descriptor = require(id);
      return `
          import { svg } from 'lit';
          import spread from '${path.resolve(
          __dirname,
          '../src/globals/directives/spread'
          )}';
          const svgResultCarbonIcon = ${createSVGResultFromCarbonIcon(descriptor)};
          export default svgResultCarbonIcon;
      `
      },
  }
}