/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const sass = require('node-sass');

const defaultOptions = {
  includePaths: ['node_modules', '../../node_modules'],
};

function compile(filepaths, options) {
  return filepaths.map(
    filepath =>
      new Promise((resolve, reject) => {
        sass.render(
          {
            file: filepath,
            ...defaultOptions,
            ...options,
          },
          (error, result) => {
            if (error) {
              reject(error);
              return;
            }

            resolve({
              result,
              filepath,
              error,
            });
          }
        );
      })
  );
}

module.exports = compile;
