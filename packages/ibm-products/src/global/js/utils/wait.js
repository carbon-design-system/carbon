/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// utility function for an async timeout

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default wait;
