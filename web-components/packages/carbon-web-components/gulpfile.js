/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

require('./gulp-tasks/build');
require('./gulp-tasks/clean');
require('./gulp-tasks/lint');
require('./gulp-tasks/test');

process.once('SIGINT', () => {
  process.exit(0);
});
