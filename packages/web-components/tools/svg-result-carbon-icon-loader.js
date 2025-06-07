/**
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const path = require('path');
const createSVGResultFromCarbonIcon = require('./svg-result-carbon-icon');

/**
 * A Vite loader to generate `lit-html`'s `SVGResult` from an icon descriptor from `@carbon/icons`.
 *
 * @returns {string} The massaged module content.
 */
function svgResultCarbonIconLoader() {
  // TODO: `global-require` was deprecated. Should the alternative in
  // https://eslint.org/docs/latest/rules/global-require be used, or should the
  // directive be deleted?
  // https://github.com/carbon-design-system/carbon/issues/18991
  const descriptor = require(
    this.resourcePath
  ); /* // eslint-disable-line global-require */
  return `
    import { svg } from 'lit';
    import spread from '${path.resolve(
      __dirname,
      '../src/globals/directives/spread'
    )}';
    const svgResultCarbonIcon = ${createSVGResultFromCarbonIcon(descriptor)};
    export default svgResultCarbonIcon;
  `;
}

module.exports = svgResultCarbonIconLoader;
