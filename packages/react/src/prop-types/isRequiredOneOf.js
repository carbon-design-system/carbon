/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * @param {object<string, Function>} propTypes The list of type checkers, keyed by prop names.
 * @returns {object<string, Function>}
 *   The new prop type checkers that checks if one of the given props exist,
 *   in addition to the original type checkings.
 */
export default function isRequiredOneOf(propTypes) {
  const names = Object.keys(propTypes);
  const checker = (propType) => (props, propName, componentName, ...rest) => {
    if (__DEV__ && names.every((name) => typeof props[name] === 'undefined')) {
      return new Error(
        `${componentName} requires one of the following props: ${names.join(
          ', '
        )}`
      );
    }
    return propType(props, propName, componentName, ...rest);
  };
  return names.reduce(
    (o, name) => ({
      ...o,
      [name]: checker(propTypes[name]),
    }),
    {}
  );
}
