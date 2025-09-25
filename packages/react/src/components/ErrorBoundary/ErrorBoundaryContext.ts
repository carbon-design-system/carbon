/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ErrorInfo, createContext } from 'react';

export interface ErrorBoundaryContextType {
  log: (error: Error, errorInfo: ErrorInfo) => void;
}

export const ErrorBoundaryContext = createContext<ErrorBoundaryContextType>({
  log(error, info) {
    // eslint-disable-next-line no-console -- https://github.com/carbon-design-system/carbon/issues/20071
    console.log(info.componentStack);
  },
});
