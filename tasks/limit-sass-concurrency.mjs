/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const sass = require('sass');

let patched = false;

/**
 * Keep Sass compilations from running all at once.
 *
 * Vite 8 compiles SCSS on the main thread and ignores
 * `css.preprocessorMaxWorkers` for that compiler. A Storybook build transforms
 * every component stylesheet concurrently, and each Carbon stylesheet keeps a
 * large Sass module graph until it finishes. That peak happens while Vite is
 * still logging "transforming...", which is when a memory-capped builder kills
 * the process.
 *
 * Set `STORYBOOK_SASS_CONCURRENCY` to raise the cap, or to `0` to leave
 * compilations uncapped. The default cap is 1.
 */
export function limitSassConcurrency() {
  if (patched) {
    return;
  }
  patched = true;

  const fromEnv = process.env.STORYBOOK_SASS_CONCURRENCY;
  if (fromEnv === '0') {
    return;
  }

  let max = 1;
  if (fromEnv != null && fromEnv !== '') {
    const parsed = Number(fromEnv);
    if (Number.isFinite(parsed) && parsed >= 1) {
      max = Math.floor(parsed);
    }
  }

  if (!Number.isFinite(max) || max < 1) {
    return;
  }

  const original = sass.AsyncCompiler.prototype.compileStringAsync;
  /** @type {{ run: () => Promise<unknown>, resolve: (value: unknown) => void, reject: (error: unknown) => void }[]} */
  const queue = [];
  let active = 0;

  const drain = () => {
    while (active < max && queue.length > 0) {
      const job = queue.shift();
      active += 1;
      Promise.resolve()
        .then(job.run)
        .then(job.resolve, job.reject)
        .finally(() => {
          active -= 1;
          drain();
        });
    }
  };

  sass.AsyncCompiler.prototype.compileStringAsync =
    function compileStringAsyncLimited(...args) {
      return new Promise((resolve, reject) => {
        queue.push({
          run: () => original.apply(this, args),
          resolve,
          reject,
        });
        drain();
      });
    };
}
