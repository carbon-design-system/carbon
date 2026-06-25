/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const { pkg } = require('./lib/settings.js');
const { component, feature } = pkg;

console.log('Components enabled by default\n', { component });

console.log('\n\nDefault feature flag values\n', { feature });
