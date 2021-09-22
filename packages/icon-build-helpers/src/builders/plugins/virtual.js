/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const path = require('path');

// Mirror of: https://github.com/rollup/rollup-plugin-virtual without the \0
// prefix which noops in a lot of plugins
const PREFIX = 'virtual:';

module.exports = function virtual(modules) {
  const resolvedIds = new Map();

  Object.keys(modules).forEach((id) => {
    resolvedIds.set(path.resolve(id), modules[id]);
  });

  return {
    name: 'virtual',

    resolveId(id, importer) {
      if (id in modules) {
        return PREFIX + id;
      }

      if (importer) {
        if (importer.startsWith(PREFIX)) {
          importer = importer.slice(PREFIX.length);
        }
        const resolved = path.resolve(path.dirname(importer), id);
        if (resolvedIds.has(resolved)) {
          return PREFIX + resolved;
        }
      }
    },

    load(id) {
      if (id.startsWith(PREFIX)) {
        id = id.slice(PREFIX.length);

        return id in modules ? modules[id] : resolvedIds.get(id);
      }
    },
  };
};
