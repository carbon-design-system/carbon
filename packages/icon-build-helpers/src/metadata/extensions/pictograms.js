/**
 * Copyright IBM Corp. 2020, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const Joi = require('joi');

/**
 * The default pictograms extension for the metadata. This validates a pictogram
 * file and adds pictogram information to the metadata file.
 * @type {Extension}
 */
const pictograms = {
  name: 'pictograms',

  schema: Joi.array().items(
    Joi.object().keys({
      name: Joi.string().required(),
      friendly_name: Joi.string().required(),
      aliases: Joi.array(),
    })
  ),

  extend(metadata, data, registry) {
    metadata.pictograms = data.map(pictogram => {
      return {
        name: pictogram.name,
        friendlyName: pictogram.friendly_name,
        aliases: pictogram.aliases,
        sizes: pictogram.sizes,
      };
    });

    for (const entry of metadata.pictograms) {
      const pictogram = registry.get(entry.name);

      // Add namespace information for the pictogram
      if (
        Array.isArray(pictogram.namespace) &&
        pictogram.namespace.length > 0
      ) {
        entry.namespace = pictogram.namespace.join('/');
      }
    }
  },

  validate(registry, data) {
    for (const item of registry.values()) {
      const metadata = data.find(pictogram => pictogram.name === item.id);
      if (!metadata) {
        const filepaths = item.assets.map(asset => asset.filepath).join('\n');
        throw new Error(
          `Expected the pictogram \`${item.id}\` to be defined in the data ` +
            `metadata file. Found matches for this asset in the following ` +
            `locations:\n\n` +
            filepaths
        );
      }

      // Verify that all the size information from the
      for (const size of metadata.sizes) {
        const match = item.assets.find(asset => {
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

    for (const pictogram of data) {
      if (!registry.has(pictogram.name)) {
        throw new Error(
          `Expected the metadata entry \`${pictogram.name}\` to have a ` +
            `corresponding .svg asset in the SVG folder`
        );
      }
    }
  },
};

module.exports = pictograms;
