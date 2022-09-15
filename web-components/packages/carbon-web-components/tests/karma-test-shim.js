/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// For generating coverage report for untested files
const srcContext = require.context('../src/components', true, /^(?!.*story(-(angular|react|vue))?).*\.ts$/);
srcContext.keys().forEach(srcContext);

const specContext = require.context('.', true, /_spec\.ts$/);
specContext.keys().forEach(specContext);
