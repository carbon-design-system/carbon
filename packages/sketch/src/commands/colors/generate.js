/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import sketch from 'sketch';
import { Document, Rectangle, ShapePath, SymbolMaster } from 'sketch/dom';
import { syncColorStyles } from '../../sharedStyles/colors';
import { findOrCreatePage, selectPage } from '../../tools/page';

const ARTBOARD_WIDTH = 40;
const ARTBOARD_HEIGHT = 40;
const ARTBOARD_MARGIN = 8;

export function generate() {
  sketch.UI.message('Hi 👋 We are still working on this! 🚧');

  const document = Document.getSelectedDocument();
  const page = selectPage(findOrCreatePage(document, 'Color'));
  const sharedStyles = syncColorStyles(document);

  const buckets = {
    blackAndWhite: 'blackAndWhite',
    colors: 'colors',
    support: 'support',
  };
  const { blackAndWhite, colors, support } = split(
    sharedStyles,
    Object.keys(buckets),
    sharedStyle => {
      const { name } = sharedStyle;
      const [category, swatch, grade] = name.split('/');
      switch (swatch) {
        case 'black':
        case 'white':
          return buckets.blackAndWhite;
        case 'yellow':
        case 'orange':
          return buckets.support;
        default:
          return buckets.colors;
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

  const swatches = findBuckets(colors, sharedStyle => {
    const [category, swatch, grade] = sharedStyle.name.split('/');
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

  sketch.UI.message('Done! 🎉');
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

function split(collection, buckets, sorter) {
  const result = {};

  for (const bucket of buckets) {
    result[bucket] = [];
  }

  for (const element of collection) {
    const bucket = sorter(element);
    if (!bucket) {
      throw new Error(
        'Expected element to be sorted into a bucket, instead received: ' +
          bucket
      );
    }
    result[bucket].push(element);
  }

  return result;
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
