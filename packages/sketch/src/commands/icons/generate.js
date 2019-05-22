/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { toString } from '@carbon/icon-helpers';
import React from 'react';
import {
  Document,
  Group,
  Rectangle,
  Shape,
  Style,
  SymbolMaster,
} from 'sketch/dom';
import { command } from '../command';
import { syncColorStyles } from '../../sharedStyles/colors';
import { groupByKey } from '../../tools/grouping';
import { findOrCreatePage, selectPage } from '../../tools/page';

const meta = require('@carbon/icons/meta.json');

export function generate() {
  command('commands/icons/generate', () => {
    const document = Document.getSelectedDocument();
    const page = selectPage(findOrCreatePage(document, 'Icons'));

    page.selected = true;

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
    const start = 0;
    const length = iconNames.length;

    let X_OFFSET = 0;
    let Y_OFFSET = 0;
    let maxSize = -Infinity;

    const artboards = iconNames.slice(start, length).flatMap((name, i) => {
      const sizes = icons[name];

      X_OFFSET = 0;
      if (i !== 0) {
        Y_OFFSET = Y_OFFSET + maxSize + 32;
      }
      maxSize = -Infinity;

      return sizes.map(icon => {
        const size = icon.original || icon.size;
        const descriptor = Object.assign({}, icon.descriptor);
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
        // Last layer will be the rectangle we made
        const paths = group.layers.slice(0, -1).map(layer => layer.duplicate());
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
          shape = new Shape({
            name: 'Fill',
            frame: new Rectangle(0, 0, icon.size, icon.size),
            layers: fillPaths,
            style: sharedStyle.style,
            sharedStyleId: sharedStyle.id,
          });
        }

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
 * @return {Object}
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

function createSVGLayer(svg) {
  const svgString = NSString.stringWithString(toString(svg));
  const svgData = svgString.dataUsingEncoding(NSUTF8StringEncoding);
  const svgImporter = MSSVGImporter.svgImporter();
  svgImporter.prepareToImportFromData(svgData);
  const svgLayer = svgImporter.importAsLayer();

  return svgLayer;
}
