/**
 * Copyright IBM Corp. 2021, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * ibm-products specific Jest setupFilesAfterEnv.
 * Runs AFTER the test framework is installed.
 * Provides:
 *  - @testing-library/jest-dom matchers
 *  - ibm-products custom matchers (toBeAccessible, toHaveDevtoolsAttribute,
 *    toHaveNoAxeViolations, toHaveNoACViolations)
 *  - console.error/warn strict patching (throws on unexpected calls)
 *  - clearAllMocks after every test
 */

import '@testing-library/jest-dom';
import util from 'util';
import * as matchers from './jest/matchers/index.js';

expect.extend(matchers);

// Known false-positive: @floating-ui/react schedules a state update from a
// ref callback during React's commit phase. React 19 emits this warning even
// without IS_REACT_ACT_ENVIRONMENT set. It does not affect test correctness.
// https://github.com/floating-ui/floating-ui/issues/2840
const KNOWN_FALSE_POSITIVES = [
  'The current testing environment is not configured to support act(...)',
];

const oldConsole = {};
['error', 'warn', process.env.CI && 'log'].filter(Boolean).forEach((method) => {
  const unexpectedConsoleCallStacks = [];

  oldConsole[method] = console[method];
  const newMethod = function (format, ...args) {
    const message = util.format(format, ...args);
    if (KNOWN_FALSE_POSITIVES.some((known) => message.includes(known))) {
      return;
    }
    const stack = new Error().stack;
    unexpectedConsoleCallStacks.push([
      stack.substr(stack.indexOf('\n') + 1),
      message,
    ]);
  };
  console[method] = newMethod;

  global.beforeEach(() => {
    unexpectedConsoleCallStacks.length = 0;
  });

  global.afterEach(() => {
    if (unexpectedConsoleCallStacks.length > 0) {
      const gray = (str) => `\x1b[48;5;244m${str}\x1b[0m`;
      const messages = unexpectedConsoleCallStacks.map(
        ([stack, message]) =>
          `${message}\n` +
          `${stack
            .split('\n')
            .map((line) => gray(line))
            .join('\n')}`
      );
      const message = `Expected test not to call ${util.styleText(
        'bold',
        `console.${method}()`
      )}`;

      throw new Error(`${message}\n\n${messages.join('\n\n')}`);
    }
  });
});

global.afterEach(() => {
  jest.clearAllMocks();
});
