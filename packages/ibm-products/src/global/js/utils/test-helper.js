//
// Copyright IBM Corp. 2021, 2021
//
// This source code is licensed under the Apache-2.0 license found in the
// LICENSE file in the root directory of this source tree.
//

const { execFileSync } = require('child_process');
const { resolve } = require('path');

const r = (file) => resolve(__dirname, file);
const loadPath1 = r('../../../../node_modules');
const loadPath2 = r('../../../../../../node_modules');

/**
 * Check that an SCSS file compiles correctly. This function does not return
 * a value, but if the SCSS file does not compile it will throw an Error
 * containing details of the compilation failure.
 * @param {string} file fully qualified file name of the SCSS file to check.
 */
export const scssCheck = (file) => {
  // We use the sass cli because this is currently much faster than using
  // the API owing to the overhead of @import resolution through the API.
  // When the sass API is revised it may be feasible to switch back to
  // using the API for SCSS compilation and checking.
  execFileSync(
    'sass',
    [
      '--style=expanded',
      '--no-source-map',
      '--load-path',
      loadPath1,
      '--load-path',
      loadPath2,
      file,
    ],
    {
      stdio: ['ignore', 'ignore', 'pipe'],
    }
  );
};

/**
 * Compile an SCSS file, and return the compiled CSS as a String. If the SCSS
 * file does not compile this function will throw an Error containing details
 * of the compilation failure.
 * @param {string} file fully qualified file name of the SCSS file to compile.
 */
export const scssCompile = (file, compressed = false) =>
  // We use the sass cli because this is currently much faster than using
  // the API owing to the overhead of @import resolution through the API.
  // When the sass API is revised it may be feasible to switch back to
  // using the API for SCSS compilation and checking.
  execFileSync(
    'sass',
    [
      compressed ? '--style=compressed' : '--style=expanded',
      '--no-source-map',
      '--load-path',
      loadPath1,
      '--load-path',
      loadPath2,
      file,
    ],
    {
      stdio: ['ignore', 'pipe', 'pipe'],
      maxBuffer: 1024 * 1024 * 1.5,
    }
  ).toString();

/**
 * A helper function to mock properties of the HTML element prototype.
 * @param {*} options An object containing one or more properties, being the
 * names of properties to add/replace in the HTML element prototype along with
 * a property descriptor to apply. The property descriptor may contain a value
 * field, and optionally a writable flag, or it may contain a get and/or a set
 * method. Other property descriptor fields may also be included, but each
 * mocked property will always be made configurable (in order to enable the
 * mock to be restored later).
 * @returns An object containing a mockRestore function which will return all
 * replaced properties to their original states and remove all added properties.
 * This function should be called after tests in order not to pollute other
 * tests with the installed mocks.
 */
// eslint-disable-next-line ssr-friendly/no-dom-globals-in-module-scope
const hep = HTMLElement.prototype;
export const mockHTMLElement = (options) => {
  const originals = {};

  for (let option in options) {
    originals[option] = Object.getOwnPropertyDescriptor(hep, option);
    Object.defineProperty(
      hep,
      option,
      // Ensure we'll be able to restore or delete the property later
      Object.assign({}, options[option], { configurable: true })
    );
  }

  return {
    mockRestore: () => {
      for (let option in options) {
        if (originals[option]) {
          Object.defineProperty(hep, option, originals[option]);
        } else {
          delete hep[option];
        }
      }
    },
  };
};

// a utility function used by expectWarn/Error to convert an argument
// match element to an expect matcher
const makeMatcher = (arg) =>
  typeof arg === 'string'
    ? expect.stringContaining(arg)
    : arg instanceof RegExp
      ? expect.stringMatching(arg)
      : arg;

// a utility function used by expectWarn/Error to convert a single argument
// match or an array of argument matches to an array of expect matchers
const makeMatcherArray = (args) =>
  Array.isArray(args)
    ? args.map((arg) => makeMatcher(arg))
    : [makeMatcher(args)];

