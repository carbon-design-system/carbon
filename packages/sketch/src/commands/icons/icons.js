/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import 'core-js/features/array/flat-map';

import React from 'react';
import ReactSketch, { View, Text, Svg as SVG } from 'react-sketchapp';
import sketch from 'sketch';
import {
  Document,
  Group,
  Rectangle,
  Shape,
  Style,
  SymbolMaster,
} from 'sketch/dom';
import { findOrCreatePage } from './tools/page';
import { syncColorStyles } from './sharedStyles';

const meta = require('@carbon/icons/meta.json');

const SVGNodeReference = {
  circle: SVG.Circle,
  path: SVG.Path,
  rect: SVG.Rect,
};

export function render(context) {
  sketch.UI.message('Hi 👋 We are still working on this! 🚧');

  const document = Document.getSelectedDocument();
  const sharedStyles = syncColorStyles(document);
  const [sharedStyle] = sharedStyles.filter(
    ({ name }) => name === 'color/black'
  );

  if (!sharedStyle) {
    throw new Error(
      'Unexpected error occurred, expected shared style but found none'
    );
  }

  const page = findOrCreatePage(document, 'Icons');
  page.selected = true;

  const icons = normalize(meta);
  const iconNames = Object.keys(icons);
  const start = 0;
  const length = iconNames.length;

  ReactSketch.render(
    <View name="rendered">
      {iconNames.slice(start, length).map(name => {
        const sizes = icons[name];

        return (
          <View key={name} name={name}>
            {sizes.map(icon => {
              const size = icon.original || icon.size;
              const viewBox = `0 0 ${size} ${size}`;
              const name = `${icon.size}`;
              return (
                <SVG
                  key={icon.size}
                  width={size}
                  height={size}
                  viewBox={viewBox}
                  name={name}>
                  {icon.descriptor.content.map((descriptor, index) => {
                    const { elem, attrs, content } = descriptor;
                    const SVGComponent = SVGNodeReference[elem];

                    return <SVGComponent key={index} {...attrs} />;
                  })}
                  <SVG.Rect width={size} height={size} opacity="0" />
                </SVG>
              );
            })}
          </View>
        );
      })}
    </View>,
    page
  );

  const rendered = page.layers.find(({ name }) => name === 'rendered');
  if (!rendered) {
    throw new Error('Unexpected error occurred, expected rendered view');
  }

  let X_OFFSET = 0;
  let Y_OFFSET = 0;

  iconNames.slice(start, length).forEach((name, i) => {
    const sizes = icons[name];
    const sizesLayer = rendered.layers[i];
    let maxSize = -Infinity;

    sizes.forEach((icon, j) => {
      const size = parseInt(icon.size, 10);
      const sizeLayer = sizesLayer.layers[j];
      const paths = sizeLayer.layers[0].layers[0].layers
        .filter(path => {
          return (
            path.shapeType !== 'Rectangle' &&
            path.frame.width !== icon.width &&
            path.frame.height !== icon.height
          );
        })
        .map(path => path.duplicate());

      if (size > maxSize) {
        maxSize = size;
      }

      let maxWidth = -Infinity;
      let maxHeight = -Infinity;

      for (const path of paths) {
        if (path.frame.width > maxWidth) {
          maxWidth = path.frame.width;
        }
        if (path.frame.height > maxHeight) {
          maxHeight = path.frame.height;
        }
      }

      const [pathsToFill, innerPaths] = split(paths, path => {
        return path.style.opacity;
      });

      const deltaX = (icon.size - maxWidth) / 2;
      const deltaY = (icon.size - maxHeight) / 2;
      const fillShape = new Shape({
        name: 'Fill',
        frame: new Rectangle(0, 0, size, size),
        layers: pathsToFill,
        style: sharedStyle.style,
        sharedStyleId: sharedStyle.id,
      });
      const innerPathShape = new Shape({
        name: 'Inner path',
        frame: new Rectangle(0, 0, size, size),
        style: {
          ...sharedStyle.style,
          opacity: 0,
        },
        sharedStyleId: sharedStyle.id,
        layers: innerPaths,
      });

      const group = new Group({
        name: 'Icon',
        frame: new Rectangle(
          0,
          0,
          icon.original || size,
          icon.original || size
        ),
        layers: [fillShape, innerPathShape],
      });

      if (icon.original) {
        group.frame.scale(size / icon.original);
      }

      let symbolName =
        sizes.length !== 1
          ? `category/${name}/${icon.size}`
          : `category/${name}`;

      if (icon.original) {
        symbolName = `${symbolName}*`;
      }

      const artboard = new SymbolMaster({
        name: symbolName,
        frame: new Rectangle(X_OFFSET, Y_OFFSET, size, size),
        parent: page,
        layers: [group],
      });

      X_OFFSET = X_OFFSET + size + 8;
    });

    X_OFFSET = 0;
    Y_OFFSET = Y_OFFSET + maxSize + 32;
  });

  rendered.remove();

  console.log('Done!');
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

function split(collection, sorter) {
  const result = [[], []];
  for (const element of collection) {
    if (sorter(element)) {
      result[0].push(element);
    } else {
      result[1].push(element);
    }
  }
  return result;
}
