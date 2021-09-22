/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Children } from 'react';
import createChainableTypeChecker from './tools/createChainableTypeChecker';
import getDisplayName from './tools/getDisplayName';

/**
 * `childrenOfType` is used for asserting that children of a given React
 * component are only of a given type. Currently, this supports React elements,
 * Stateless Functional Components, and Class-based components.
 *
 * This prop validator also supports chaining through `isRequired`
 */
const childrenOfType = (expectedChildType) => {
  const expectedDisplayName = getDisplayName(
    // Support both React elements and components by using `type` if it exists
    expectedChildType.type || expectedChildType
  );
  const validate = (props, propName, componentName) => {
    Children.forEach(props[propName], (child) => {
      if (!child) {
        return;
      }
      const childDisplayName = getDisplayName(child.type);
      if (
        child.type !== expectedChildType.type &&
        child.type !== expectedChildType
      ) {
        throw new Error(
          `Invalid prop \`children\` of type \`${childDisplayName}\` ` +
            `supplied to \`${componentName}\`, expected each child to be a ` +
            `\`${expectedDisplayName}\` component.`
        );
      }
    });
  };

  return createChainableTypeChecker(validate);
};

export default childrenOfType;
