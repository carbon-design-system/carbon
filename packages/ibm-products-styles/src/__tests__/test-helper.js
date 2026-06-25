//
// Copyright IBM Corp. 2023, 2023
//
// This source code is licensed under the Apache-2.0 license found in the
// LICENSE file in the root directory of this source tree.
//

const { execFileSync } = require('child_process');
const { resolve } = require('path');

const r = (file) => resolve(__dirname, file);
const loadPath1 = r('../../../../node_modules');
const loadPath2 = r('../../../../../../node_modules');

/**
 * Check that an SCSS file compiles correctly. This function does not return
 * a value, but if the SCSS file does not compile it will throw an Error
 * containing details of the compilation failure.
 * @param {string} file fully qualified file name of the SCSS file to check.
 */
export const scssCheck = (file) => {
  // We use the sass cli because this is currently much faster than using
  // the API owing to the overhead of @import resolution through the API.
  // When the sass API is revised it may be feasible to switch back to
  // using the API for SCSS compilation and checking.
  execFileSync(
    'sass',
    [
      '--style=expanded',
      '--no-source-map',
      '--load-path',
      loadPath1,
      '--load-path',
      loadPath2,
      file,
    ],
    {
      stdio: ['ignore', 'ignore', 'pipe'],
    }
  );
};

/**
 * Compile an SCSS file, and return the compiled CSS as a String. If the SCSS
 * file does not compile this function will throw an Error containing details
 * of the compilation failure.
 * @param {string} file fully qualified file name of the SCSS file to compile.
 */
export const scssCompile = (file, compressed = false) =>
  // We use the sass cli because this is currently much faster than using
  // the API owing to the overhead of @import resolution through the API.
  // When the sass API is revised it may be feasible to switch back to
  // using the API for SCSS compilation and checking.
  execFileSync(
    'sass',
    [
      compressed ? '--style=compressed' : '--style=expanded',
      '--no-source-map',
      '--load-path',
      loadPath1,
      '--load-path',
      loadPath2,
      file,
    ],
    {
      stdio: ['ignore', 'pipe', 'pipe'],
      maxBuffer: 1024 * 1024 * 1.5,
    }
  ).toString();
