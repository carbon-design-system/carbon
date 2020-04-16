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
const Registry = require('../registry');
const Storage = require('./storage');
const validate = require('./validate');

/**
 * Validate the given extensions against the assets found in a directory
 * @param {object} options
 * @param {Adapter} [options.adapter] The adapter to use to load the extensions
 * @param {string} options.input The directory of source files
 * @param {Array<Extension>} [options.extensions] The extensions to load
 * @returns {Promise<void>}
 */
async function check({
  adapter = adapters.yml,
  input,
  extensions = [Extensions.icons],
}) {
  const registry = await Registry.create(path.join(input, 'svg'));
  const loaded = await Storage.load(adapter, input, extensions);
  validate(registry, loaded);
}

/**
 * Build the metadata for the assets in the given directory with a given list of
 * extensions and write it to disk
 * @param {object} options
 * @param {Adapter} [options.adapter] The adapter to use to load the extensions
 * @param {string} options.input The directory of source files
 * @param {string} [options.output] The directory for the built metadata
 * @param {Array<Extension>} [options.extensions] The extensions to load
 * @returns {Promise<void>}
 */
async function build({
  adapter = adapters.yml,
  extensions = [Extensions.icons],
  input,
  output = input,
}) {
  const registry = await Registry.create(path.join(input, 'svg'));
  const loaded = await Storage.load(adapter, input, extensions);
  validate(registry, loaded);

  const metadataFilePath = path.join(output, 'metadata.json');
  const metadata = {};
  const context = {
    input,
  };

  // For each extension, extend the icon metadata with the given loaded data
  // for the extension
  for (const { data, extend } of loaded) {
    if (extend) {
      extend(metadata, data, registry, context);
    }
  }

  await fs.ensureFile(metadataFilePath);
  await fs.writeJson(metadataFilePath, metadata, {
    spaces: 2,
  });
}

/**
 * Load the metadata for the assets in the given directory with a given list of
 * extensions and return it
 * @param {object} options
 * @param {Adapter} [options.adapter] The adapter to use to load the extensions
 * @param {string} options.input The directory of source files
 * @param {string} [options.output] The directory for the built metadata
 * @param {Array<Extension>} [options.extensions] The extensions to load
 * @returns {Promise<object>}
 */
async function load({
  adapter = adapters.yml,
  extensions = [Extensions.icons],
  input,
}) {
  const registry = await Registry.create(path.join(input, 'svg'));
  const loaded = await Storage.load(adapter, input, extensions);
  validate(registry, loaded);

  const metadata = {};
  const context = {
    input,
  };

  // For each extension, extend the icon metadata with the given loaded data
  // for the extension
  for (const { data, extend } of loaded) {
    if (extend) {
      extend(metadata, data, registry, context);
    }
  }

  return metadata;
}

/**
 * Help generate metadata info for icons that have an asset (.svg) but no
 * metadata information
 * @param {object} options
 * @param {Adapter} [options.adapter] The adapter to use to write data
 * @param {string} options.input The directory of source files
 * @param {string} [options.output] The directory for the built metadata
 * @param {Array<Extension>} [options.extensions]
 * @returns {Promise<void>}
 */
async function scaffold({
  adapter = adapters.yml,
  input,
  output = input,
  extensions = [Extensions.icons],
}) {
  const registry = await Registry.create(path.join(input, 'svg'));
  const [icons] = await Storage.load(adapter, input, extensions);

  for (const item of registry.values()) {
    const match = icons.data.find(icon => item.id === icon.name);
    if (!match) {
      const metadata = {
        name: item.id,
        friendly_name: item.id,
        aliases: [],
      };
      const sizes = item.assets
        .map(asset => asset.size)
        .filter(size => {
          return size !== undefined;
        });

      if (sizes.length > 0) {
        metadata.sizes = sizes;
      }

      icons.data.push(metadata);
    }
  }

  icons.data.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });

  await Storage.save(adapter, output, [icons]);
}

module.exports = {
  // Data associated with storing and adding metadata information
  adapters,
  extensions: Extensions,

  // Commands to run for icon packages
  build,
  check,
  load,
  scaffold,
};
