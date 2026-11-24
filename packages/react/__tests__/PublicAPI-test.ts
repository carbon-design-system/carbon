/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

import { beforeEach, expect, jest as mockJest, test } from '@jest/globals';
import { isValidElementType } from 'react-is';

const isValidFunctionElementType = (
  value: unknown
): value is (...args: never[]) => unknown =>
  typeof value === 'function' && isValidElementType(value);

const mapComponentToApi = (component: object): Record<string, unknown> => {
  const api: Record<string, unknown> = {};

  // Sort alphabetically
  const componentEntries = Object.entries(component).sort(([a], [b]) =>
    a < b ? -1 : a > b ? 1 : 0
  );

  componentEntries.forEach(([key, value]) => {
    // There are a couple of properties on components that we don't believe
    // are part of our API, such as `_` prefixed variables, or capture details
    // that are internal to a library-specific piece of functionality. For
    // example, React's context functionality.
    if (key[0] === '_') {
      return;
    }

    if (key === 'Consumer') {
      api[key] = 'React.Consumer';
      return;
    }

    if (key === 'Provider') {
      api[key] = 'React.Provider';
      return;
    }

    if (key === 'contextType') {
      api[key] = {
        $$typeof:
          typeof value === 'object' && value !== null && '$$typeof' in value
            ? value.$$typeof
            : undefined,
      };
      return;
    }

    // Handle components defined as fields on a component, for example
    // `ContainedList.ContainedListItem`.
    if (key !== 'render' && isValidFunctionElementType(value)) {
      api[key] = mapComponentToApi(value);
      return;
    }

    api[key] = value;
  });

  return api;
};

/**
 * In our Public API test, we try to identify each component and its
 * corresponding API. In order to get prop type information for components,
 * we'll need to first mock the `prop-types` package to correctly identify the
 * prop types when we create our snapshot in the test below.
 *
 * If you ended up on this test file because the corresponding snapshot failed,
 * this could mean the following:
 *
 * 1) You've made a change to the public API of a component. This could mean
 *    adding a prop type, or removing one, and is intended to make you aware
 *    that this change would require a corresponding semver change. Feel free
 *    to update the snapshot if you believe this is intended
 *
 * 2) You've updated details of a component like its `defaultProps` and want
 *    to double-check that this won't break existing usage of the component. If
 *    you have verified that this change won't break existing usage, feel free
 *    to update the snapshot
 *
 * 3) You've added a field to a component. This field is now considered part of
 *    the component's public API and this test will fail if it is changed in
 *    the future. If you feel like this field should not be a part of the API,
 *    either prefix it with an underscore or add an exception to the test
 *    below.
 *
 * For full details on our versioning policy, check out our versioning guide:
 * https://github.com/carbon-design-system/carbon/blob/main/docs/guides/versioning.md
 */

beforeEach(() => {
  mockJest.mock('prop-types', () => {
    const PropTypes: typeof import('prop-types') =
      mockJest.requireActual('prop-types');
    const primitive = [
      'array',
      'bool',
      'func',
      'number',
      'object',
      'string',
      'symbol',
      'node',
      'element',
      'elementType',
      'any',
    ] as const;

    const complex = [
      'arrayOf',
      'instanceOf',
      'objectOf',
      'oneOf',
      'oneOfType',
      'shape',
      'exact',
    ] as const;

    // We want to remap primitive prop types like PropTypes.string with a getter
    // function. This getter function should return the type of the prop type
    // and also specify the `isRequired` field so PropTypes.string.isRequired
    // works as intended
    for (const type of primitive) {
      Object.defineProperty(PropTypes, type, {
        get() {
          const value = {
            type,
          };
          Object.defineProperty(value, 'isRequired', {
            enumerable: false,
            get() {
              return {
                type,
                isRequired: true,
              };
            },
          });
          return value;
        },
      });
    }

    // For complex/chainable prop types, we'll redefine the value to a function
    // and have it return the prop type information as a result of calling the
    // prop-type. We'll also need to define the `isRequired` field similar to
    // how we used it in the primitive prop types
    for (const type of complex) {
      Object.assign(PropTypes, {
        [type]: (...args: unknown[]) => {
          const value = {
            type,
            args,
          };

          Object.defineProperty(value, 'isRequired', {
            enumerable: false,
            get: () => {
              return {
                type,
                args,
                isRequired: true,
              };
            },
          });

          return value;
        },
      });
    }

    return PropTypes;
  });
});

/**
 * We construct our public API by iterating through our entrypoint and finding
 * the components that we export and their corresponding API.
 */
test('Public API should only change with a semver change', async () => {
  mockJest.mock('../src/internal/deprecateFieldOnObject');

  const carbonReact = await import('../src');
  const publicApi = new Map<string, Record<string, unknown>>();

  // Sort alphabetically
  for (const [name, Component] of Object.entries(carbonReact).sort(
    ([a], [b]) => (a < b ? -1 : a > b ? 1 : 0)
  )) {
    publicApi.set(name, mapComponentToApi(Component));
  }

  expect(publicApi).toMatchSnapshot();
});
