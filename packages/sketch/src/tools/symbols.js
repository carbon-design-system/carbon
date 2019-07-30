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
 * @param {Document} document
 * @param {string} name - the name of the symbol
 * @param {object} config - the config for the corresponding symbol master
 * @returns {SketchSymbol}
 */
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

/**
 * Sync the layers between the original sketch symbol master and a proposed
 * configuration for this symbol. We will try our best to update the layers for
 * the original symbol, but may have to de-opt and use the proposed layers if we
 * cannot safely merge the two.
 * @param {Document} document
 * @param {SketchSymbol} original - the original sketch symbol master
 * @param {object} proposed - a proposed set of changes to the symbol
 * @returns {void}
 */
function syncSymbolLayers(document, original, proposed) {
  // We're going to update the `layers` value on `original` to what is found on
  // `proposed`. If we can, we'll update the `original` layer in-place. In cases
  // where we cannot, we'll use the proposed layers.
  //
  // The preference is to keep the original layer in-place, namely for symbol
  // overrides that may exist in the document. If we remove the layer and update
  // it with a proposed layer, then we lose that override information meaning
  // that designers will have to go through and update their symbols again
  // instead of it automatically being updated.
  //
  // If nothing is shared between original and proposed, then the layers in
  // proposed will be used.
  original.layers = proposed.layers.map(proposedLayer => {
    // We often name nested layers that can be overridden.
    const { name } = proposedLayer;
    const originalLayer = original.layers.find(layer => {
      return layer.name === name;
    });

    // If we can find a layer in `proposed` with a corresponding `original`
    // layer, then we'll attempt to merge the two.
    if (originalLayer) {
      // We can't safely merge if the type or shapeType have diverged so we'll
      // need to default to the changed layer
      if (
        originalLayer.type !== proposedLayer.type ||
        originalLayer.shapeType !== proposedLayer.shapeType
      ) {
        return proposedLayer;
      }

      // Attempt to merge the two layers
      merge(originalLayer, proposedLayer);

      // If our original layer has a shared style, we'll update it to match
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

    // By default, we'll defer to the proposed layer
    return proposedLayer;
  });
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
