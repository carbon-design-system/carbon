/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* global MSSVGImporter, NSString, NSUTF8StringEncoding */

import { toString } from '@carbon/icon-helpers';
import { Artboard, Rectangle, Shape } from 'sketch/dom';
import { syncColorStyles } from '../../sharedStyles/colors';
import { syncSymbol } from '../../tools/symbols';

const meta = require('@carbon/pictograms/build-info.json');
const metadata = require('@carbon/pictograms/metadata.json');

export function syncPictogramSymbols(
  document,
  symbols,
  symbolsPage,
  sharedLayerStyles
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

  const pictograms = normalize(meta);
  const pictogramNames = Object.keys(pictograms);

  // To help with debugging, we have `start` and `end` values here to focus on
  // specific pictogram ranges. You can also work on a specific pictogram by finding
  // it's index and setting the value of start to the index and end to the
  // index + 1.
  //
  // To find the index, you can use:
  //   console.log(pictogramNames.findIndex(name === 'name-to-find')); // 50
  // And use that value below like:
  //  const start = 50;
  //  const end = 51;
  // This will allow you to focus only on the pictogram named 'name-to-find'
  const start = 0;
  const end = pictogramNames.length;

  // We keep track of the current X and Y offsets at the top-level, each
  // iteration of an pictogram set should reset the X_OFFSET and update the
  // Y_OFFSET with the maximum size in the pictogram set.
  const ARTBOARD_MARGIN = 32;
  const INITIAL_Y_OFFSET =
    symbolsPage.layers.reduce((acc, layer) => {
      if (layer.frame.y + layer.frame.height > acc) {
        return layer.frame.y + layer.frame.height;
      }
      return acc;
    }, 0) + 32;
  let X_OFFSET = 0;
  let Y_OFFSET = INITIAL_Y_OFFSET;
  let maxSize = -Infinity;

  const symbolsToSync = pictogramNames.slice(start, end).flatMap((name, i) => {
    const sizes = pictograms[name];

    X_OFFSET = 0;
    if (i !== 0) {
      Y_OFFSET = Y_OFFSET + maxSize + ARTBOARD_MARGIN;
    }
    maxSize = -Infinity;

    return sizes.map(pictogram => {
      const size = 48;
      const descriptor = Object.assign({}, pictogram.descriptor);

      // We push a transparent rectangle to mirror the "bounding box" found in
      // pictogram artboards that is stripped by our build process. Including this
      // makes sure that our pictogram renders true to the path data
      descriptor.content.push({
        elem: 'rect',
        attrs: {
          width: size,
          height: size,
          fill: 'none',
        },
      });

      const layer = createSVGLayer(pictogram.descriptor);

      layer.name = pictogram.basename;
      layer.rect = {
        origin: {
          x: 0,
          y: 0,
        },
        size: {
          width: size,
          height: size,
        },
      };

      const info = metadata.icons.find(pictogram => {
        return pictogram.name === name;
      });

      let symbolName = name;

      if (sizes.length !== 1) {
        symbolName = `${name} / ${size}`;
      }

      if (info.category && info.subcategory) {
        symbolName = `${info.category} / ${info.subcategory} / ${symbolName}`;
      }

      symbolName = `pictogram / ${symbolName}`;

      const artboard = new Artboard({
        name: symbolName,
        frame: new Rectangle(X_OFFSET, Y_OFFSET, size, size),
        layers: [layer],
      });

      if (size > maxSize) {
        maxSize = size;
      }

      X_OFFSET = X_OFFSET + size + 8;

      const [group] = artboard.layers;

      // Last layer will be the transparent rectangle we added above
      const strokePaths = group.layers
        .slice(0, -1)
        .map(layer => layer.duplicate());

      let shape;
      if (strokePaths.length === 1) {
        shape = strokePaths[0];
        shape.name = 'Border';
        shape.style = sharedStyle.style;
        shape.sharedStyleId = sharedStyle.id;
      } else {
        // If we have multiple fill paths, we need to consolidate them into a
        // single Shape so that we can style the pictogram with one override in the
        // symbol
        shape = new Shape({
          name: 'Border',
          frame: new Rectangle(0, 0, size, size),
          layers: strokePaths,
          style: sharedStyle.style,
          sharedStyleId: sharedStyle.id,
        });
      }

      shape.style.fills = [];

      artboard.layers.push(shape);
      group.remove();

      return syncSymbol(symbols, sharedLayerStyles, artboard.name, {
        name: artboard.name,
        frame: artboard.frame,
        layers: artboard.layers,
        background: artboard.background,
        parent: symbolsPage,
      });
    });
  });

  return symbolsToSync;
}

/**
 * Normalize a collection of pictograms by their basename
 * @param {Array<Pictogram>} pictograms
 * @returns {object}
 */
function normalize(pictograms) {
  // Collect all pictograms and group them by their base names. The value of the
  // basename key is the array of all sizes for that pictogram
  const pictogramsByBasename = pictograms.reduce((acc, pictogram) => {
    const name = pictogram.basename;
    if (acc[name]) {
      return {
        ...acc,
        [name]: acc[name].concat(pictogram),
      };
    }
    return {
      ...acc,
      [name]: [pictogram],
    };
  }, {});

  return pictogramsByBasename;
}

/**
 * Create a layer from an SVG descriptor
 *
 * Reference:
 * https://github.com/airbnb/react-sketchapp/blob/aa3070556c47883974edbc7f78978c421a8199f7/src/jsonUtils/sketchImpl/makeSvgLayer.js#L12
 *
 * @param {object} svg
 * @returns {Layer}
 */
function createSVGLayer(svg) {
  const svgString = NSString.stringWithString(toString(svg));
  const svgData = svgString.dataUsingEncoding(NSUTF8StringEncoding);
  const svgImporter = MSSVGImporter.svgImporter();
  svgImporter.prepareToImportFromData(svgData);
  const svgLayer = svgImporter.importAsLayer();

  return svgLayer;
}
