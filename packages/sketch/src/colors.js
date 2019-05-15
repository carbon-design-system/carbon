/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { colors } from '@carbon/colors';
import { formatTokenName } from '@carbon/themes';
import sketch from 'sketch';
import {
  Rectangle,
  ShapePath,
  SharedStyle,
  Style,
  SymbolMaster,
} from 'sketch/dom';
import { findOrCreatePage } from './tools/page';

const { black, white, orange, yellow, ...swatches } = colors;
const colorNames = Object.keys(colors);
const formattedSwatchNames = colorNames.reduce(
  (acc, key, i) => ({
    ...acc,
    [formatTokenName(key)]: colorNames[i],
  }),
  {}
);

export function render(context) {
  sketch.UI.message('Hi 👋 We are still working on this! 🚧');

  const layerStyles = context.document.layerStyles();
  const sharedStyles = layerStyles.sharedStyles();

  for (let i = sharedStyles.count() - 1; i >= 0; i--) {
    const sharedStyle = sharedStyles.objectAtIndex(i);
    const name = sharedStyle.name();
    const parts = name.split('/');

    if (parts.length !== 3) {
      continue;
    }

    const [namespace, swatch, grade] = parts;
    if (namespace !== 'color') {
      continue;
    }

    if (!formattedSwatchNames[swatch]) {
      continue;
    }

    const formattedSwatchName = formattedSwatchNames[swatch];

    if (colors[formattedSwatchName] && colors[formattedSwatchName][grade]) {
      layerStyles.removeSharedStyle(sharedStyle);
    }
  }

  const page = findOrCreatePage(context, 'Color');

  const swatchNames = Object.keys(swatches);
  const ARTBOARD_WIDTH = 40;
  const ARTBOARD_HEIGHT = 40;
  const ARTBOARD_MARGIN = 8;

  for (let i = 0; i < swatchNames.length; i++) {
    const swatch = swatchNames[i];
    const grades = Object.keys(swatches[swatch]);

    for (let j = 0; j < grades.length; j++) {
      const grade = grades[j];
      const name = formatTokenName(swatch);
      const colorName = `${name}-${grade}`;
      const sharedStyle = SharedStyle.fromStyle({
        name: ['color', name, grade].join('/'),
        style: {
          fills: [
            {
              color: swatches[swatch][grade],
              fillType: Style.FillType.Color,
            },
          ],
        },
        document: context.document,
      });

      const rectangle = new ShapePath({
        name: colorName,
        frame: new Rectangle(0, 0, ARTBOARD_WIDTH, ARTBOARD_HEIGHT),
        shapeType: ShapePath.ShapeType.Rectangle,
        sharedStyleId: sharedStyle.id,
        style: sharedStyle.style,
      });

      const artboard = new SymbolMaster({
        name: `color/${name}/${name}-${grade}`,
        parent: page,
        frame: new Rectangle(
          ARTBOARD_HEIGHT * j + ARTBOARD_MARGIN * j,
          ARTBOARD_HEIGHT * i + ARTBOARD_MARGIN * i,
          40,
          40
        ),
        layers: [rectangle],
      });
    }
  }
}
