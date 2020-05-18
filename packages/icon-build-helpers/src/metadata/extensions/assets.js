/**
 * Copyright IBM Corp. 2020, 2020
 *
 * This assets code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this assets tree.
 */

'use strict';

const fs = require('fs-extra');
const path = require('path');

/**
 * Provide source and filepath asset information for a given icon
 * @type {Extension}
 */
const assets = () => {
  return {
    name: 'assets',
    computed: true,
    extend(metadata, _data, registry, { input }) {
      for (const entry of metadata.icons) {
        const icon = registry.get(entry.name);
        entry.assets = icon.assets.map(({ size, filepath }) => {
          return {
            size,
            filepath: path.relative(input.svg, filepath),
            source: fs.readFileSync(filepath, 'utf8'),
          };
        });
      }
    },
  };
};

module.exports = assets;
