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

/**
 * Validate the given extensions against the assets found in a directory
 * @param {object} options
 * @param {Adapter} [options.adapter] The adapter to use to load the extensions
 * @param {string} options.directory
 * @param {Array<Extension>} [options.extensions] The extensions to load
 * @returns {Promise<void>}
 */
async function check({
  adapter = adapters.yml,
  directory,
  extensions = [Extensions.icons],
}) {
  const registry = await Registry.create(path.join(directory, 'svg'));
  const loaded = await Storage.load(adapter, directory, extensions);
  validate(registry, loaded);
}

/**
 * Build the metadata for the assets in the given directory with a given list of
 * extensions
 * @param {object} options
 * @param {Adapter} [options.adapter] The adapter to use to load the extensions
 * @param {string} options.directory
 * @param {Array<Extension>} [options.extensions] The extensions to load
 * @returns {Promise<void>}
 */
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

  // For each extension, extend the icon metadata with the given loaded data
  // for the extension
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

/**
 * Help generate metadata info for icons that have an asset (.svg) but no
 * metadata information
 * @param {object} options
 * @param {Adapter} [options.adapter] The adapter to use to write data
 * @param {string} options.directory
 * @param {Array<Extension>} [options.extensions]
 * @returns {Promise<void>}
 */
async function scaffold({
  adapter = adapters.yml,
  directory,
  extensions = [Extensions.icons],
}) {
  const registry = await Registry.create(path.join(directory, 'svg'));
  const [icons] = await Storage.load(adapter, directory, extensions);

  for (const item of registry.values()) {
    const match = icons.data.find(icon => item.id === icon.name);
    if (!match) {
      const metadata = {
        name: item.id,
        friendly_name: item.id,
        aliases: [],
        sizes: item.assets.map(asset => asset.size),
      };
      icons.data.push(metadata);
    }
  }

  await Storage.save(adapter, directory, [icons]);
}

module.exports = {
  // Data associated with storing and adding metadata information
  adapters,
  extensions: Extensions,

  // Commands to run for icon packages
  build,
  check,
  scaffold,
};
