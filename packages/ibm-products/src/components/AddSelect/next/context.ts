/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createContext } from 'react';
import { pkg } from '../../../settings';

export const blockClass = `${pkg.prefix}--add-select__next`;

export interface AddSelectContextType {
  multi?: boolean;
  onItemSelect?: (itemId: string, selected: boolean, value: string) => void;
  onNavigate?: (itemId: string, title: string, parentId: string) => void;
  selectedItems?: Set<string>;
}

export const AddSelectContext = createContext<AddSelectContextType>({
  multi: false,
  selectedItems: undefined,
});
