/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createContext } from '@lit/context';
export type StateType = {
  isRoot: boolean;
  hasSelectableItems: boolean;
  size: 'xs' | 'sm' | 'md' | 'lg' | null;
  updateFromChild: (item: {}) => void;
};

export const menuDefaultState: StateType = {
  isRoot: true,
  hasSelectableItems: false,
  size: null,
  updateFromChild: () => {},
};

export const MenuContext = createContext<StateType>('myData');
