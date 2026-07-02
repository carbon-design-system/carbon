/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { warning } from '../internal/warning';

export const deprecateFieldOnObject = <T extends { displayName?: string }>(
  object: T,
  field: string,
  Component: { displayName?: string; name?: string },
  message?: string
) => {
  const didWarnAboutDeprecation: Record<string, boolean> = {};

  Object.defineProperty(object, field, {
    enumerable: true,
    get: () => {
      if (!didWarnAboutDeprecation[field]) {
        warning(
          false,
          message ||
            `The ${field} field has been deprecated on the ${object.displayName} object. ` +
              `Please import and use ${
                Component.displayName || Component.name || 'the field'
              } directly.`
        );
        didWarnAboutDeprecation[field] = true;
      }

      return Component;
    },
  });
};
