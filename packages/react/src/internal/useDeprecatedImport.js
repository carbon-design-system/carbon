/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useRef } from 'react';

export const useDeprecatedImport = (message) => {
  const messageShown = useRef(false);

  if (process?.env?.NODE_ENV !== 'production' && !messageShown.current) {
    console.error(message);
    messageShown.current = true;
  }
};
