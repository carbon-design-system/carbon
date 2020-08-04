/*
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
*/
export function createProfiler(metric) {
  let total = 0;
  let runs = 0;
  let start = null;

  return {
    start() {
      start = Date.now();
      runs = runs + 1;
    },
    stop() {
      const elapsed = Date.now() - start;
      console.log(`Time to finish ${metric}: ${elapsed}ms`);

      total = total + elapsed;
      console.log(`Average time to finish ${metric}: ${total / runs}ms`);
    },
  };
}
