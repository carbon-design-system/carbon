/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import Color from 'color';

/**
 * Adjust a given token's lightness by a specified percentage
 * Example: token = hsl(10, 10, 10);
 * adjustLightness(token, 5) === hsl(10, 10, 15);
 * adjustLightness(token, -5) === hsl(10, 10, 5);
 */
export const adjustLightness = (token: string, shift: number) => {
  const original = Color(token).hsl().object();

  return Color({ ...original, l: (original.l += shift) })
    .round()
    .hex()
    .toLowerCase();
};

/**
 * Adjust a given token's alpha by a specified amount
 * Example: token = rgba(10, 10, 10, 1.0);
 * adjustAlpha(token, 0.3) === rgba(10, 10, 10, 0.3);
 */
export const adjustAlpha = (token: string, alpha: number) => {
  return Color(token).rgb().alpha(alpha).string();
};

const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

/**
 * Format a given token into the format expected in CSS/SCSS-based projects.
 */
export const formatTokenName = (token: string) => {
  let string = '';

  for (let i = 0; i < token.length; i++) {
    // If we run into a number, we hit the scale step at the end of a token name
    // and can safely truncate the rest of the token
    if (numbers.indexOf(token[i]) !== -1) {
      string += '-' + token.slice(i);
      break;
    }

    // When encountering an uppercase name, we will want to start adding `-`
    // between words
    if (token[i] === token[i].toUpperCase()) {
      // Check backwards to see if previous letter was also capitalized, if so
      // we are in a special case like UI where each piece should be connected
      if (token[i - 1] && token[i - 1] === token[i - 1].toUpperCase()) {
        string += token[i].toLowerCase();
        continue;
      }

      // Otherwise, just concatenate this new part on to the existing string
      string += '-' + token[i].toLowerCase();
      continue;
    }

    // By default, we add the current character to the output string
    string += token[i];
  }

  return string;
};
