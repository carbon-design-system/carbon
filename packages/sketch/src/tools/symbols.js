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
    if (key === 'layers') {
      syncSymbolLayers(document, symbol, config);
    } else {
      symbol[key] = config[key];
    }
  });

  return symbol;
}

function syncSymbolLayers(document, original, changed) {
  original.layers = changed.layers.map(changedLayer => {
    const { name } = changedLayer;
    const originalLayer = original.layers.find(layer => {
      return layer.name === name;
    });

    if (originalLayer) {
      merge(originalLayer, changedLayer);

      if (originalLayer.sharedStyleId) {
        const sharedStyle = document.sharedLayerStyles.find(sharedStyle => {
          return originalLayer.sharedStyleId === sharedStyle.id;
        });

        if (sharedStyle) {
          originalLayer.style.syncWithSharedStyle(sharedStyle);
        }
      }

      return originalLayer;
    }

    return changedLayer;
  });
}

const defaultPropertyList = new Set(['frame', 'points', 'style']);
function merge(source, target, propertyList = defaultPropertyList) {
  for (let key in target) {
    if (propertyList.has(key)) {
      source[key] = target[key];
    }
  }
}
