/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * @typedef Profiler
 * @property {Function} start - start a run for measuring the metric
 * @property {Function} stop - stop a run and report the results
 */

/**
 * Create a profiler to measure metrics and collect averages over time
 * @param {string} metric - the name of the metric to measure
 * @returns {Profiler}
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
