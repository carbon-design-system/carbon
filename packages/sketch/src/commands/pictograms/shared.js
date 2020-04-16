/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* global MSSVGImporter, NSString, NSUTF8StringEncoding */

import { Artboard, Rectangle, Shape } from 'sketch/dom';
import { syncColorStyles } from '../../sharedStyles/colors';
import { syncSymbol } from '../../tools/symbols';

const metadata = require('../../../generated/pictograms/metadata.json');

export function syncPictogramSymbols(
  document,
  symbols,
  symbolsPage,
  sharedLayerStyles,
  sizes = [48]
) {
  const sharedStyles = syncColorStyles(document, 'border');
  const [sharedStyle] = sharedStyles.filter(
    ({ name }) => name === 'color / border / black'
  );

  if (!sharedStyle) {
    throw new Error(
      'Unexpected error occurred, expected shared style but found none'
    );
  }

  const artboards = createSVGArtboards(
    symbolsPage,
    sharedStyle,
    metadata.icons,
    sizes
  );

  return artboards.map(artboard => {
    return syncSymbol(symbols, sharedLayerStyles, artboard.name, {
      name: artboard.name,
      frame: artboard.frame,
      layers: artboard.layers,
      background: artboard.background,
      parent: symbolsPage,
    });
  });
}

/**
 * Given a page, determine what the initial y-offset is based on the layers in
 * the page
 * @param {Page} page
 * @returns {number}
 */
function getInitialPageOffset(page) {
  return page.layers.reduce((acc, layer) => {
    if (layer.frame.y + layer.frame.height > acc) {
      return layer.frame.y + layer.frame.height;
    }
    return acc;
  }, 0);
}

/**
 * Create the SVG artboards for the pictograms and place them in
 * the given page with the given shared style set as the border.
 * @param {Page} page
 * @param {SharedStyle} sharedStyle
 * @param {Array} pictograms
 * @param {Array<number>} [sizes]
 * @returns {Array<Artboard>}
 */
function createSVGArtboards(page, sharedStyle, pictograms, sizes = [48]) {
  // We keep track of the current X and Y offsets at the top-level, each
  // iteration of pictogram should reset the X_OFFSET and update the
  // Y_OFFSET with the maximum size in the pictogram.
  const ARTBOARD_MARGIN = 48;
  let X_OFFSET = 0;
  let Y_OFFSET = getInitialPageOffset(page) + ARTBOARD_MARGIN;

  return pictograms
    .filter(pictogram => !pictogram.deprecated)
    .flatMap(pictogram => {
      X_OFFSET = 0;

      const artboards = sizes.map(size => {
        const [asset] = pictogram.assets;
        const svgString = NSString.stringWithString(asset.source);
        const svgData = svgString.dataUsingEncoding(NSUTF8StringEncoding);
        const svgImporter = MSSVGImporter.svgImporter();
        svgImporter.prepareToImportFromData(svgData);
        const svgLayer = svgImporter.importAsLayer();

        svgLayer.rect = {
          origin: {
            x: 0,
            y: 0,
          },
          size: {
            width: size,
            height: size,
          },
        };

        let symbolName = `${pictogram.name}`;

        if (pictogram.category) {
          symbolName = `${pictogram.category} / ${symbolName}`;
        }

        symbolName = `pictogram / ${symbolName}`;

        const artboard = new Artboard({
          name: symbolName,
          frame: new Rectangle(X_OFFSET, Y_OFFSET, size, size),
          layers: [svgLayer],
        });

        const [group] = artboard.layers;
        const strokePaths = group.layers.map(layer => layer.duplicate());
        const shape = new Shape({
          name: 'Border',
          frame: new Rectangle(0, 0, size, size),
          layers: strokePaths,
          style: sharedStyle.style,
          sharedStyleId: sharedStyle.id,
        });

        shape.style.fills = [];

        artboard.layers.push(shape);
        group.remove();

        X_OFFSET += size + ARTBOARD_MARGIN;

        return artboard;
      });

      Y_OFFSET += 48 + ARTBOARD_MARGIN;

      return artboards;
    });
}
