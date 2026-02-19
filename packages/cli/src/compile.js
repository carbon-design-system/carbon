/**
 * Copyright IBM Corp. 2019, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as sass from 'sass';

const defaultOptions = {
  loadPaths: ['node_modules', '../../node_modules'],
};

export default function compile(filepaths, options = {}) {
  return filepaths.map((file) => {
    const { includePaths, ...rest } = options;
    const loadPaths =
      rest.loadPaths ?? includePaths ?? defaultOptions.loadPaths;
    return sass.compile(file, {
      ...defaultOptions,
      ...rest,
      loadPaths,
    });
  });
}
