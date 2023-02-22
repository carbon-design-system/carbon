/**
 * Copyright IBM Corp. 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

const menuDefaultState = {
  isRoot: true,
  hasIcons: false,
  size: null,
  items: [],
  requestCloseRoot: () => {},
};

function menuReducer(state, action) {
  switch (action.type) {
    case 'enableIcons':
      return {
        ...state,
        hasIcons: true,
      };
    case 'registerItem':
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case 'clearRegisteredItems':
      return {
        ...state,
        items: [],
      };
  }
}

const MenuContext = React.createContext({
  state: menuDefaultState,

  // 'dispatch' is populated by the root menu
  dispatch: () => {},
});

export { MenuContext, menuReducer };