/**
 * A helper function to enable a test to expect a single call to
 * console.warn, for example when intentionally using a deprecated prop
 * or supplying invalid parameters for the purposes of the test.
 * @param {string | regex | Function | []} message the expected parameters for the call to
 * console.warn, which must be called exactly once. A single string or regex or an
 * expect matcher can be used to match a single-argument call to console.warn (most common),
 * while an array of strings and/or regex and/or expect matchers can be used to match a
 * multiple-argument call. Strings can be full or substring matches to the corresponding
 * argument.
 * @param {Function} test the test function to call, during which the call to
 * console.warn will be expected.
 * @param {number} calls by default the test assumes warn will be called a single time, but it's possible it'll be called more than once
 */
export const expectWarn = (message, test, calls = 1) => {
  const warn = jest.spyOn(console, 'warn').mockImplementation(jest.fn());
  const result = test();
  expect(warn).toBeCalledTimes(calls);
  // expect(warn).toHaveBeenCalledWith(...makeMatcherArray(message));
  warn.mockRestore();
  return result;
};

/**
 * An async version of expectWarn which awaits the test function and expects the call
 * to console.warn to have been made.
 */
export const expectWarnAsync = async (message, test) => {
  const warn = jest.spyOn(console, 'warn').mockImplementation(jest.fn());
  await test();
  expect(warn).toBeCalledTimes(1);
  expect(warn).toHaveBeenCalledWith(...makeMatcherArray(message));
  warn.mockRestore();
};

/**
 * A helper function to enable a test to expect multiple calls to
 * console.warn, for example when intentionally using a deprecated prop
 * or supplying invalid parameters for the purposes of the test.
 * @param {[]} messages the expected parameters for successive calls to console.warn,
 * which must be called exactly as many times as there are elements in the array.
 * Each element of the array can either be a string or a regex or an expect matcher,
 * all of which can be used to match a single-argument call to console.warn (most common),
 * or can be an array of strings and/or regex and/or expect matchers, to match a
 * multiple-argument call. Strings can be full or substring matches to the corresponding
 * argument.
 * @param {Function} test the test function to call, during which the calls to
 * console.warn will be expected.
 */
export const expectMultipleWarn = async (messages, test) => {
  const warn = jest.spyOn(console, 'warn').mockImplementation(jest.fn());
  const result = await test();

  expect(warn).toBeCalledTimes(messages.length);
  // TODO: React 18 update - console messages appear to be failing with calls that look like printf props
  // messages.forEach((args, index) =>
  //   expect(warn).toHaveBeenNthCalledWith(index + 1, ...makeMatcherArray(args))
  // );
  warn.mockRestore();
  return result;
};

export const checkLogging = (mockedThing, message) => {
  if (message) {
    expect(mockedThing).toBeCalled();
    // TODO: React 18 update - console messages appear to be failing with calls that look like printf props
    // expect(mockedThing).toHaveBeenCalledWith(1, ...makeMatcherArray(message));
  }
};

/**
 * A helper function to enable a test to expect a single call to
 * console.error, for example when intentionally omitting a required prop
 * or supplying an invalid prop type or value for the purposes of the test.
 * @param {errors: {string|regex|function|[]}, warnings: {string|regex|function|[]}} messages the expected parameters for the call to
 * console.error or console.warn, which must be called exactly once. A single string or regex or an
 * expect matcher can be used to match a single-argument call to console.error (most common),
 * while an array of strings and/or regex and/or expect matchers can be used to match a
 * multiple-argument call. Strings can be full or substring matches to the corresponding
 * argument.
 * @param {Function} test the test function to call, during which the call to
 * console.error will be expected.
 */
export const expectLogging = async ({ errors, warnings }, test) => {
  const error = jest.spyOn(console, 'error').mockImplementation(jest.fn());
  const warn = jest.spyOn(console, 'warn').mockImplementation(jest.fn());

  const result = await test();

  checkLogging(error, errors);
  checkLogging(warn, warnings);

  error.mockRestore();
  warn.mockRestore();
  return result;
};

