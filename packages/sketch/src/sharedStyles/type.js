/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { formatTokenName } from '@carbon/themes';
import { styles } from '@carbon/type';
import { SharedStyle } from 'sketch/dom';
import { syncSharedStyle } from '../tools/sharedStyles';

const fontWeightTable = {
  // Light
  300: 3,
  // Regular
  400: 4,
  // Medium
  500: 6,
  // Semi-bold
  600: 8,
  // Bold
  700: 9,
};
const expressiveTokens = new Set(['display', 'quotation', 'expressive']);

/**
 * Sync text shared styles to the given document and return the result
 * @param {Document} document
 * @returns {Array<SharedStyle>}
 */
export function syncTextStyles(document) {
  return Object.keys(styles)
    .filter((token) => {
      for (const pattern of expressiveTokens) {
        if (token.includes(pattern)) {
          return false;
        }
      }
      return true;
    })
    .map((token) => {
      const name = formatSharedStyleName(token);
      const style = convertTypeStyle(token, styles[token]);
      const sharedTextStyle = syncSharedStyle({
        document,
        name,
        style,
        styleType: SharedStyle.StyleType.Text,
      });

      sharedTextStyle.style.textColor = '#000000ff';
      sharedTextStyle.style.borders = [];

      return sharedTextStyle;
    });
}

/**
 * Format the given token to a value for a shared style name
 * @param {string} token
 * @returns {string}
 */
function formatSharedStyleName(token) {
  const parts = formatTokenName(token).split('-');
  if (parts.length === 2) {
    return parts.join('-');
  }

  const [category, name, grade] = parts;
  if (category !== 'productive') {
    return parts.join('-');
  }

  return `${category}/${name}-${grade}`;
}

/**
 * Convert a given token and its style to a format used by Sketch
 * @param {string} token
 * @param {object} style
 * @returns {object}
 */
function convertTypeStyle(token, style) {
  const fontSize = parseFloat(style.fontSize, 10) * 16;
  const fontWeight = fontWeightTable[style.fontWeight];
  const fontFamily = token.includes('code') ? 'IBM Plex Mono' : 'IBM Plex Sans';
  const kerning = parseFloat(style.letterSpacing, 10);
  const lineHeight = parseFloat(style.lineHeight, 10) * 16;

  return {
    fontFamily,
    fontSize,
    fontWeight,
    kerning,
    lineHeight,
  };
}
