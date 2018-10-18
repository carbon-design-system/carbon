'use strict';

const globNative = require('glob');

function glob(pattern, options = {}) {
  return new Promise((resolve, reject) => {
    globNative(pattern, options, (error, files) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(files);
    });
  });
}

module.exports = glob;
