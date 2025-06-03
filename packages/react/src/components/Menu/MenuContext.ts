/**
 * Copyright IBM Corp. 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createContext, KeyboardEvent, RefObject } from 'react';

type ActionType = {
  type: 'enableIcons' | 'enableSelectableItems' | 'registerItem';
  payload: any;
};

type StateType = {
  isRoot: boolean;
  hasIcons: boolean;
  hasSelectableItems: boolean;
  size: 'xs' | 'sm' | 'md' | 'lg' | null;
  items: any[];
  requestCloseRoot: (e: Pick<KeyboardEvent<HTMLUListElement>, 'type'>) => void;
};

const menuDefaultState: StateType = {
  isRoot: true,
  hasIcons: false,
  hasSelectableItems: false,
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
    case 'enableSelectableItems':
      return {
        ...state,
        hasSelectableItems: true,
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
  type: ActionType['type'];
  payload: {
    ref: RefObject<HTMLLIElement | null>;
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
