/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Artboard, Document, Rectangle, ShapePath } from 'sketch/dom';
import { command } from '../command';
import { findOrCreatePage, selectPage } from '../../tools/page';
import { groupByKey } from '../../tools/grouping';
import { syncThemeColorStyles } from '../../sharedStyles/themes';

const ARTBOARD_WIDTH = 40;
const ARTBOARD_HEIGHT = 40;

const ARTBOARD_MARGIN_VERTICAL = 8;
const ARTBOARD_MARGIN_HORIZONTAL = 40;

export function generate() {
  command('commands/themes/generate', () => {
    const document = Document.getSelectedDocument();
    const page = selectPage(findOrCreatePage(document, 'themes'));
    const sharedStyles = syncThemeColorStyles(document);

    const tokens = groupByKey(sharedStyles, (sharedStyle) => {
      const [_namespace, _category, _group, token] = sharedStyle.name.split(
        '/'
      );
      return token.trim();
    });

    let X_OFFSET = 0;
    let Y_OFFSET = 0;

    for (const token of Object.keys(tokens)) {
      for (const sharedStyle of tokens[token]) {
        createArtboardFromSharedStyle(sharedStyle, page, X_OFFSET, Y_OFFSET);
        X_OFFSET = X_OFFSET + ARTBOARD_WIDTH + ARTBOARD_MARGIN_HORIZONTAL;
      }

      X_OFFSET = 0;
      Y_OFFSET = Y_OFFSET + ARTBOARD_HEIGHT + ARTBOARD_MARGIN_VERTICAL;
    }
  });
}

function createArtboardFromSharedStyle(sharedStyle, parent, offsetX, offsetY) {
  const rectangle = new ShapePath({
    name: 'Color',
    frame: new Rectangle(0, 0, ARTBOARD_WIDTH, ARTBOARD_HEIGHT),
    shapeType: ShapePath.ShapeType.Rectangle,
    sharedStyleId: sharedStyle.id,
    style: sharedStyle.style,
  });

  rectangle.style.borders = [];

  const artboard = new Artboard({
    parent,
    name: sharedStyle.name,
    frame: new Rectangle(offsetX, offsetY, ARTBOARD_WIDTH, ARTBOARD_HEIGHT),
    layers: [rectangle],
  });

  return artboard;
}
