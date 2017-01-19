// mdn resize function

const optimizedResize = (function optimizedResize() {
  const callbacks = [];
  let running = false;

  // run the actual callbacks
  function runCallbacks() {
    callbacks.forEach((callback) => {
      callback();
    });

    running = false;
  }

  // fired on resize event
  function resize() {
    if (!running) {
      running = true;

      if (window.requestAnimationFrame) {
        window.requestAnimationFrame(runCallbacks);
      } else {
        setTimeout(runCallbacks, 66);
      }
    }
  }

  // adds callback to loop
  function addCallback(callback) {
    if (callback) {
      callbacks.push(callback);
    }
  }

  return {
    // public method to add additional callback
    add: (callback) => {
      if (!callbacks.length) {
        window.addEventListener('resize', resize);
      }
      addCallback(callback);
    },
  };
}());

export default optimizedResize;
