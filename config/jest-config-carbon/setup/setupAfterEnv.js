/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const chalk = require('chalk');
const util = require('util');
const toHaveNoAxeViolations = require('../matchers/toHaveNoAxeViolations');
const toHaveNoACViolations = require('../matchers/toHaveNoACViolations');

require('@testing-library/jest-dom');

// We can extend `expect` using custom matchers as defined by:
// https://jest-bot.github.io/jest/docs/expect.html#expectextendmatchers
//
// As recommended by `jest-extended`
// (https://github.com/jest-community/jest-extended) we're going to place this
// inside of the `setupFilesAfterEnv` option for Jest. If we used the default
// `setupFiles` option, we would be unable to hook into the testing framework
// that is loaded in after those files are run.
//
// For more information, check out the docs here:
// https://jestjs.io/docs/en/configuration.html#setupfilesafterenv-array
expect.extend({
  toHaveNoAxeViolations,
  toHaveNoACViolations,
});

// Have our test suite throw an error if one of the below console methods are
// called when we are not expecting them. This is often helpful for React
// warnings that are fired with console.warn or console.error that we would want
// to address in order for the test suite to pass.
//
// By default, we will throw on console.error and console.warn. In CI, we'll
// also throw on console.log so no extraneous log statements make there way
// through.
//
// Inspired by the following setup from facebook/react
// https://github.com/facebook/react/blob/6250462bed19c9f18a8cf3c2b5fcaf9aba1df72b/scripts/jest/setupTests.js#L69
const consoleMethods = ['error', 'warn', process.env.CI && 'log'].filter(
  Boolean
);

for (const methodName of consoleMethods) {
  const unexpectedConsoleCallStacks = [];
  const patchedConsoleMethod = function (format, ...args) {
    const stack = new Error().stack;
    unexpectedConsoleCallStacks.push([
      stack.substr(stack.indexOf('\n') + 1),
      util.format(format, ...args),
    ]);
  };

  console[methodName] = patchedConsoleMethod;

  global.beforeEach(() => {
    if (unexpectedConsoleCallStacks.length > 0) {
      formatConsoleCallStack(unexpectedConsoleCallStacks, methodName);
    }
    unexpectedConsoleCallStacks.length = 0;
  });

  global.afterEach(() => {
    if (console[methodName] !== patchedConsoleMethod) {
      throw new Error(`Test did not restore a mock for console.${methodName}`);
    }

    if (unexpectedConsoleCallStacks.length > 0) {
      formatConsoleCallStack(unexpectedConsoleCallStacks, methodName);
    }
  });
}

function formatConsoleCallStack(unexpectedConsoleCallStacks, methodName) {
  const messages = unexpectedConsoleCallStacks.map(
    ([stack, message]) =>
      `${message}\n` +
      `${stack
        .split('\n')
        .map((line) => chalk.gray(line))
        .join('\n')}`
  );
  const message = `Expected test not to call ${chalk.bold(
    `console.${methodName}()`
  )}`;

  throw new Error(`${message}\n\n${messages.join('\n\n')}`);
}
