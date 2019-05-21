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
import { findOrCreatePage } from './tools/page';
import uuid from 'uuid/v4';

const meta = require('@carbon/icons/meta.json');
const iconComponents = {
  circle: SVG.Circle,
  path: SVG.Path,
  rect: SVG.Rect,
};

export function render(context) {
  sketch.UI.message('Hi 👋 We are still working on this! 🚧');

  const page = findOrCreatePage(context, 'Icons');
  console.log(uuid());

  return;

  const icons = normalize(meta);
  const iconNames = Object.keys(icons);

  const icon = icons[iconNames[0]][0];
  console.log(icon.basename);
  const Icon = () => (
    <SVG
      name="Test"
      width={icon.size}
      height={icon.size}
      viewBox={`0 0 ${icon.size} ${icon.sizE}`}>
      <SVG.Path
        fill="#000000"
        d="M8 1C4.2 1 1 4.2 1 8s3.2 7 7 7 7-3.2 7-7-3.2-7-7-7zm3 7.5H8.5V11h-1V8.5H5v-1h2.5V5h1v2.5H11v1z"
      />
      <SVG.G name="Transparent Rectangle">
        <SVG.Rect width={icon.size} height={icon.size} opacity="0" />
      </SVG.G>
    </SVG>
  );

  ReactSketch.render(
    <View>
      <Icon />
    </View>,
    sketch.getSelectedDocument().selectedPage
  );
}

function iconToComponent(icon) {
  const { descriptor, size } = icon;

  // return (
  // <SVG width={size} height={size}>
  // </SVG>
  // );
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
