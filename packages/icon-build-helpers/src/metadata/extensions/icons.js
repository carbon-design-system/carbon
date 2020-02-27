/**
 * Copyright IBM Corp. 2020, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const Joi = require('joi');

/**
 * The default icons extension for the metadata. This validates an icon file
 * and adds icon information to the metadata file.
 * @type {Extension}
 */
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
      sizes: Joi.array().items(
        Joi.string().valid('glyph'),
        Joi.number().valid([16, 20, 24, 32])
      ),
      aliases: Joi.array(),
    })
  ),

  extend(metadata, data, registry) {
    metadata.icons = data.map(icon => {
      return {
        name: icon.name,
        friendlyName: icon.friendly_name,
        aliases: icon.aliases,
        sizes: icon.sizes,
      };
    });

    for (const entry of metadata.icons) {
      const icon = registry.get(entry.name);

      // Add namespace information for the icon
      if (Array.isArray(icon.namespace) && icon.namespace.length > 0) {
        entry.namespace = icon.namespace.join('/');
      }

      // We currently support bespoke assets called "glyphs". If there is no
      // size for an asset, then for icons we would call it a glyph. If the
      // entry in metadata does not already contain a mention of glyph, then
      // we'll add it in.
      for (const asset of icon.assets) {
        if (!asset.size && !entry.sizes.includes('glyph')) {
          entry.sizes.push('glyph');
        }
      }
    }
  },

  validate(registry, data) {
    // Our first step is to validate that all of the data listed in `data` are
    // available in the registry. This is useful to verify that:
    // 1. All assets in the registry are defined in the metadata
    // 2. No extra data are defined in the metadata that aren't in the source
    //    directory
    for (const item of registry.values()) {
      const metadata = data.find(icon => icon.name === item.id);
      if (!metadata) {
        const filepaths = item.assets.map(asset => asset.filepath).join('\n');
        throw new Error(
          `Expected the icon \`${item.id}\` to be defined in the data ` +
            `metadata file. Found matches for this asset in the following ` +
            `locations:\n\n` +
            filepaths
        );
      }

      // Verify that all the size information from the
      for (const size of metadata.sizes) {
        const match = item.assets.find(asset => {
          if (size === 'glyph') {
            return asset.size === undefined;
          }
          return asset.size === size;
        });
        if (!match) {
          throw new Error(
            `Expected the asset \`${item.id}\` to have the size ${size} ` +
              `defined. This asset may not exist, or is not available in the ` +
              `SVG folder`
          );
        }
      }

      for (const asset of item.assets) {
        const match = metadata.sizes.find(size => {
          if (asset.size === undefined) {
            return size === 'glyph';
          }
          return size === asset.size;
        });
        if (!match) {
          throw new Error(
            `Expected the entry \`${metadata.name}\` to have size ` +
              `\`${asset.size}\` defined. This asset exists at:\n` +
              asset.filepath
          );
        }
      }
    }

    for (const icon of data) {
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
