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
    console.log(info.componentStack);
  },
});
