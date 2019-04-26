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

  /**
   * Support both object builder pattern and variadic arguments pattern. This
   * allows type builders to be called using `t.Identifer({ name: 'value' })`
   * alongside `t.Identifier('value')`.
   *
   * In some cases, the former syntax is preferred while in other situations
   * (particularly for primitive values) we would rather use the latter pattern.
   */
  function builder(...args) {
    let input = args;

    // If we are given a builder object, let's use that instead. The logic for
    // this can get tricky, so we are looking to see if we are given one
    // argument that is an object without a `type` annotation. This should be a
    // decent heuristic to toggle between when someone is using an object
    // builder versus passing in multiple arguments (or one argument in the case
    // of types with one field)
    if (
      args.length === 1 &&
      typeof args[0] === 'object' &&
      !Array.isArray(args[0]) &&
      args[0].type === undefined
    ) {
      input = args[0];
    }

    const node = {
      type,
    };

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const field = fields[key];
      const value = Array.isArray(input) ? input[i] : input[key];

      if (value !== undefined) {
        field.validate(value, node);
        node[key] = value;
        continue;
      }

      if (!field.optional && value === undefined) {
        throw new Error(
          `Expected field '${key}' to be defined for type ${type}`
        );
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
