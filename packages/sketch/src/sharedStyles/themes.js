/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { white, g10, g90, g100, formatTokenName } from '@carbon/themes';
import color from 'color-string';
import { Style } from 'sketch/dom';
import { syncSharedStyle } from '../tools/sharedStyles';

/**
 * Sync theme color shared styles to the given document and return the result
 * @param {Document} document
 * @returns {Array<SharedStyle>}
 */
export function syncThemeColorStyles(document) {
  const themes = {
    'White theme': white,
    'Gray 10 theme': g10,
    'Gray 90 theme': g90,
    'Gray 100 theme': g100,
  };

  const { sharedLayerStyles } = document;
  const existingStyles = sharedLayerStyles.filter(({ name, style }) => {
    const [category, token] = name.split('/').map(value => value.trim());

    if (!themes[category]) {
      return false;
    }

    const expected = color.get.rgb(themes[category][formatSymbolName(token)]);
    const actual = color.get.rgb(style.fills[0].color);

    for (let i = 0; i < expected.length; i++) {
      if (actual[i] !== expected[i]) {
        return false;
      }
    }

    return true;
  });
  const expectedSharedStyles = Object.keys(themes).reduce((acc, theme) => {
    const count = Object.keys(themes[theme]).length;
    return acc + count;
  }, 0);

  // Exit early if everything is the same
  if (existingStyles.length === expectedSharedStyles) {
    return existingStyles;
  }

  const sharedStyles = Object.keys(themes).flatMap(theme => {
    return Object.keys(themes[theme]).map(token => {
      const name = `${theme} / ${formatTokenName(token)}`;
      return syncColorStyle(document, name, themes[theme][token]);
    });
  });

  return sharedStyles;
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

const keywords = ['ui'];

/**
 * Transform a formatted token name back to its JavaScript value to look up the
 * expected value for a token from code
 * @param {string} token
 * @returns {string}
 */
function formatSymbolName(token) {
  const parts = token.split('-');
  let result = '';

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];

    if (i === 0) {
      result = part;
      continue;
    }

    if (keywords.indexOf(part) !== -1) {
      result += part.toUpperCase();
      continue;
    }

    if (isNaN(part)) {
      result += part[0].toUpperCase();
      result += part.slice(1);
      continue;
    }

    result += part;
  }

  return result;
}
