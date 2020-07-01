/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import invariant from 'invariant';

const itemToString = (item) => {
  invariant(
    typeof item.label === 'string',
    '[MultiSelect] the default `itemToString` method expected to receive ' +
      'an item with a `label` field of type `string`. Instead received: `%s`',
    typeof item.label
  );
  return item.label || '';
};

export const defaultItemToString = (item) => {
  if (Array.isArray(item)) {
    return item.map(itemToString);
  }
  return itemToString(item);
};
