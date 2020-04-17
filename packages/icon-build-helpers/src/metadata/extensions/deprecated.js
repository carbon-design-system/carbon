/**
 * Copyright IBM Corp. 2020, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const Joi = require('joi');

// Supports a list of deprecated assets
//
// deprecated:
//   - name: asset-name-1
//   - name: asset-name-2
//
// In the future, we may want to include a reason for the deprecation, or a
// notice for what icon to use instead.
const deprecated = () => {
  return {
    name: 'deprecated',

    schema: Joi.object().keys({
      deprecated: Joi.array()
        .items(
          Joi.object().keys({
            name: Joi.string().required(),
            reason: Joi.string(),
          })
        )
        .required(),
    }),

    extend(metadata, data) {
      const { deprecated } = data;

      for (const icon of metadata.icons) {
        const entry = deprecated.find(({ name }) => name === icon.name);
        if (entry) {
          icon.deprecated = true;
          if (entry.reason) {
            icon.reason = entry.reason;
          }
        }
      }
    },

    validate(registry, data) {
      for (const icon of data.deprecated) {
        const entry = registry.has(icon.name);
        if (!entry) {
          throw new Error(
            `Expected the deprecated icon \`${icon.name}\` to exist. Either ` +
              `this icon does not exist, or is not available in the given SVG ` +
              `directory`
          );
        }
      }
    },
  };
};

module.exports = deprecated;
