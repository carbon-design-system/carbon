/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createContext } from 'react';

// blockClass is declared inside each component function body using usePrefix().
// This file only exports the context shape and default value.

export interface AddSelectContextType {
  onItemSelect?: (itemId: string, selected: boolean, value: string) => void;
  selectedItems?: Set<string>;
  /**
   * Column-scoped: injected by AddSelectColumn, not by the root AddSelect.
   * Determines whether rows use checkboxes (true) or radio buttons (false).
   */
  multi?: boolean;
  /**
   * Column-scoped: injected by AddSelectColumn, not by the root AddSelect.
   * Called when a row's navigation indicator is clicked.
   */
  onNavigate?: (itemId: string, title: string, parentId: string) => void;
}

export const AddSelectContext = createContext<AddSelectContextType>({
  selectedItems: undefined,
});
