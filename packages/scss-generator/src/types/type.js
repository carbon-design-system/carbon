/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

function defineType(type, { fields = {}, generate } = {}) {
  const keys = Object.keys(fields);

  if (typeof generate !== 'function') {
    throw new Error(`Expected a \`generate\` method for type \`${type}\``);
  }

  function builder(input = {}) {
    const node = {
      type,
    };

    for (const key of keys) {
      const field = fields[key];

      if (input[key]) {
        const value = input[key];

        field.validate(value, node);

        node[key] = value;
        continue;
      }

      if (!field.optional && input[key] === undefined) {
        throw new Error(`Expected field '${key}' to be defined`);
      }
    }

    return node;
  }

  return {
    builder,
    generate,
    type,
  };
}

module.exports = {
  defineType,
};
