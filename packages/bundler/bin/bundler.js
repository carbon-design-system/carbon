#!/usr/bin/env node

/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable no-var, no-console */
'use strict';

// Inspired by Create React App
// https://github.com/facebook/create-react-app/blob/next/packages/create-react-app/index.js

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  console.error(err);
});

var chalk = require('chalk');
var packageJson = require('../package.json');

var currentNodeVersion = process.versions.node;
var semver = currentNodeVersion.split('.');
var major = semver[0];

if (major < 8) {
  console.error(
    chalk.red(
      `You are running Node ${currentNodeVersion}.\n` +
        `${packageJson.name} requires Node 8 or higher, please update your ` +
        `version of Node.`
    )
  );
  process.exit(1);
}

var bundler = require('../src/bundler');

bundler(process).catch(error => {
  console.error(error);
  process.exit(1);
});
