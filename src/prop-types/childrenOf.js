import { Children } from 'react';
import createChainableTypeChecker from './tools/createChainableTypeChecker';
import getDisplayName from './tools/getDisplayName';

/**
 * `childrenOf` is used for asserting that the children of a given React
 * component are of a given set of types. Currently, this will work with types
 * that are Stateless Functional and Class-based components
 *
 * This prop validator also supports chaining through `isRequired`
 */
const childrenOf = expectedChildTypes => {
  // Support both React elements and components by using `type` if it exists
  const expectedDisplayNames = expectedChildTypes
    .map(child => getDisplayName(child.type || child))
    .join(', ');

  const validate = (props, propName, componentName) => {
    Children.forEach(props[propName], child => {
      if (!child) {
        return;
      }
      const childDisplayName = getDisplayName(child.type || child);
      if (!expectedChildTypes.includes(child.type)) {
        throw new Error(
          `Invalid prop \`children\` of type \`${childDisplayName}\` ` +
            `supplied to \`${componentName}\`, expected each child to be one ` +
            `of: \`[${expectedDisplayNames}]\`.`
        );
      }
    });
  };

  return createChainableTypeChecker(validate);
};

export default childrenOf;
