/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * A WebPack loader to generate `lit-element`'s `CSSResult` from CSS string.
 *
 * @returns {string} The massaged module content.
 */
function cssResultLoader(fileContent) {
  return `
    import { css } from 'lit-element';
    export default css([${JSON.stringify(fileContent)}]);
  `;
}

module.exports = cssResultLoader;
