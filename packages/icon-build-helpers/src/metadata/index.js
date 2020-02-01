/**
 * Copyright IBM Corp. 2020, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const fs = require('fs-extra');
const path = require('path');
const adapters = require('./adapters');
const Extensions = require('./extensions');
const Registry = require('./registry');
const Storage = require('./storage');
const validate = require('./validate');

async function check({
  adapter = adapters.yml,
  directory,
  extensions = [Extensions.icons],
}) {
  const registry = await Registry.create(path.join(directory, 'svg'));
  const loaded = await Storage.load(adapter, directory, extensions);
  validate(registry, loaded);
}

async function build({
  adapter = adapters.yml,
  directory,
  extensions = [Extensions.icons],
}) {
  console.log('Building');
  const registry = await Registry.create(path.join(directory, 'svg'));
  const loaded = await Storage.load(adapter, directory, extensions);
  validate(registry, loaded);

  const metadataFilePath = path.join(directory, 'metadata.json');
  const metadata = {};

  // Add each decorator data to the metadata, decorator names should be unique
  for (const { data, name } of loaded) {
    // Decorators that are computed won't have any data associated with them
    // as they operate on the icon list in-memory versus saving any data to
    // disk.
    if (!data) {
      continue;
    }

    // Ergonomic check to see if the decorator has a top-level key that matches
    // its name. If so, we'll include the contents as a convenience instead of
    // duplicate the key. For example, instead of:
    //
    // { "aliases": { "aliases": [...] } }
    //
    // We'd have:
    //
    // { "aliases": [...] }
    metadata[name] = data[name] || data;
  }

  // For each decorator, decorate the icon metadata with the given loaded data
  // for the decorator
  for (const { data, extend } of loaded) {
    if (extend) {
      extend(metadata, data, registry);
    }
  }

  await fs.ensureFile(metadataFilePath);
  await fs.writeJson(metadataFilePath, metadata, {
    spaces: 2,
  });

  console.log('Done!');
  return metadata;
}

module.exports = {
  adapters,
  extensions: Extensions,

  build,
  check,

  // scaffold??
  scaffold() {},
};
