/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Document } from 'sketch/dom';
import { command } from '../command';
import { syncColorStyles } from '../../sharedStyles/colors';

export function sync() {
  command('commands/colors/sync', () => {
    const document = Document.getSelectedDocument();
    const symbols = document.getSymbols();
    const symbol = Array.from(symbols).find(
      symbol => symbol.name === 'test-symbol-replacement'
    );

    const exceptions = [];
    const target = {
      type: 'ShapePath',
      id: '19258E68-471A-4F3F-B0A5-EEE8557CEA18',
      frame: { x: 0, y: 0, width: 80, height: 80 },
      name: 'Oval',
      selected: false,
      hidden: false,
      locked: false,
      exportFormats: [],
      transform: {
        rotation: 0,
        flippedHorizontally: false,
        flippedVertically: false,
      },
      style: {
        type: 'Style',
        id: '95FE83F7-2E35-4D95-BB2C-ADF6F40F45FB',
        opacity: 1,
        blendingMode: 'Normal',
        borderOptions: {
          startArrowhead: 'None',
          endArrowhead: 'None',
          dashPattern: [],
          lineEnd: 'Butt',
          lineJoin: 'Miter',
        },
        blur: {
          center: { x: 0.5, y: 0.5 },
          motionAngle: 0,
          radius: 10,
          enabled: false,
          blurType: 'Gaussian',
        },
        fills: [
          {
            fillType: 'Color',
            color: '#000000ff',
            gradient: {
              gradientType: 'Linear',
              from: { x: 0.5, y: 0 },
              to: { x: 0.5, y: 1 },
              aspectRatio: 0,
              stops: [
                { position: 0, color: '#ffffffff' },
                { position: 1, color: '#000000ff' },
              ],
            },
            pattern: { patternType: 'Fill', image: null, tileScale: 1 },
            enabled: true,
          },
        ],
        borders: [],
        shadows: [],
        innerShadows: [],
        styleType: 'Layer',
      },
      sharedStyleId: '52852003-797D-4C0F-938D-C4B74CBDA8CB',
      shapeType: 'Oval',
      points: [
        {
          type: 'CurvePoint',
          cornerRadius: 0,
          curveFrom: { x: 0.7761423749, y: 1 },
          curveTo: { x: 0.2238576251, y: 1 },
          point: { x: 0.5, y: 1 },
          pointType: 'Mirrored',
        },
        {
          type: 'CurvePoint',
          cornerRadius: 0,
          curveFrom: { x: 1, y: 0.2238576251 },
          curveTo: { x: 1, y: 0.7761423749 },
          point: { x: 1, y: 0.5 },
          pointType: 'Mirrored',
        },
        {
          type: 'CurvePoint',
          cornerRadius: 0,
          curveFrom: { x: 0.2238576251, y: 0 },
          curveTo: { x: 0.7761423749, y: 0 },
          point: { x: 0.5, y: 0 },
          pointType: 'Mirrored',
        },
        {
          type: 'CurvePoint',
          cornerRadius: 0,
          curveFrom: { x: 0, y: 0.7761423749 },
          curveTo: { x: 0, y: 0.2238576251 },
          point: { x: 0, y: 0.5 },
          pointType: 'Mirrored',
        },
      ],
      closed: true,
    };

    symbol.layers[1] = merge(target, symbol.layers[1], [
      'type',
      'id',
      'gradient',
      'pattern',
      'styleType',
      'shapeType',
    ]);
    // console.log(merge(target, symbol.layers[1]));

    // symbol.layers[1].frame.width = 141;
    // symbol.layers[1].frame.height = 141;

    // const instances = Array.from(symbol.getAllInstances());
    // console.log(instances[0]);

    // console.log('hi');
    // syncColorStyles(document);
  });
}

function merge(target, source, exceptions = []) {
  if (Array.isArray(target)) {
    return target.map((element, index) => {
      if (source[index] !== undefined) {
        return merge(element, source[index], exceptions);
      }
      return element;
    });
  }

  if (target === null || target === undefined || typeof target !== 'object') {
    return target;
  }

  return Object.keys(target).reduce((acc, key) => {
    console.log(key);
    if (exceptions.includes(key)) {
      return acc;
    }

    if (source[key] === undefined) {
      acc[key] = target[key];
      return acc;
    }

    acc[key] = merge(target[key], source[key], exceptions);
    return acc;
  }, source);
}
