/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

module.exports = {
  reporter: {
    error: jest.fn(),
    header: jest.fn(),
    info: jest.fn(),
    log: jest.fn(),
    setLogLevel: jest.fn(),
    stack: jest.fn(),
    success: jest.fn(),
    verbose: jest.fn(),
  },
};
