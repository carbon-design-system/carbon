/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* global MSSVGImporter, NSString, NSUTF8StringEncoding */

import { toString } from '@carbon/icon-helpers';
import { Document, Rectangle, Shape, SymbolMaster } from 'sketch/dom';
import { command } from '../command';
import { syncColorStyles } from '../../sharedStyles/colors';
import { groupByKey } from '../../tools/grouping';
import { findOrCreatePage, selectPage } from '../../tools/page';

const meta = require('@carbon/icons/meta.json');

export function generate() {
  command('commands/icons/generate', () => {
    const document = Document.getSelectedDocument();
    const page = selectPage(findOrCreatePage(document, 'Icons'));
    const sharedStyles = syncColorStyles(document);
    const [sharedStyle] = sharedStyles.filter(
      ({ name }) => name === 'color/black'
    );

    if (!sharedStyle) {
      throw new Error(
        'Unexpected error occurred, expected shared style but found none'
      );
    }

    const icons = normalize(meta);
    const iconNames = Object.keys(icons);

    // To help with debugging, we have `start` and `end` values here to focus on
    // specific icon ranges. You can also work on a specific icon by finding
    // it's index and setting the value of start to the index and end to the
    // index + 1.
    //
    // To find the index, you can use:
    //   console.log(iconNames.findIndex(name === 'name-to-find')); // 50
    // And use that value below like:
    //  const start = 50;
    //  const end = 51;
    // This will allow you to focus only on the icon named 'name-to-find'
    const start = 0;
    const end = iconNames.length;

    // We keep track of the current X and Y offsets at the top-level, each
    // iteration of an icon set should reset the X_OFFSET and update the
    // Y_OFFSET with the maximum size in the icon set.
    let X_OFFSET = 0;
    let Y_OFFSET = 0;
    let maxSize = -Infinity;

    const artboards = iconNames.slice(start, end).flatMap((name, i) => {
      const sizes = icons[name];

      X_OFFSET = 0;
      if (i !== 0) {
        Y_OFFSET = Y_OFFSET + maxSize + 32;
      }
      maxSize = -Infinity;

      return sizes.map(icon => {
        // If our icon has an original size, we will need to render it in the
        // original size and then resize it to the appropriate artboard size
        const size = icon.original || icon.size;
        const descriptor = Object.assign({}, icon.descriptor);

        // We push a transparent rectangle to mirror the "bounding box" found in
        // icon artboards that is stripped by our build process. Including this
        // makes sure that our icon renders true to the path data
        descriptor.content.push({
          elem: 'rect',
          attrs: {
            width: size,
            height: size,
            fill: 'none',
          },
        });

        const layer = createSVGLayer(icon.descriptor);

        layer.name = icon.basename;
        layer.rect = {
          origin: {
            x: 0,
            y: 0,
          },
          size: {
            width: icon.size,
            height: icon.size,
          },
        };

        let symbolName =
          sizes.length !== 1
            ? `category/${name}/${icon.size}`
            : `category/${name}`;

        if (icon.original) {
          symbolName = `${symbolName}*`;
        }

        const artboard = new SymbolMaster({
          name: symbolName,
          frame: new Rectangle(X_OFFSET, Y_OFFSET, icon.size, icon.size),
          layers: [layer],
        });

        if (size > maxSize) {
          maxSize = size;
        }

        X_OFFSET = X_OFFSET + icon.size + 8;

        const [group] = artboard.layers;

        // Last layer will be the transparent rectangle we added above
        const paths = group.layers.slice(0, -1).map(layer => layer.duplicate());

        // We split things out into fillPaths and innerPaths, allowing us to
        // style them independent of each other in the symbol. Useful for
        // two-tone icons.
        const { fillPaths = [], innerPaths = [] } = groupByKey(
          paths,
          (path, i) => {
            const node = icon.descriptor.content[i];
            if (node.attrs['data-icon-path'] === 'inner-path') {
              return 'innerPaths';
            }
            return 'fillPaths';
          }
        );

        let shape;
        if (fillPaths.length === 1) {
          shape = fillPaths[0];
          shape.name = 'Fill';
          shape.style = sharedStyle.style;
          shape.sharedStyleId = sharedStyle.id;
        } else {
          // If we have multiple fill paths, we need to consolidate them into a
          // single Shape so that we can style the icon with one override in the
          // symbol
          shape = new Shape({
            name: 'Fill',
            frame: new Rectangle(0, 0, icon.size, icon.size),
            layers: fillPaths,
            style: sharedStyle.style,
            sharedStyleId: sharedStyle.id,
          });
        }

        shape.style.borders = [];

        for (const innerPath of innerPaths) {
          innerPath.name = 'Inner Fill';
          innerPath.style = sharedStyle.style;
          innerPath.style.opacity = 0;
          innerPath.sharedStyleId = sharedStyle.id;
        }

        artboard.layers.push(shape, ...innerPaths);
        group.remove();

        return artboard;
      });
    });

    page.layers.push(...artboards);
  });
}

/**
 * Normalize a collection of icons by their basename
 * @param {Array<Icon>} icons
 * @returns {object}
 */
function normalize(icons) {
  // Collect all icons and group them by their base names. The value of the
  // basename key is the array of all sizes for that icon
  const iconsByBasename = icons.reduce((acc, icon) => {
    // Ignore glyphs
    if (!icon.size) {
      return acc;
    }
    // Drop size from prefix
    const name = [...icon.prefix.slice(1), icon.basename].join('/');
    if (acc[name]) {
      return {
        ...acc,
        [name]: acc[name].concat(icon).sort(sortBySize),
      };
    }
    return {
      ...acc,
      [name]: [icon],
    };
  }, {});

  return iconsByBasename;
}

function sortBySize(a, b) {
  return b.size - a.size;
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
