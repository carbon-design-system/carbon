/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const react = require('./react/builder');
const svg = require('./svg');
const vanilla = require('./vanilla');
const vue = require('./vue');

const builders = {
  react: {
    run: react,
  },
  svg: {
    run: svg,
  },
  vanilla: {
    run: vanilla,
  },
  vue: {
    run: vue,
  },
};

module.exports = builders;
