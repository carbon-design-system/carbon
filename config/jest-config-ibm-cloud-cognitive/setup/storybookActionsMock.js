/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Mock for storybook/actions to support Jest tests with Storybook 10 (ESM-only)
 * This provides a simple mock that returns a jest.fn() for the action function
 */

export const action = (name) => {
  const fn = jest.fn();
  fn.mockName = name;
  return fn;
};
