/**
 * Copyright IBM Corp. 2018, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { TokenSet } from './TokenSet';
import { TokenGroup } from './TokenGroup';
import { background, border, field, layer } from './v11TokenGroup';

const getTokenOrThrow = (group: TokenGroup, name: string) => {
  const token = group.getToken(name);

  if (token === null) {
    throw new Error(`Unable to find token \`${name}\` in v11 token set.`);
  }

  return token;
};

export const set = TokenSet.create({
  name: 'All',
  tokens: [
    TokenSet.create({
      name: 'Base set',
      tokens: [
        getTokenOrThrow(background, 'background'),
        getTokenOrThrow(background, 'background-hover'),
        getTokenOrThrow(background, 'background-selected'),
        getTokenOrThrow(background, 'background-selected-hover'),
        getTokenOrThrow(border, 'border-subtle-00'),
      ],
    }),
    TokenSet.create({
      name: '01 Layer set',
      tokens: [
        getTokenOrThrow(layer, 'layer-01'),
        getTokenOrThrow(layer, 'layer-active-01'),
        getTokenOrThrow(layer, 'layer-background-01'),
        getTokenOrThrow(layer, 'layer-hover-01'),
        getTokenOrThrow(layer, 'layer-selected-hover-01'),
        getTokenOrThrow(layer, 'layer-accent-01'),
        getTokenOrThrow(layer, 'layer-accent-active-01'),
        getTokenOrThrow(layer, 'layer-accent-hover-01'),
        getTokenOrThrow(field, 'field-01'),
        getTokenOrThrow(field, 'field-hover-01'),
        getTokenOrThrow(border, 'border-subtle-01'),
        getTokenOrThrow(border, 'border-subtle-selected-01'),
        getTokenOrThrow(border, 'border-strong-01'),
        getTokenOrThrow(border, 'border-tile-01'),
      ],
    }),
    TokenSet.create({
      name: '02 Layer set',
      tokens: [
        getTokenOrThrow(layer, 'layer-02'),
        getTokenOrThrow(layer, 'layer-active-02'),
        getTokenOrThrow(layer, 'layer-background-02'),
        getTokenOrThrow(layer, 'layer-hover-02'),
        getTokenOrThrow(layer, 'layer-selected-hover-02'),
        getTokenOrThrow(layer, 'layer-accent-02'),
        getTokenOrThrow(layer, 'layer-accent-active-02'),
        getTokenOrThrow(layer, 'layer-accent-hover-02'),
        getTokenOrThrow(field, 'field-02'),
        getTokenOrThrow(field, 'field-hover-02'),
        getTokenOrThrow(border, 'border-subtle-02'),
        getTokenOrThrow(border, 'border-subtle-selected-02'),
        getTokenOrThrow(border, 'border-strong-02'),
        getTokenOrThrow(border, 'border-tile-02'),
      ],
    }),
    TokenSet.create({
      name: '03 Layer set',
      tokens: [
        getTokenOrThrow(layer, 'layer-03'),
        getTokenOrThrow(layer, 'layer-active-03'),
        getTokenOrThrow(layer, 'layer-background-03'),
        getTokenOrThrow(layer, 'layer-hover-03'),
        getTokenOrThrow(layer, 'layer-selected-hover-03'),
        getTokenOrThrow(layer, 'layer-accent-03'),
        getTokenOrThrow(layer, 'layer-accent-active-03'),
        getTokenOrThrow(layer, 'layer-accent-hover-03'),
        getTokenOrThrow(field, 'field-03'),
        getTokenOrThrow(field, 'field-hover-03'),
        getTokenOrThrow(border, 'border-subtle-03'),
        getTokenOrThrow(border, 'border-subtle-selected-03'),
        getTokenOrThrow(border, 'border-strong-03'),
        getTokenOrThrow(border, 'border-tile-03'),
      ],
    }),
  ],
});
