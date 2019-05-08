/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const javascript = require('./javascript');
const scss = require('./scss');

const bundlers = new Map([['.js', javascript], ['.scss', scss]]);

module.exports = bundlers;
