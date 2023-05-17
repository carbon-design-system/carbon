/**
 * Copyright IBM Corp. 2018, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Token } from './Token';
import { TokenFormat } from './TokenFormat';
import { TokenGroup } from './TokenGroup';
import { TokenSet } from './TokenSet';
import { group, contextual } from './v11TokenGroup';
import { set } from './v11TokenSet';
import * as components from './components';
import { type } from './type';
import { layout } from './layout';
import { v10 } from './v10';

export { Token, TokenFormat, TokenGroup, TokenSet, group, set };

const v11 = [
  // Base color tokens
  ...group.getTokens().map((token) => {
    return {
      name: token.name,
      type: 'color',
    };
  }),

  // Contextual tokens
  ...contextual.getTokens().map((token) => {
    return {
      name: token.name,
      type: 'color',
    };
  }),

  // Component tokens
  ...Object.values(components).flatMap((group) => {
    return group.getTokens().map((token) => {
      return {
        name: token.name,
        type: 'color',
      };
    });
  }),

  // Typography
  ...type.getTokens().map((token) => {
    return {
      name: token.name,
      type: 'type',
    };
  }),

  // Layout (spacing)
  ...layout.getTokens().map((token) => {
    return {
      name: token.name,
      type: 'layout',
    };
  }),
];

export const unstable_metadata = {
  v11,
  v10,
};
