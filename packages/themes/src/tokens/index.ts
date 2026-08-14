/**
 * Copyright IBM Corp. 2018, 2026
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
import type { TokenMetadata } from './types';

export { Token, TokenFormat, TokenGroup, TokenSet, group, set };

const formatMetadata = (name: string, type: TokenMetadata['type']) => ({
  name,
  type,
});

const v11: TokenMetadata[] = [
  // Base color tokens
  ...group.getTokens().map((token) => {
    return formatMetadata(token.name, 'color');
  }),

  // Contextual tokens
  ...contextual.getTokens().map((token) => {
    return formatMetadata(token.name, 'color');
  }),

  // Component tokens
  ...Object.values(components).flatMap((group) => {
    return group.getTokens().map((token) => {
      return formatMetadata(token.name, 'color');
    });
  }),

  // Typography
  ...type.getTokens().map((token) => {
    return formatMetadata(token.name, 'type');
  }),

  // Layout (spacing)
  ...layout.getTokens().map((token) => {
    return formatMetadata(token.name, 'layout');
  }),
];

export const unstable_metadata = {
  v11,
  v10,
};
