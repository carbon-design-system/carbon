/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const formats = {
  js: 'javascript',
};

export const TokenFormat = {
  formats,

  convert({ name, format }) {
    if (format === formats.js) {
      const keywords = new Set(['ui']);

      return name
        .split('-')
        .map((part, index) => {
          if (index === 0) {
            return part;
          }

          if (keywords.has(part)) {
            return part.toUpperCase();
          }

          return part[0].toUpperCase() + part.slice(1);
        })
        .join('');
    }

    return name;
  },
};
