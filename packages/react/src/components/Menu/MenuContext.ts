/**
 * Copyright IBM Corp. 2023, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createContext, KeyboardEvent, RefObject } from 'react';

type ActionType = {
  type: 'enableIcons' | 'enableSelectableItems' | 'registerItem';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
  payload: any;
};

type StateType = {
  isRoot: boolean;
  hasIcons: boolean;
  hasSelectableItems: boolean;
  size: 'xs' | 'sm' | 'md' | 'lg' | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
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
    case 'registerItem': {
      const newItem = action.payload;
      const items = state.items.filter((item) => item.ref.current);
      const next = newItem.ref.current?.nextElementSibling;
      const idx = items.findIndex((item) => item.ref.current === next);
      items.splice(idx < 0 ? items.length : idx, 0, newItem);
      return { ...state, items };
    }
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- https://github.com/carbon-design-system/carbon/issues/20452
  dispatch: (_: DispatchFuncProps) => {},
});

export { MenuContext, menuReducer };
