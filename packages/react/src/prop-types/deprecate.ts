/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { warning } from '../internal/warning';

type PropValidator = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20071
  props: Record<string, any>,
  propName: string,
  componentName: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20071
  ...rest: any[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20071
) => any;

const warningCache = new Map<string, Set<string>>();

/**
 * Wraps a prop-type validator with a deprecation warning.
 *
 * @param propType - The original prop validator function.
 * @param message - Deprecation message.
 * @returns A new validator function that emits a warning the first time a
 *          deprecated prop is used.
 */
export const deprecate = (
  propType: PropValidator,
  message?: string
): PropValidator => {
  const checker: PropValidator = (props, propName, componentName, ...rest) => {
    if (typeof props[propName] === 'undefined') {
      return;
    }

    if (!warningCache.has(componentName)) {
      warningCache.set(componentName, new Set());
    }

    const warnedProps = warningCache.get(componentName);

    if (warnedProps && !warnedProps.has(propName)) {
      warnedProps.add(propName);
      warning(
        false,
        message ||
          `The prop \`${propName}\` has been deprecated for the ` +
            `${componentName} component. It will be removed in the next major ` +
            `release`
      );
    }

    return propType(props, propName, componentName, ...rest);
  };

  return checker;
};
