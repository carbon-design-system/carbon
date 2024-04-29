/**
 * @license
 *
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createContext } from '@lit/context';

export type StateType = {
  isRoot: boolean;
  mode: 'full' | 'basic';
  hasIcons: boolean;
  size: 'xs' | 'sm' | 'md' | 'lg' | null;
  items: any[];
  requestCloseRoot: (e: KeyboardEvent) => void;
};

export const menuDefaultState: StateType = {
  isRoot: true,
  mode: 'full',
  hasIcons: false,
  size: null,
  items: [],
  requestCloseRoot: () => {},
};

export const MenuContext = createContext<StateType>('myData');
