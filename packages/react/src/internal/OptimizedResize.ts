/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Use `globalThis` for universal access to global object (browser, workers, Node).
const win = globalThis as Window & typeof globalThis;

/**
 * A callback function to be executed on `resize`.
 */
type Callback = () => void;

export const OptimizedResize = (() => {
  const callbacks: Callback[] = [];
  let running = false;

  const runCallbacks = () => {
    callbacks.forEach((callback) => {
      callback();
    });

    running = false;
  };

  const handleResize = () => {
    if (!running) {
      running = true;
      win.requestAnimationFrame(runCallbacks);
    }
  };

  const addCallback = (callback: Callback) => {
    const index = callbacks.indexOf(callback);
    if (index < 0) {
      callbacks.push(callback);
    }
  };

  return {
    /** Adds a callback function to be executed on window `resize`. */
    add: (callback: Callback) => {
      if (!callbacks.length) {
        win.addEventListener('resize', handleResize);
      }
      addCallback(callback);
      return {
        /** Removes the callback. */
        remove: () => {
          const index = callbacks.indexOf(callback);
          if (index >= 0) {
            callbacks.splice(index, 1);
          }
        },
      };
    },
  };
})();
