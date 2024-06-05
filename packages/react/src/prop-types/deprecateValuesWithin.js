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
  allowedValues,
  propMappingFunction
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

      const deprecatedValue = props[propName];
      const newValue = propMappingFunction
        ? propMappingFunction(deprecatedValue)
        : null;

      if (allowedValues && !allowedValues.includes(deprecatedValue)) {
        const message = propMappingFunction
          ? `"${deprecatedValue}" is a deprecated value for the "${propName}" prop on the "${componentName}" component. Use "${newValue}" instead. "${deprecatedValue}" will be removed in the next major release.`
          : `"${deprecatedValue}" is a deprecated value for the "${propName}" prop on the "${componentName}" component. Allowed values is/are: ${allowedValues.join(
              ', '
            )}.  "${deprecatedValue}" will be removed in the next major release. `;

        warning(false, message);
      }
    }
    return propType(props, propName, componentName, ...rest);
  };
}
