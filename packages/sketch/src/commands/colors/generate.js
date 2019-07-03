/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Document, Rectangle, ShapePath, SymbolMaster } from 'sketch/dom';
import { command } from '../command';
import { syncColorStyles } from '../../sharedStyles/colors';
import { findOrCreatePage, selectPage } from '../../tools/page';
import { groupByKey } from '../../tools/grouping';

const ARTBOARD_WIDTH = 40;
const ARTBOARD_HEIGHT = 40;
const ARTBOARD_MARGIN = 8;

export function generate() {
  command('commands/colors/generate', () => {
    const document = Document.getSelectedDocument();
    const page = selectPage(findOrCreatePage(document, 'Color'));
    const sharedStyles = syncColorStyles(document);
    const { blackAndWhite, colors, support } = groupByKey(
      sharedStyles,
      sharedStyle => {
        const { name } = sharedStyle;
        const [_category, swatch] = name.split('/');
        switch (swatch) {
          case 'black':
          case 'white':
            return 'blackAndWhite';
          case 'yellow':
          case 'orange':
            return 'support';
          default:
            return 'colors';
        }
      }
    );

    let X_OFFSET = 0;
    let Y_OFFSET = 0;

    for (const sharedStyle of blackAndWhite) {
      createSymbolFromSharedStyle(sharedStyle, page, X_OFFSET, Y_OFFSET);
      X_OFFSET = X_OFFSET + ARTBOARD_WIDTH + ARTBOARD_MARGIN;
    }

    X_OFFSET = 0;
    Y_OFFSET = Y_OFFSET + ARTBOARD_HEIGHT + ARTBOARD_MARGIN;

    const swatches = groupByKey(colors, sharedStyle => {
      const [_category, swatch] = sharedStyle.name.split('/');
      return swatch;
    });

    for (const swatch of Object.keys(swatches)) {
      for (const sharedStyle of swatches[swatch]) {
        createSymbolFromSharedStyle(sharedStyle, page, X_OFFSET, Y_OFFSET);
        X_OFFSET = X_OFFSET + ARTBOARD_WIDTH + ARTBOARD_MARGIN;
      }

      X_OFFSET = 0;
      Y_OFFSET = Y_OFFSET + ARTBOARD_HEIGHT + ARTBOARD_MARGIN;
    }

    for (const sharedStyle of support) {
      createSymbolFromSharedStyle(sharedStyle, page, X_OFFSET, Y_OFFSET);
      X_OFFSET = X_OFFSET + ARTBOARD_WIDTH + ARTBOARD_MARGIN;
    }
  });
}

function createSymbolFromSharedStyle(sharedStyle, parent, offsetX, offsetY) {
  const [category, swatch, grade] = sharedStyle.name.split('/');

  const colorName = grade ? `${swatch}/${swatch}-${grade}` : swatch;
  const rectangle = new ShapePath({
    name: 'Color',
    frame: new Rectangle(0, 0, ARTBOARD_WIDTH, ARTBOARD_HEIGHT),
    shapeType: ShapePath.ShapeType.Rectangle,
    sharedStyleId: sharedStyle.id,
    style: sharedStyle.style,
  });

  const artboard = new SymbolMaster({
    parent,
    name: `${category}/${colorName}`,
    frame: new Rectangle(offsetX, offsetY, ARTBOARD_WIDTH, ARTBOARD_HEIGHT),
    layers: [rectangle],
  });

  return artboard;
}
