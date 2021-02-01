/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { SymbolMaster } from 'sketch/dom';

/**
 * Sync the given symbol name with a corresponding config in a document. Will
 * return a new symbol if none exist with the given name.
 * @param {Array<SymbolMaster>} symbols
 * @param {Array<SharedLayerStyles>} sharedLayerStyles
 * @param {string} name - the name of the symbol
 * @param {object} config - the config for the corresponding symbol master
 * @returns {SketchSymbol}
 */
export function syncSymbol(symbols, sharedLayerStyles, name, config) {
  const symbol = symbols.find((symbol) => symbol.name === name);

  if (!symbol) {
    return new SymbolMaster({
      name,
      ...config,
    });
  }

  Object.keys(config).forEach((key) => {
    symbol[key] = config[key];
  });

  return symbol;
}

const defaultPropertyList = new Set(['frame', 'points', 'style']);

/**
 * Merge a given source layer with a target layer. Optionally specify a
 * propertyList that will specify what keys are safe to merge
 *
 * @param {object} source - the source layer that we are trying to update
 * in-place
 * @param {object} target - the target layer that contains the latest changes
 * @param {?Set} propertyList - specify which properties are safe to merge
 * @returns {void}
 */
function merge(source, target, propertyList = defaultPropertyList) {
  for (let key in target) {
    if (propertyList.has(key)) {
      source[key] = target[key];
    }
  }
}
