/**
 * Copyright IBM Corp. 2020, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

/**
 * @typedef {object} Extension
 * @property {string} name - the name of the extension
 * @property {JoiSchema} [schema] - a schema that validates the structure of
 * the file for an extension
 * @property {Function} [extend] - add information for the extension to the
 * output metadata structure
 * @property {Function} [validate] - validate that the data available in the
 * registry matches the data received for the extension
 */

/**
 * @typedef {Function} ExtensionBuilder
 * @param {object} config
 * @returns {Extension}
 */

/**
 * @param {Extension} extension
 * @returns {void}
 */
function validate(extension) {
  if (!extension.name) {
    throw new Error(
      `Expected extension to have a name, instead received: \`${extension.name}\``
    );
  }
}

/**
 * @param {(ExtensionBuilder | [Extension, object])} builderOrOptions
 * @returns {Extension}
 */
function loadExtension(builderOrOptions) {
  if (Array.isArray(builderOrOptions)) {
    const [builder, options] = builderOrOptions;
    const extension = builder(options);
    validate(extension);
    return extension;
  }
  const extension = builderOrOptions();
  validate(extension);
  return extension;
}

/**
 * @param {Array<ExtensionBuilder | [Extension, object]>} [builderOrOptions]
 * @returns {Array<Extension>}
 */
function load(builderOrOptions = []) {
  const extensions = builderOrOptions.map(loadExtension);
  const runOrder = [];

  function order(extension) {
    const match = runOrder.find((entry) => entry.name === extension.name);
    if (match) {
      return;
    }

    if (Array.isArray(extension.before)) {
      extension.before.map(loadExtension).forEach(order);
    }

    runOrder.push(extension);
  }

  extensions.forEach(order);

  return runOrder;
}

module.exports = {
  load,
};
