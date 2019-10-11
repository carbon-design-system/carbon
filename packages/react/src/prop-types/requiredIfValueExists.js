/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * @param {Function} propType The original prop type checker.
 * @returns {Function} The new prop type checker for `onChange` that makes it required if `value` exists and `readOnly` does not exist.
 */
export default function requiredIfValueExists(propType) {
  return function check(props, propName, componentName, ...rest) {
    const { [propName]: onChange, value, readOnly } = props;
    const exists = onChange !== undefined;
    const valueExists = value !== undefined;
    if (__DEV__ && !exists && valueExists && !readOnly) {
      return new Error(
        `You provided a value prop to \`${componentName}\` without an \`onChange\` handler. ` +
          'This will render a read-only field. ' +
          'If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`.'
      );
    }
    return propType(props, propName, componentName, ...rest);
  };
}
