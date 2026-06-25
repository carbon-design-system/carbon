/**
 * Copyright IBM Corp. 2020, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import path from 'path';

// This is a custom Jest transformer turning file imports into filenames.
// https://jestjs.io/docs/upgrading-to-jest28#transformer

export default {
  process(sourceText, sourcePath) {
    return {
      code: `module.exports = ${JSON.stringify(path.basename(sourcePath))};`,
    };
  },
};
