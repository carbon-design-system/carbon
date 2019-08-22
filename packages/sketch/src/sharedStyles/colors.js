/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { colors } from '@carbon/colors';
import { formatTokenName } from '@carbon/themes';
import { syncColorStyle } from '../tools/sharedStyles';

// We separate out certain colors that are not a part of the primary swatches
// that we need to render
const { black, white, orange, yellow, ...swatches } = colors;

/**
 * Sync color shared styles to the given document and return the result
 * @param {Document} document
 * @returns {Array<SharedStyle>}
 */
export function syncColorStyles(document) {
  const sharedStyles = Object.keys(swatches).flatMap(swatchName => {
    const name = formatTokenName(swatchName);
    const result = Object.keys(swatches[swatchName]).map(grade => {
      return syncColorStyle(
        document,
        formatSharedStyleName(name, grade),
        swatches[swatchName][grade]
      );
    });
    return result;
  });

  const singleColors = [
    ['black', black['100']],
    ['white', white['0']],
    ['orange', orange['40']],
    ['yellow', yellow['30']],
  ].map(([name, value]) => {
    return syncColorStyle(document, formatSharedStyleName(name), value);
  });

  return sharedStyles.concat(singleColors);
}

/**
 * Our shared style name will need to have the `color` namespace alongside a
 * name for the swatch and an optional grade.
 * @param {string} name
 * @param {string?} grade
 * @returns {string}
 */
function formatSharedStyleName(name, grade) {
  return ['color', name.split('-').join(' '), grade].filter(Boolean).join('/');
}
