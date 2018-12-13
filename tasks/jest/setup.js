'use strict';

global.requestAnimationFrame = function requestAnimationFrame(callback) {
  setTimeout(callback);
};
