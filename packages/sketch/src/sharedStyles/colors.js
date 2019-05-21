/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { colors } from '@carbon/colors';
import { formatTokenName } from '@carbon/themes';
import { SharedStyle, Style } from 'sketch/dom';
import { syncSharedStyle } from '../tools/sharedStyles';

const { black, white, orange, yellow, ...swatches } = colors;
const colorNames = Object.keys(colors);
const formattedSwatchNames = colorNames.reduce(
  (acc, key, i) => ({
    ...acc,
    [formatTokenName(key)]: colorNames[i],
  }),
  {}
);
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

function formatSharedStyleName(name, grade) {
  return ['color', name, grade].filter(Boolean).join('/');
}

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
