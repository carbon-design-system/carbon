/**
 * Copyright IBM Corp. 2020, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const Joi = require('joi');
const { reporter } = require('@carbon/cli-reporter');

/**
 * Validate the given icons and extension metadata against the asset registry
 * and the base icon schema, alongside running custom validators for each
 * extension. This is a useful check to guarantee that icons exist in both the
 * source directory of SVG assets and in metadata and corresponding extensions.
 * @param {Registry} registry
 * @param {Array<Extension>} [extensions]
 * @returns {void}
 */
function validate(registry, extensions = []) {
  for (const extension of extensions) {
    if (extension.schema) {
      const { error, value } = Joi.validate(extension.data, extension.schema);
      if (error) {
        const failedAssets = error.details.map(({ path, message }) => ({
          index: path[0],
          message,
        }));
        reporter.error(`Unable to validate the ${extension.name} extension:`);
        failedAssets.forEach((asset) => {
          reporter.error(`Error: ${asset.message}`);
          reporter.info(JSON.stringify(value[asset.index], null, 2));
        });
        process.exit(1);
      }
    }

    if (extension.validate) {
      extension.validate(registry, extension.data);
    }
  }
}

module.exports = validate;
