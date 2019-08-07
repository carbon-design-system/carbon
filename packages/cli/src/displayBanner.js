/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Display the banner in the console, typically at the beginning of a handler
 * @returns {void}
 */
function displayBanner() {
  console.log(`
                 _
                | |
   ___ __ _ _ __| |__   ___  _ __
  / __/ _\` | '__| '_ \\ / _ \\| '_ \\
 | (_| (_| | |  | |_) | (_) | | | |
  \\___\\__,_|_|  |_.__/ \\___/|_| |_|

`);
}

module.exports = displayBanner;
