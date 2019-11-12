/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * @param {Function} name The name of the prop that must exist to validate
 * the current prop.
 * @param {Function} propType The original prop type checker.
 * @returns {Function} The new prop type checker for the current prop that
 * becomes required if the prop corresponding to the provided prop name exists.
 */
export default function requiredIfGivenPropExists(name, propType) {
  return function check(props, propName, componentName, ...rest) {
    if (__DEV__ && props[name]) {
      return new Error(
        `You must provide a value for \`${propName}\` in \`${componentName}\` if \`${name}\` exists.`
      );
    }
    return propType(props, propName, componentName, ...rest);
  };
}
