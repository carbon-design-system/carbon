/**
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const logger = {
  setLevel: jest.fn(),
  log: jest.fn(),
};

const levels = ['error', 'warn', 'info', 'verbose', 'debug', 'silly'];

for (const level of levels) {
  logger[level] = jest.fn();
}

export { logger };
