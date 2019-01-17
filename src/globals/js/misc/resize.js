/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// mdn resize function

const optimizedResize = /* #__PURE__ */ (function optimizedResize() {
  const callbacks = [];
  let running = false;

  // run the actual callbacks
  function runCallbacks() {
    callbacks.forEach(callback => {
      callback();
    });

    running = false;
  }

  // fired on resize event
  function resize() {
    if (!running) {
      running = true;
      window.requestAnimationFrame(runCallbacks);
    }
  }

  // adds callback to loop
  function addCallback(callback) {
    if (callback) {
      const index = callbacks.indexOf(callback);
      if (index < 0) {
        callbacks.push(callback);
      }
    }
  }

  return {
    // public method to add additional callback
    add: callback => {
      if (!callbacks.length) {
        window.addEventListener('resize', resize);
      }
      addCallback(callback);
      return {
        release() {
          const index = callbacks.indexOf(callback);
          if (index >= 0) {
            callbacks.splice(index, 1);
          }
        },
      };
    },
  };
})();

export default optimizedResize;
