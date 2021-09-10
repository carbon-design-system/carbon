/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

function noop() {}

function assertAny() {
  return noop;
}

function assertDefined(node) {
  if (!node) {
    throw new Error(`Expected node of type ${node.type} to be defined`);
  }
}

function assertValueType(expected) {
  return (value) => {
    if (typeof value !== expected) {
      throw new TypeError(
        `Expected value to be of type ${expected}, instead ` +
          `received ${typeof value}`
      );
    }
  };
}

function assertType({ type }) {
  return (node) => {
    assertDefined(node);

    if (node.type !== type) {
      throw new TypeError(
        `Expected node to be of type ${type}, instead received: ` +
          `${node.type}`
      );
    }
  };
}

function assertOneOf(types) {
  return (value, node) => {
    const errors = [];
    for (let i = 0; i < types.length; i++) {
      try {
        types[i](value);
        return;
      } catch (error) {
        // Including this in case we have a program error instead of a TypeError
        if (!(error instanceof TypeError)) {
          throw error;
        }

        errors.push(error);
      }
    }

    throw new TypeError(
      `Expected node to match one of the expected types for ${node.type}.\n\n` +
        errors.map((error) => error.message).join('\n') +
        '\n'
    );
  };
}

function arrayOf(checkType) {
  return (nodes = [], node) => {
    for (let i = 0; i < nodes.length; i++) {
      checkType(nodes[i], node);
    }
  };
}

module.exports = {
  assertAny,
  assertDefined,
  assertOneOf,
  assertType,
  assertValueType,
  arrayOf,
};
