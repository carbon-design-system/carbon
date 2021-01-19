/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const sass = require('sass');

const defaultOptions = {
  includePaths: ['node_modules', '../../node_modules'],
};

function compile(filepaths, options) {
  return filepaths.map((file) => {
    return sass.renderSync({
      file,
      ...defaultOptions,
      ...options,
    });
  });
}

module.exports = compile;
