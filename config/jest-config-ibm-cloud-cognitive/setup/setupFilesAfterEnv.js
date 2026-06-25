/**
 * Copyright IBM Corp. 2020, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// `setupFilesAfterEnv` enables running the code immediately after the test framework has been installed in the environment - https://jestjs.io/docs/en/configuration.html#setupfilesafterenv-array

import '@testing-library/jest-dom';
import util from 'util';
import * as matchers from './matchers';

const reset = '\x1b[0m';
const gray = (str) => `\x1b[48;5;244m${str + reset}`;

// `expect` can be extended using custom matchers as per https://jest-bot.github.io/jest/docs/expect.html#expectextendmatchers
expect.extend(matchers);

// Our test suite will throw an error if one of the below console methods are
// called when we are not expecting them. This is often helpful for React
// warnings that are fired with console.warn or console.error that we would want
// to address in order for the test suite to pass.
//
// By default, we will throw on console.error and console.warn. In CI, we'll
// also throw on console.log so no extraneous log statements make their way
// through.
//
// Inspired by the following setup from facebook/react
// https://github.com/facebook/react/blob/6250462bed19c9f18a8cf3c2b5fcaf9aba1df72b/scripts/jest/setupTests.js#L69

const oldConsole = {};
['error', 'warn', process.env.CI && 'log'].filter(Boolean).forEach((method) => {
  const unexpectedConsoleCallStacks = [];

  oldConsole[method] = console[method];
  const newMethod = function (format, ...args) {
    const stack = new Error().stack;
    unexpectedConsoleCallStacks.push([
      stack.substr(stack.indexOf('\n') + 1),
      util.format(format, ...args),
    ]);
  };
  console[method] = newMethod;

  global.beforeEach(() => {
    unexpectedConsoleCallStacks.length = 0;
  });

  global.afterEach(() => {
    if (console[method] !== newMethod) {
      //throw new Error(
      //  `Test did not restore a mock for ${chalk.bold(`console.${method}()`)}`
      //);
    }

    if (unexpectedConsoleCallStacks.length > 0) {
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
