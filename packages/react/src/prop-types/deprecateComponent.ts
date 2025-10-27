/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { warning } from '../internal/warning';

const didWarnAboutDeprecation: Record<string, boolean> = {};

export const deprecateComponent = (componentName: string, message?: string) => {
  if (!componentName) {
    return;
  }

  if (!didWarnAboutDeprecation[componentName]) {
    didWarnAboutDeprecation[componentName] = true;

    warning(
      false,
      message ||
        `The ${componentName} component has been deprecated and will be removed in the next major release.`
    );
  }

  return componentName;
};
