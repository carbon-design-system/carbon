/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { topology } = require('./DependencyGraph');

const Scheduler = {
  create(graph) {
    const pending = new Set(topology(graph));
    const completed = new Set();
    const running = new Set();

    function canSchedule(id) {
      if (completed.has(id)) {
        return false;
      }
      if (running.has(id)) {
        return false;
      }
      const entry = graph.get(id);
      return entry.dependencies.every((dependencyId) => {
        return completed.has(dependencyId);
      });
    }

    return {
      run(getJobHandler) {
        return new Promise((resolve, reject) => {
          async function schedule() {
            if (pending.size === 0) {
              resolve();
              return;
            }

            const jobsToSchedule = [];
            for (const id of pending) {
              if (canSchedule(id)) {
                jobsToSchedule.push(id);
              }
            }

            for (const id of jobsToSchedule) {
              running.add(id);
              getJobHandler(id)
                .then(() => {
                  running.delete(id);
                  completed.add(id);
                  pending.delete(id);
                  schedule();
                })
                .catch(reject);
            }
          }

          schedule();
        });
      },
    };
  },
};

module.exports = {
  Scheduler,
};
