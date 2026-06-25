/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createContext, ReactNode, RefObject, useContext } from 'react';
import { pkg } from '../../../settings';

/**
 * -------------
 * Context setup
 * -------------
 */

interface TearsheetContextType {
  fullyCollapsed: boolean;
  setFullyCollapsed?: (value: boolean) => void;
  refs?: any;
  onClose?: () => void;
  disableHeaderCollapse?: boolean;
  setDisableHeaderCollapse?: (value: boolean) => void;
  variant: 'wide' | 'narrow';
  isSm: boolean;
  decorator?: ReactNode;
  closeIconDescription?: string;
  hideCloseButton?: boolean;
  titleId?: string;
}
export const TearsheetContext = createContext<TearsheetContextType>({
  fullyCollapsed: false,
  disableHeaderCollapse: false,
  variant: 'wide',
  isSm: false,
  decorator: undefined,
  closeIconDescription: undefined,
  hideCloseButton: false,
});

export const blockClass = `${pkg.prefix}--tearsheet__next`;
