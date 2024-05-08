/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { warning } from '../internal/warning';

const didWarnAboutDeprecation = {};

export default function deprecateValuesWithin(
  propType,
  message,
  allowedValues
) {
  return function checker(props, propName, componentName, ...rest) {
    if (props[propName] === undefined) {
      return;
    }

    if (
      !didWarnAboutDeprecation[componentName] ||
      !didWarnAboutDeprecation[componentName][propName]
    ) {
      didWarnAboutDeprecation[componentName] = {
        ...didWarnAboutDeprecation[componentName],
        [propName]: true,
      };

      if (allowedValues && !allowedValues.includes(props[propName])) {
        warning(
          false,
          message ||
            `In \`${componentName}\` component value for \`${propName}\` prop has been deprecated, It will be removed in the next major release. Allowed values is/are: ${allowedValues.join(
              ', '
            )}`
        );
      }
    }
    return propType(props, propName, componentName, ...rest);
  };
}
