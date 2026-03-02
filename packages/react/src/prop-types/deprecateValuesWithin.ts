/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Requireable, Validator } from 'prop-types';
import { warning } from '../internal/warning';

type DeprecationTracker = Record<string, Record<string, boolean>>;

const didWarnAboutDeprecation: DeprecationTracker = {};

export const deprecateValuesWithin = <T>(
  propType: Requireable<T>,
  allowedValues?: readonly unknown[],
  propMappingFunction?: (deprecatedValue: T) => T
): Validator<T> | Requireable<T> => {
  return (props, propName, componentName, ...rest) => {
    if (typeof props[propName] === 'undefined') {
      return null;
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
};
