/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * `createChainableTypeChecker` is used inside of our custom prop validators to
 * add in chaining `isRequired` on a given prop validator.
 */
const createChainableTypeChecker = validate => {
  // `checkType` is borrowed heavily from the `prop-types` package
  const checkType = (isRequired, props, propName, componentName, location) => {
    if (props[propName] == null) {
      if (isRequired) {
        if (props[propName] === null) {
          return new Error(
            `The ${location} \`${propName}\` is marked as required in ` +
              `${componentName}, but its value is \`null\`.`
          );
        }
        return new Error(
          `The ${location} \`${propName}\` is marked as required in ` +
            `${componentName}, but its value is \`undefined\`.`
        );
      }
      return null;
    } else {
      return validate(props, propName, componentName, location);
    }
  };

  // By default, the validator will have `isRequired` set to false. However, we
  // also define the `isRequired` property on the validtor so that consumers can
  // chain their prop validator and assert that the property is required.
  let chainedCheckType = checkType.bind(null, false);
  chainedCheckType.isRequired = checkType.bind(null, true);

  return chainedCheckType;
};

export default createChainableTypeChecker;
