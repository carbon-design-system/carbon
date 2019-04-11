/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { definitions } = require('../types');
const { createPrinter } = require('./printer');

function generate(ast) {
  const printer = createPrinter(definitions);

  printer.print(ast);

  return {
    code: printer.get(),
  };
}

module.exports = {
  generate,
};
