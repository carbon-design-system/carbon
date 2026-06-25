//
// Copyright IBM Corp. 2020, 2025
//
// This source code is licensed under the Apache-2.0 license found in the
// LICENSE file in the root directory of this source tree.
//
import pconsole from './pconsole';

// helper functions for component props

/**
 * Prepare a set of props, or prop types or default props, merging values
 * from one or more sets and optionally blocking keys which should not be
 * passed. Returns the prepared set of props. Does not modify any of the
 * objects passed.
 *
 * @param {{} | '' | ['']} values One or more sets of keys and values to be
 * merged, or names of keys to be blocked. Each parameter that is an object is
 * treated as keys and values to be merged, and each parameter that is a string
 * or an array of strings is treated as keys to be blocked.
 *
 * Examples:
 *   const props = { a: 3, c: 4, d: 5 };
 *
 *   * prepareProps(props) -> { a: 3, c: 4, d: 5 }
 *   * prepareProps(props, 'c') -> { a: 3, d: 5 }
 *   * prepareProps(props, ['a', 'c', 'e']) -> { d: 5 }
 *
 *   * prepareProps({ a: 1, b: 2 }, props) -> { a: 3, b: 2, c: 4, d: 5 }
 *   * prepareProps({ a: 1, b: 2 }, props, ['a', 'c']) -> { b: 2, d: 5 }
 *
 *   * prepareProps(props, { c: 6 }) -> { a: 3, c: 6, d: 5 }
 *   * prepareProps(props, 'a', { c: 6 }) -> { c: 6, d: 5 }
 */
export const prepareProps = (...values) => {
  // Convert any string or array arg into an object with nulls as values
  const toNulls = (arg) =>
    typeof arg === 'string'
      ? { [arg]: null }
      : Array.isArray(arg)
        ? Object.fromEntries(arg.map((key) => [key, null]))
        : arg;

  // Merge all the args from left to right
  const merged = Object.assign({}, ...values.map(toNulls));

  // Now strip any keys whose final value is null
  return Object.entries(merged).reduce((result, [key, value]) => {
    if (value !== null) {
      result[key] = value;
    }
    return result;
  }, {});
};

// Determine whether a named prop in a set of props has been given a value.
// null and undefined do not count as values, but anything else does. If the
// prop is 'children', then an array of null/undefined also does not count as
// a value, but anything else does.
const propHasValue = (props, propName) => {
  let result = props[propName] !== null && props[propName] !== undefined;

  if (result && propName === 'children' && Array.isArray(props[propName])) {
    result = false;
    for (let i = 0; !result && i < props[propName].length; i++) {
      result = props[propName][i] !== null && props[propName][i] !== undefined;
    }
  }

  return result;
};

/**
 * A prop-types type checker that marks a prop as deprecated.
 * @param {} validator The prop-types validator for the prop as it should be
 * used if it weren't deprecated. If this validator produces type checking
 * errors they will be reported as usual.
 * @param {*} additionalInfo One or more sentences to be appended to the
 * deprecation message to explain why the prop is deprecated and/or what should
 * be used instead.
 * @returns Any type checking error reported by the validator, or null.
 */
export const deprecateProp =
  (validator, additionalInfo) =>
  (props, propName, comp, loc, propFullName, secret) => {
    if (propHasValue(props, propName)) {
      pconsole.warn(
        `The ${loc} \`${
          propFullName || propName
        }\` of \`${comp}\` has been deprecated and will soon be removed. ${additionalInfo}`
      );
    }
    return validator(props, propName, comp, loc, propFullName, secret);
  };

/**
 * A function that returns a storybook argTypes object configured to remove deprecated
 * props from the storybook controls
 */
export const getDeprecatedArgTypes = (deprecatedProps) => {
  const keys = Object.keys(deprecatedProps);

  return keys.reduce(
    (acc, cur) => ((acc[cur] = { table: { disable: true } }), acc),
    {}
  );
};

/**
 * A prop-types validation function that takes an array of type checkers and
 * requires prop values to satisfy all of the type checkers. This can be useful
 * to combine custom validation functions with regular prop types, or for
 * combining inherited prop-types from another component with tighter
 * requirements.
 *
 * Examples:
 *
 * MyComponent.propTypes = {
 *
 *   foo: allPropTypes([
 *     customValidationFunction,
 *     PropTypes.arrayOf(
 *       PropTypes.shape({
 *         text: PropType.string
 *       })
 *     )
 *   ]),
 *
 *   kind: allPropTypes([
 *     Button.propTypes.kind,
 *     PropTypes.oneOf(['primary', 'secondary'])
 *   ]),
 *
 * }
 */
export const allPropTypes = pconsole.shimIfProduction((arrayOfTypeCheckers) => {
  if (!Array.isArray(arrayOfTypeCheckers)) {
    pconsole.error(
      'Warning: Invalid argument supplied to allPropTypes, expected an instance of array.'
    );
    return pconsole.noop;
  }

  for (let i = 0; i < arrayOfTypeCheckers.length; i++) {
    if (typeof arrayOfTypeCheckers[i] !== 'function') {
      pconsole.error(
        `Invalid argument supplied to allPropTypes. Expected an array of check functions, but received ${arrayOfTypeCheckers[i]} at index ${i}.`
      );
      return pconsole.noop;
    }
  }

  const checkType = (...args) => {
    let error = null;
    arrayOfTypeCheckers.some((checker) => (error = checker(...args)));
    return error;
  };

  checkType.isRequired = (props, propName, comp, loc, propFullName, secret) => {
    const prop = propFullName || propName;
    return props[prop] == null
      ? new Error(
          `The ${loc} \`${prop}\` is marked as required in \`${
            comp || '<<anonymous>>'
          }\`, but its value is \`${
            props[prop] === null ? 'null' : 'undefined'
          }\`.`
        )
      : checkType(props, prop, comp, loc, propFullName, secret);
  };

  return checkType;
});
