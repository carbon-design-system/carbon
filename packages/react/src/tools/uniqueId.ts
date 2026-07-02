/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { warning } from '../internal/warning';

let lastId = 0;

export const uniqueIdDeprecationMessage = `The \`uniqueId()\` helper function from @carbon/react was called. This function should no longer be used.

@carbon/react components should use the internal/useId.js hook instead. Other projects can use React's \`useId()\` hook: https://react.dev/reference/react/useId`;

export const uniqueId = (prefix = 'id') => {
  warning(false, uniqueIdDeprecationMessage);

  lastId++;
  return `${prefix}${lastId}`;
};
