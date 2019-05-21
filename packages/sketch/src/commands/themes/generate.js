/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import sketch from 'sketch';
import { Document, Rectangle, ShapePath, SymbolMaster } from 'sketch/dom';
import { findOrCreatePage, selectPage } from '../../tools/page';
import { syncThemeColorStyles } from '../../sharedStyles/themes';

const ARTBOARD_WIDTH = 40;
const ARTBOARD_HEIGHT = 40;

const ARTBOARD_MARGIN_VERTICAL = 8;
const ARTBOARD_MARGIN_HORIZONTAL = 40;

export function generate() {
  sketch.UI.message('Hi 👋 We are still working on this! 🚧');

  const document = Document.getSelectedDocument();
  const page = selectPage(findOrCreatePage(document, 'Themes'));
  const sharedStyles = syncThemeColorStyles(document);

  const tokens = findBuckets(sharedStyles, sharedStyle => {
    const [category, token] = sharedStyle.name.split('/');
    return token.trim();
  });

  let X_OFFSET = 0;
  let Y_OFFSET = 0;

  for (const token of Object.keys(tokens)) {
    for (const sharedStyle of tokens[token]) {
      createSymbolFromSharedStyle(sharedStyle, page, X_OFFSET, Y_OFFSET);
      X_OFFSET = X_OFFSET + ARTBOARD_WIDTH + ARTBOARD_MARGIN_HORIZONTAL;
    }

    X_OFFSET = 0;
    Y_OFFSET = Y_OFFSET + ARTBOARD_HEIGHT + ARTBOARD_MARGIN_VERTICAL;
  }

  sketch.UI.message('Done! 🎉');
}

function createSymbolFromSharedStyle(sharedStyle, parent, offsetX, offsetY) {
  const rectangle = new ShapePath({
    name: 'Color',
    frame: new Rectangle(0, 0, ARTBOARD_WIDTH, ARTBOARD_HEIGHT),
    shapeType: ShapePath.ShapeType.Rectangle,
    sharedStyleId: sharedStyle.id,
    style: sharedStyle.style,
  });

  const artboard = new SymbolMaster({
    parent,
    name: sharedStyle.name,
    frame: new Rectangle(offsetX, offsetY, ARTBOARD_WIDTH, ARTBOARD_HEIGHT),
    layers: [rectangle],
  });

  return artboard;
}

function findBuckets(collection, sorter) {
  const result = {};

  for (const element of collection) {
    const key = sorter(element);

    if (!result[key]) {
      result[key] = [];
    }

    result[key].push(element);
  }

  return result;
}
