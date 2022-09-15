/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const gulp = require('gulp');
const path = require('path');
const karma = require('karma');
const config = require('./config');

const { Server } = karma;
const { parseConfig } = karma.config;
const { cloptions, testsDir } = config;
const { browsers, debug, specs, keepalive, noPruneSnapshot, random, updateSnapshot, useExperimentalFeatures, verbose } =
  cloptions;

/**
 * Runs the unit tests
 *
 * @param {Function} done done callback
 */
function unit(done) {
  parseConfig(
    path.resolve(__dirname, '..', testsDir, 'karma.conf.js'),
    {
      singleRun: !keepalive,
      customConfig: {
        browsers, // We'll massage browser list in `karma.config.js`
        collectCoverage: !debug,
        noPruneSnapshot,
        specs,
        random,
        updateSnapshot,
        useExperimentalFeatures,
        verbose,
      },
    },
    { promiseConfig: true, throwErrors: true }
  ).then(karmaConfig => {
    const server = new Server(karmaConfig, () => {
      done();
    });
    server.start();
  });
}

gulp.task('test:unit', unit);
gulp.task('test', gulp.task('test:unit'));
