/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Artboard, Document, Rectangle, ShapePath } from 'sketch/dom';
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
    const page = selectPage(findOrCreatePage(document, 'color'));
    const sharedStyles = syncColorStyles({ document });
    const {
      black,
      white,
      colors,
      support,
      blackHover,
      whiteHover,
      hoverColors,
    } = groupByKey(sharedStyles, (sharedStyle) => {
      const { name } = sharedStyle;
      const [_root, _category, swatch] = name.split(' / ');
      if (swatch.includes('hover')) {
        switch (swatch) {
          case 'black hover':
            return 'blackHover';
          case 'white hover':
            return 'whiteHover';
          default:
            return 'hoverColors';
        }
      } else {
        switch (swatch) {
          case 'black':
            return 'black';
          case 'white':
            return 'white';
          case 'yellow':
          case 'orange':
            return 'support';
          default:
            return 'colors';
        }
      }
    });

    let X_OFFSET = 0;
    let Y_OFFSET = 0;

    const swatches = groupByKey(colors, (sharedStyle) => {
      const [_root, _category, swatch] = sharedStyle.name.split('/');
      return swatch;
    });

    const hoverSwatches = groupByKey(hoverColors, (sharedStyle) => {
      const [_root, _category, swatch] = sharedStyle.name.split('/');
      return swatch;
    });

    for (const swatch of Object.keys(swatches).sort(sortBySwatchName)) {
      for (const sharedStyle of swatches[swatch].sort(sortBySwatchGrade)) {
        createArtboardFromSharedStyle(sharedStyle, page, X_OFFSET, Y_OFFSET);
        X_OFFSET = X_OFFSET + ARTBOARD_WIDTH + ARTBOARD_MARGIN;
      }

      // We have a special case for `gray` where we want to add the color
      // `white` to the end of the swatch (e.g. `white-0`) and `black` to the
      // beginning of the swatch (`black-100`)
      if (swatch === 'gray') {
        createArtboardFromSharedStyle(white[0], page, X_OFFSET, Y_OFFSET);
        const offset = 0 - ARTBOARD_WIDTH - ARTBOARD_MARGIN;
        createArtboardFromSharedStyle(black[0], page, offset, Y_OFFSET);
      }

      X_OFFSET = 0;
      Y_OFFSET = Y_OFFSET + ARTBOARD_HEIGHT + ARTBOARD_MARGIN;
    }

    for (const sharedStyle of support) {
      createArtboardFromSharedStyle(sharedStyle, page, X_OFFSET, Y_OFFSET);
      X_OFFSET = X_OFFSET + ARTBOARD_WIDTH + ARTBOARD_MARGIN;
    }

    X_OFFSET = 0;
    Y_OFFSET = Y_OFFSET + ARTBOARD_HEIGHT + ARTBOARD_MARGIN;

    createArtboardFromSharedStyle(whiteHover[0], page, X_OFFSET, Y_OFFSET);
    X_OFFSET = X_OFFSET + ARTBOARD_WIDTH + ARTBOARD_MARGIN;
    createArtboardFromSharedStyle(blackHover[0], page, X_OFFSET, Y_OFFSET);

    X_OFFSET = 0;
    Y_OFFSET = Y_OFFSET + ARTBOARD_HEIGHT + ARTBOARD_MARGIN;

    for (const swatch of Object.keys(hoverSwatches).sort(sortBySwatchName)) {
      for (const sharedStyle of hoverSwatches[swatch].sort(sortBySwatchGrade)) {
        createArtboardFromSharedStyle(sharedStyle, page, X_OFFSET, Y_OFFSET);
        X_OFFSET = X_OFFSET + ARTBOARD_WIDTH + ARTBOARD_MARGIN;
      }

      X_OFFSET = 0;
      Y_OFFSET = Y_OFFSET + ARTBOARD_HEIGHT + ARTBOARD_MARGIN;
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

  // Reset border if a Sketch instance has the default style with a border for
  // rectangles
  rectangle.style.borders = [];

  const artboard = new Artboard({
    parent,
    name: sharedStyle.name,
    frame: new Rectangle(offsetX, offsetY, ARTBOARD_WIDTH, ARTBOARD_HEIGHT),
    layers: [rectangle],
  });

  return artboard;
}

const order = [
  'red',
  'magenta',
  'purple',
  'blue',
  'cyan',
  'teal',
  'green',
  'cool-gray',
  'gray',
  'warm-gray',
];

function sortBySwatchName(a, b) {
  return order.indexOf(a) - order.indexOf(b);
}

function sortBySwatchGrade(a, b) {
  const [_categoryA, _swatchA, gradeA] = a.name.split('/');
  const [_categoryB, _swatchB, gradeB] = b.name.split('/');
  return parseInt(gradeB, 10) - parseInt(gradeA, 10);
}
