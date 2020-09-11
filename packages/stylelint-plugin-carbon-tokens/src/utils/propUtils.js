/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import parseToRegexOrString from './parseToRegexOrString';

const getPropSpec = (prop) => {
  // starts with / and has another /
  // or does not start with /
  // optionally folloed by <anything in angled brackets>

  let propSpec = false;

  const checkRegex = /^((\/[^/]*\/)|([^</[]+))(<([^>]*)>)*(\[([^]+)\])*/;

  const matches = checkRegex.exec(prop);

  if (matches && matches[1]) {
    propSpec = {
      prop: matches[1],
      test: parseToRegexOrString(matches[1]),
      range: matches[5], // 5 may be undefined
      valueCheck: parseToRegexOrString(matches[7]), // may be undefined
    };
  }

  return propSpec;
};

const checkProp = (prop2Check, includedProps) => {
  let propSpec = false;
  let result = false;

  for (const includedProp of includedProps) {
    propSpec = getPropSpec(includedProp);

    if (propSpec) {
      if (
        (propSpec.test.test && propSpec.test.test(prop2Check)) ||
        propSpec.test === prop2Check
      ) {
        // return first result that matches

        result = propSpec;
        break;
      }
    }
  }

  return result;
};

const parseRangeValue = (value, length) => {
  if (!value) {
    return value;
  }

  const _value = parseInt(value, 10);

  if (_value < 0) {
    // -ve from end

    return length + _value; // zero based
  } else {
    return _value - 1; // make it zero based
  }
};

export { getPropSpec, checkProp, parseRangeValue };
