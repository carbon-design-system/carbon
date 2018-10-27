'use strict';

const path = require('path');
const sass = require('node-sass');

const defaultOptions = {
  includePaths: ['node_modules', '../../node_modules'],
};

function compile(filepaths, options) {
  return filepaths.map(
    filepath =>
      new Promise((resolve, reject) => {
        sass.render(
          {
            file: filepath,
            ...defaultOptions,
            ...options,
          },
          (error, result) => {
            resolve({
              result,
              filepath,
              error,
            });
          }
        );
      })
  );
}

module.exports = compile;
