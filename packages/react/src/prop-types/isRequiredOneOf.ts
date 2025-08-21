/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Validator, ValidationMap } from 'prop-types';

/**
 * Returns a set of prop-type validators that enforce at least one of the
 * specified props must be provided.
 *
 * @param propTypes - An object of prop-type validators. The keys of the object
 *    are the names of the props, and the values are the prop-type validators.
 * @returns A new object of wrapped prop-type validators.
 */
export const isRequiredOneOf = <T extends Record<string, Validator<any>>>(
  propTypes: T
): ValidationMap<any> => {
  const names = Object.keys(propTypes);
  const checker =
    (propType: Validator<any>): Validator<any> =>
    (props, propName, componentName, ...rest) => {
      if (
        process.env.NODE_ENV !== 'production' &&
        names.every((name) => typeof props[name] === 'undefined')
      ) {
        return new Error(
          `${componentName} requires one of the following props: ${names.join(
            ', '
          )}`
        );
      }
      return propType(props, propName, componentName, ...rest);
    };
  return names.reduce(
    (acc, name) => ({
      ...acc,
      [name]: checker(propTypes[name]),
    }),
    {}
  );
};
