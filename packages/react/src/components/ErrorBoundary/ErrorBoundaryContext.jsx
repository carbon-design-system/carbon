/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createContext } from 'react';

export const ErrorBoundaryContext = createContext({
  log(error, info) {
    console.log(info.componentStack);
  },
});
