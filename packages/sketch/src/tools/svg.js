/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ShapePath } from 'sketch/dom';

// Sometimes we need to convert non-path data due to limitations in
// convertShapeToPath plugin, namely when a rect has an `rx` or `ry` attribute
export function convertToShapePath(node, properties) {
  let shapePath;

  if (node.elem === 'path') {
    shapePath = ShapePath.fromSVGPath(node.attrs.d);
  }

  if (node.elem === 'circle') {
    const { cx, cy, r } = node.attrs;
    const path = `
M ${cx - r}, ${cy}
a ${r},${r} 0 1,0 ${r * 2},0
a ${r},${r} 0 1,0 -${r * 2},0
`;

    shapePath = ShapePath.fromSVGPath(path);
  }

  if (node.elem === 'rect') {
    const { attrs } = node;
    const cornerRadius = attrs.rx ? parseInt(attrs.rx, 10) : 0;

    shapePath = new ShapePath({
      shapeType: ShapePath.ShapeType.Rectangle,
      frame: new Rectangle(attrs.x, attrs.y, attrs.width, attrs.height),
      points: [
        {
          type: 'CurvePoint',
          cornerRadius,
          point: {
            x: 0,
            y: 0,
          },
          curveFrom: {
            x: 0,
            y: 0,
          },
          curveTo: {
            x: 0,
            y: 0,
          },
          pointType: 'Straight',
        },
        {
          type: 'CurvePoint',
          cornerRadius,
          point: {
            x: 1,
            y: 0,
          },
          curveFrom: {
            x: 1,
            y: 0,
          },
          curveTo: {
            x: 1,
            y: 0,
          },
          pointType: 'Straight',
        },
        {
          type: 'CurvePoint',
          cornerRadius,
          point: {
            x: 1,
            y: 1,
          },
          curveFrom: {
            x: 1,
            y: 1,
          },
          curveTo: {
            x: 1,
            y: 1,
          },
          pointType: 'Straight',
        },
        {
          type: 'CurvePoint',
          cornerRadius,
          point: {
            x: 0,
            y: 1,
          },
          curveFrom: {
            x: 0,
            y: 1,
          },
          curveTo: {
            x: 0,
            y: 1,
          },
          pointType: 'Straight',
        },
      ],
    });
  }

  if (!shapePath) {
    throw new Error(`Unsupported element type: \`${node.elem}\``);
  }

  Object.keys(properties).forEach(key => {
    shapePath[key] = properties[key];
  });

  return shapePath;
}
