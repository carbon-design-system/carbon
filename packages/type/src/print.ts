/**
 * Copyright IBM Corp. 2018, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

type PrintableBlock = Record<string, number | string>;

export const print = (block: PrintableBlock) => {
  return Object.keys(block).reduce((acc, key, index) => {
    // Short-circuit on the foreign key 'breakpoints'. This is used in our
    // tokens for fluid type and should not be printed. In the future, we should
    // tie this to media query outputs.
    if (key === 'breakpoints') {
      return acc;
    }

    const property = `${paramCase(key)}: ${block[key]};`;
    if (index === 0) {
      return property;
    }
    return acc + '\n' + property;
  }, '');
};

const paramCase = (string: string) => {
  let result = '';
  for (let i = 0; i < string.length; i++) {
    const character = string[i];
    if (character === character.toUpperCase()) {
      result += '-' + character.toLowerCase();
      continue;
    }
    result += character;
  }
  return result;
};
