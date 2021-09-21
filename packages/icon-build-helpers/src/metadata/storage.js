/**
 * Copyright IBM Corp. 2020, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

/**
 * Use the provided file adapter and directory information to load the given
 * set of extensions.
 * @param {Adapter} adapter
 * @param {string} directory
 * @param {Array<Extension>} [extensions]
 * @returns {Array<Extension>}
 */
function load(adapter, directory, extensions = []) {
  return Promise.all(
    extensions.map(async (extension) => {
      // If computed, the extension has no file that has been persisted to disk
      // so we don't have to load it.
      if (extension.computed) {
        return extension;
      }

      const data = await adapter.read(directory, extension.name);
      return {
        ...extension,
        data,
      };
    })
  );
}

/**
 * Use the provided file adapter and directory information to save the given
 * set of extensions.
 * @param {Adapter} adapter
 * @param {string} directory
 * @param {Array<Extension>} [extensions]
 * @returns {Array<Extension>}
 */
function save(adapter, directory, extensions = []) {
  return Promise.all(
    extensions.map((extension) => {
      // If the extension is computed, there is nothing to persist to disk
      if (extension.computed) {
        return;
      }
      return adapter.write(directory, extension.name, extension.data);
    })
  );
}

module.exports = {
  load,
  save,
};
