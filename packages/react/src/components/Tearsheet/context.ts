/**
 * Copyright IBM Corp. 2025, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createContext, ReactNode } from 'react';

/**
 * -------------
 * Context setup
 * -------------
 */

interface TearsheetContextType {
  fullyCollapsed: boolean;
  setFullyCollapsed?: (value: boolean) => void;
  refs?: unknown;
  onClose?: () => void;
  onHeaderCollapse?: (collapsed: boolean) => void;
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
