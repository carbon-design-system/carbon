/**
 * Copyright IBM Corp. 2018, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const definitions = require('./definitions');

const types = Object.keys(definitions).reduce((acc, key) => {
  const { builder, type } = definitions[key];
  return {
    ...acc,
    [type]: builder,
  };
}, {});

module.exports = {
  definitions,
  types,
};
