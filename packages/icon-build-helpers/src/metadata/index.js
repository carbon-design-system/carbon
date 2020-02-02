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

  return metadata;
}

// Help generate metadata info for icons that have an asset (.svg) but no
// metadata information
async function scaffold({ adapter = adapters.yml, directory }) {
  const registry = await Registry.create(path.join(directory, 'svg'));
  const [icons] = await Storage.load(adapter, directory, [Extensions.icons]);

  for (const item of registry.values()) {
    const match = icons.data.find(icon => item.id === icon.name);
    if (!match) {
      const metadata = {
        name: item.id,
        friendly_name: item.id,
        usage: 'This is a description of usage',
        aliases: [],
        sizes: item.assets.map(asset => asset.size),
      };
      icons.data.push(metadata);
    }
  }

  await Storage.save(adapter, directory, [icons]);
}

module.exports = {
  adapters,
  build,
  check,
  extensions: Extensions,
  scaffold,
};
