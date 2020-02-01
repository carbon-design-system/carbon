/**
 * Copyright IBM Corp. 2020, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const fs = require('fs-extra');
const path = require('path');

function load(adapter, directory, extensions = []) {
  return Promise.all(
    extensions.map(async extension => {
      // If computed, the extension has no file that has been persisted to disk
      // so we don't have to load it.
      if (extension.computed) {
        return extension;
      }

      const filepath = path.join(
        directory,
        adapter.getFilenameFor(extension.name)
      );
      if (!(await fs.pathExists(filepath))) {
        throw new Error(
          `Unable to find extension \`${extension.name}\` at filepath: ` +
            `${filepath}`
        );
      }
      const data = adapter.deserialize(await fs.readFile(filepath, 'utf8'));
      return {
        ...extension,
        data,
      };
    })
  );
}

function save(adapter, directory, extensions = []) {
  return Promise.all(
    extensions.map(async extension => {
      if (extension.computed) {
        return;
      }

      const filepath = path.join(
        directory,
        adapter.getFilenameFor(extension.name)
      );
      await fs.ensureFile(filepath);
      await fs.writeFile(filepath, adapter.serialize(data), 'utf8');
    })
  );
}

module.exports = {
  load,
  save,
};
