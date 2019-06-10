/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { colors } from '@carbon/colors';
import { formatTokenName } from '@carbon/themes';
import { Style } from 'sketch/dom';
import { syncSharedStyle } from '../tools/sharedStyles';

// We separate out certain colors that are not a part of the primary swatches
// that we need to render
const { black, white, orange, yellow, ...swatches } = colors;

// We need to build up our expected shared styles from code to diff with what
// currently exists in the document. For this case, we'll use the shared style
// name as the key and the value from the swatch as the expected value
const expectedSharedStyles = Object.keys(swatches).reduce((acc, swatch) => {
  const name = formatTokenName(swatch);
  const swatchStyles = Object.keys(swatches[swatch]).reduce((acc, grade) => {
    return {
      ...acc,
      [formatSharedStyleName(name, grade)]: swatches[swatch][grade],
    };
  }, {});

  return {
    ...acc,
    ...swatchStyles,
  };
}, {});

expectedSharedStyles[formatSharedStyleName('black')] = black['100'];
expectedSharedStyles[formatSharedStyleName('white')] = white['0'];
expectedSharedStyles[formatSharedStyleName('orange')] = orange['40'];
expectedSharedStyles[formatSharedStyleName('yellow')] = yellow['20'];

/**
 * Sync color shared styles to the given document and return the result
 * @param {Document} document
 * @returns {Array<SharedStyle>}
 */
export function syncColorStyles(document) {
  const { sharedLayerStyles } = document;
  const existingStyles = sharedLayerStyles.filter(({ name, style }) => {
    const fill = style.fills[0];
    // Colors in Sketch are #RRGGBB plus opacity, so typically they are
    // #RRGGBBFF
    const color = fill.color.slice(0, -2);
    return expectedSharedStyles[name] && expectedSharedStyles[name] === color;
  });

  // Exit early if everything is the same
  if (existingStyles.length === Object.keys(expectedSharedStyles).length) {
    return existingStyles;
  }

  const sharedStyles = Object.keys(swatches).flatMap(swatchName => {
    const name = formatTokenName(swatchName);
    return Object.keys(swatches[swatchName]).map(grade => {
      return syncColorStyle(
        document,
        formatSharedStyleName(name, grade),
        swatches[swatchName][grade]
      );
    });
  });

  const singleColors = [
    ['black', black['100']],
    ['white', white['0']],
    ['orange', orange['40']],
    ['yellow', yellow['20']],
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
  return ['color', name, grade].filter(Boolean).join('/');
}

/**
 * Sync the given color value as a shared style for the document
 * @param {Document} document
 * @param {string} name
 * @param {string} value
 * @returns {SharedStyle}
 */
function syncColorStyle(document, name, value) {
  return syncSharedStyle(document, name, {
    fills: [
      {
        color: value,
        fillType: Style.FillType.Color,
      },
    ],
  });
}
