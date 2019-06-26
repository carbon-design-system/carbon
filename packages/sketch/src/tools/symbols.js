/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Document, SymbolMaster } from 'sketch/dom';

export function syncSymbol(document, name, config) {
  const symbols = document.getSymbols();
  const symbol = Array.from(symbols).find(symbol => symbol.name === name);

  if (!symbol) {
    return new SymbolMaster({
      name,
      ...config,
    });
  }

  Object.keys(config).forEach(key => {
    symbol[key] = config[key];
  });

  return symbol;
}
