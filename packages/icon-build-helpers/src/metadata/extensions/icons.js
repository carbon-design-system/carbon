/**
 * Copyright IBM Corp. 2020, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const Joi = require('joi');

const icons = {
  name: 'icons',

  /**
   * The base schema for an icons.<format> file. Icons should have the following
   * fields defined when being authored in this file.
   */
  schema: Joi.array().items(
    Joi.object().keys({
      name: Joi.string().required(),
      friendly_name: Joi.string().required(),
      usage: Joi.string().required(),
      sizes: Joi.array().items(
        Joi.string().valid('glyph'),
        Joi.number().valid([16, 20, 24, 32])
      ),
      aliases: Joi.array(),
    })
  ),

  extend(metadata, data, registry) {
    // Add namespace information for the icon
    for (const entry of metadata.icons) {
      const icon = registry.get(entry.name);
      if (Array.isArray(icon.namespace) && icon.namespace.length > 0) {
        entry.namespace = icon.namespace;
      }
    }
  },

  validate(registry, icons) {
    // Our first step is to validate that all of the icons listed in `icons` are
    // available in the registry. This is useful to verify that:
    // 1. All assets in the registry are defined in the metadata
    // 2. No extra icons are defined in the metadata that aren't in the source
    //    directory
    for (const item of registry.values()) {
      const metadata = icons.find(icon => icon.name === item.id);
      if (!metadata) {
        const filepaths = item.assets.map(asset => asset.filepath).join('\n');
        throw new Error(
          `Expected the icon \`${item.id}\` to be defined in the icons ` +
            `metadata file. Found matches for this asset in the following ` +
            `locations:\n\n` +
            filepaths
        );
      }

      // Verify that all the size information from the
      for (const size of metadata.sizes) {
        const match = item.assets.find(asset => asset.size === size);
        if (!match) {
          throw new Error(
            `Expected the asset \`${item.id}\` to have the size ${size} ` +
              `defined. This asset may not exist, or is not available in the ` +
              `SVG folder`
          );
        }
      }

      for (const asset of item.assets) {
        const match = metadata.sizes.find(size => size === asset.size);
        if (!match) {
          throw new Error(
            `Expected the entry \`${metadata.name}\` to have size ` +
              `\`${asset.size}\` defined. This asset exists at:\n` +
              filepath
          );
        }
      }
    }

    for (const icon of icons) {
      if (!registry.has(icon.name)) {
        throw new Error(
          `Expected the metadata entry \`${icon.name}\` to have a ` +
            `corresponding .svg asset in the SVG folder`
        );
      }
    }
  },
};

module.exports = icons;