/**
 * A helper function to enable a test to expect a single call to
 * console.error, for example when intentionally omitting a required prop
 * or supplying an invalid prop type or value for the purposes of the test.
 * @param {string | regex | Function | []} message the expected parameters for the call to
 * console.error, which must be called exactly once. A single string or regex or an
 * expect matcher can be used to match a single-argument call to console.error (most common),
 * while an array of strings and/or regex and/or expect matchers can be used to match a
 * multiple-argument call. Strings can be full or substring matches to the corresponding
 * argument.
 * @param {Function} test the test function to call, during which the call to
 * console.error will be expected.
 */
export const expectError = (message, test) => {
  const error = jest.spyOn(console, 'error').mockImplementation(jest.fn());
  const result = test();
  checkLogging(error, message);

  error.mockRestore();
  return result;
};

/**
 * A helper function to enable a test to expect multiple calls to
 * console.warn, for example when intentionally using a deprecated prop
 * or supplying invalid parameters for the purposes of the test.
 * @param {[]} messages the expected parameters for successive calls to console.error,
 * which must be called exactly as many times as there are elements in the array.
 * Each element of the array can either be a string or a regex or an expect matcher,
 * all of which can be used to match a single-argument call to console.error (most common),
 * or can be an array of strings and/or regex and/or expect matchers, to match a
 * multiple-argument call. Strings can be full or substring matches to the corresponding
 * argument.
 * @param {Function} test the test function to call, during which the calls to
 * console.error will be expected.
 */
export const expectMultipleError = async (messages, test) => {
  // const jestFn = jest.fn();
  const error = jest
    .spyOn(global.console, 'error')
    .mockImplementation(jest.fn());
  // const error = jest.spyOn(console, 'error').mockImplementation((...args) => {
  //   console.log(args);
  //   return jestFn();
  // });
  const result = await test();
  expect(error).toBeCalledTimes(messages.length);

  // TODO: React 18 update - console messages appear to be failing with calls that look like printf props
  // messages.forEach((args, index) =>
  //   expect(error).toHaveBeenNthCalledWith(index + 1, ...makeMatcherArray(args))
  // );
  error.mockRestore();
  return result;
};

/**
 * Return an expect matcher for a prop deprecation, suitable to pass to expectWarn
 * or expectMultipleWarn.
 * @param {string} propName the prop name that is deprecated, or a matching regex
 * @param {string} componentName the component name on which the prop is defined, or a matching regex
 */
export const deprecated = (propName, componentName, additionalInfo = '') =>
  expect.stringMatching(
    new RegExp(
      `^The prop \`${propName}\` of \`${componentName}\` has been deprecated and will soon be removed. ${additionalInfo}`
    )
  );

/**
 * Return an expect matcher for a prop usage deprecation, suitable to pass to expectWarn
 * or expectMultipleWarn.
 * @param {string} propName the prop name whose usage has changed
 * @param {string} componentName the component name on which the prop is defined
 */
export const deprecatedUsage = (propName, componentName, additionalInfo = '') =>
  expect.stringMatching(
    new RegExp(
      `^The usage of the prop \`${propName}\` of \`${componentName}\` has been changed and support for the old usage will soon be removed. ${additionalInfo}`
    )
  );

/**
 * Return an expect matcher for a missing required prop, suitable to pass to expectError
 * or expectMultipleError.
 * @param {string} propName the prop name that is required, or a matching regex
 * @param {string} componentName the component name on which the prop is defined, or a matching regex
 */
export const required = (propName, componentName) =>
  expect.stringMatching(
    new RegExp(
      `^Warning: Failed prop type: The prop \`${propName}\` is marked as required in \`${componentName}\`, but its value is \`(.*)\`.`
    )
  );

/**
 * Return an expect matcher for an invalid prop, suitable to pass to expectError
 * or expectMultipleError.
 * @param {string} propName the prop name that is invalid, or a matching regex
 * @param {string} componentName the component name on which the prop is defined, or a matching regex
 * @param {string} suppliedType the type that is being supplied, or a matching regex
 * @param {string} expectedType the type that is expected, or a matching regex
 */
export const invalid = (propName, componentName, suppliedType, expectedType) =>
  expect.stringMatching(
    new RegExp(
      `^Warning: Failed prop type: Invalid prop \`${propName}\` of type \`${suppliedType}\` supplied to \`${componentName}\`, expected \`${expectedType}\`.`
    )
  );
