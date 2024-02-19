/**
 * Copyright IBM Corp. 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createContext, KeyboardEvent, RefObject } from 'react';

type ActionType = {
  type: 'enableIcons' | 'registerItem';
  payload: any;
};

type StateType = {
  isRoot: boolean;
  mode: 'full' | 'basic';
  hasIcons: boolean;
  size: 'xs' | 'sm' | 'md' | 'lg' | null;
  items: any[];
  requestCloseRoot: (e: Pick<KeyboardEvent<HTMLUListElement>, 'type'>) => void;
};

const menuDefaultState: StateType = {
  isRoot: true,
  mode: 'full',
  hasIcons: false,
  size: null,
  items: [],
  requestCloseRoot: () => {},
};

function menuReducer(state: StateType, action: ActionType) {
  switch (action.type) {
    case 'enableIcons':
      return {
        ...state,
        hasIcons: true,
      };
    case 'registerItem':
      return {
        ...state,
        items: [...state.items, action.payload].filter(
          (item) => item.ref.current !== null
        ),
      };
  }
}

type DispatchFuncProps = {
  type: 'registerItem' | 'enableIcons';
  payload: {
    ref: RefObject<HTMLLIElement>;
    disabled: boolean;
  };
};

type MenuContextProps = {
  state: StateType;
  dispatch: (props: DispatchFuncProps) => void;
};

const MenuContext = createContext<MenuContextProps>({
  state: menuDefaultState,
  // 'dispatch' is populated by the root menu
  dispatch: (_: DispatchFuncProps) => {},
});

export { MenuContext, menuReducer };
