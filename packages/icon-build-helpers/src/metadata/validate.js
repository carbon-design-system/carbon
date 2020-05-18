/**
 * Copyright IBM Corp. 2020, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const Joi = require('joi');

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
      const { error } = Joi.validate(extension.data, extension.schema);
      if (error) {
        throw new Error(error.annotate());
      }
    }

    if (extension.validate) {
      extension.validate(registry, extension.data);
    }
  }
}

module.exports = validate;
