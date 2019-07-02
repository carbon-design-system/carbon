/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import warning from 'warning';

let didWarnAboutDeprecation = false;

export default function deprecate(propType) {
  function checker(props, propName, componentName, ...rest) {
    if (props[propName] === undefined) {
      return;
    }

    if (!didWarnAboutDeprecation) {
      didWarnAboutDeprecation = true;
      warning(
        false,
        `The prop \`${propName}\` has been deprecated for the ` +
          `${componentName} component. It will be removed in the next major ` +
          `release`
      );
    }

    return propType(props, propName, componentName, ...rest);
  }

  return checker;
}
