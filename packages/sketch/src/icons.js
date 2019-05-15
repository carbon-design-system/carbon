/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import 'core-js/features/array/flat-map';

import sketch from 'sketch';
import {
  Artboard,
  Group,
  Rectangle,
  ShapePath,
  Style,
  SymbolMaster,
} from 'sketch/dom';
import { findOrCreatePage } from './tools/page';
import { convertToShapePath } from './tools/svg';

const meta = require('@carbon/icons/meta.json');

export function render(context) {
  sketch.UI.message('Hi 👋 We are still working on this! 🚧');

  const page = findOrCreatePage(context, 'Icons');
  const icons = normalize(meta);
  const iconNames = Object.keys(icons);

  const ARTBOARD_HORIZONTAL_MARGIN = 8;
  const ARTBOARD_VERTICAL_MARGIN = 32;

  let X_OFFSET = 0;
  let Y_OFFSET = 0;

  for (let i = 0; i < 10; i++) {
    const sizes = icons[iconNames[i]];
    let largestSize = -Infinity;

    for (let j = 0; j < sizes.length; j++) {
      const { basename, descriptor, original, size } = sizes[j];
      let name = `category/${basename}/${size}`;

      if (original) {
        name = `${name}*`;
      }

      const group = new Group({
        name: basename,
        frame: new Rectangle(0, 0, original || size, original || size),
        layers: descriptor.content.map(node => {
          return convertToShapePath(node, {
            style: {
              // fills: [
              // {
              // color: '#000000',
              // fillType: Style.FillType.Color,
              // },
              // ],
            },
          });
        }),
      });

      if (original) {
        group.frame.scale(size / original);
      }

      const symbol = new SymbolMaster({
        name,
        parent: page,
        frame: new Rectangle(X_OFFSET, Y_OFFSET, size, size),
        layers: [group],
      });

      X_OFFSET = X_OFFSET + size + ARTBOARD_HORIZONTAL_MARGIN;
      if (size > largestSize) {
        largestSize = size;
      }
    }

    X_OFFSET = 0;
    Y_OFFSET = Y_OFFSET + largestSize + ARTBOARD_VERTICAL_MARGIN;
  }
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
    if (acc[icon.basename]) {
      return {
        ...acc,
        [icon.basename]: acc[icon.basename].concat(icon).sort(sortBySize),
      };
    }
    return {
      ...acc,
      [icon.basename]: [icon],
    };
  }, {});

  return iconsByBasename;
}

function sortBySize(a, b) {
  return b.size - a.size;
}
