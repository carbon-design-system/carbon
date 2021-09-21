/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const SVGO = require('svgo');

/**
 * Our SVGO plugin options differ a bit from the defaults, namely in the
 * following areas:
 *
 * 1) We remove the transparent rectangle used for artboard sizes
 * 2) In order to support styling paths inside of an SVG, we offer SVGs that
 *    "punch out" the inner path and include the path as a distinct `<path>`
 *    node. This defaults to `opacity="0"` so that the background color will
 *    bleed through by default. As a result, we disable the opacity rule of
 *    `removeHiddenElems`
 * 3) In order to support consistent inner styling, we let specific ids through
 *    in our `cleanupIDs` plugin so that we can target them in CSS
 */
const plugins = [
  {
    removeTransparentRectangle: {
      type: 'perItem',
      description: 'removes transparent rectangles used for bounding box',
      fn(item) {
        // Two potential situations can happen if we have a bounding Transparent
        // Rectangle, namely the node has a `<rect>` element for the rectangle or
        // the group has valid content inside of it. As a result, we can return
        // the content and then have multipass remove the `<rect>` if that is
        // what is contained inside.
        if (item.isElem('g') && item.attr('id', 'Transparent_Rectangle')) {
          return item.content;
        }

        if (item.hasAttr('id')) {
          if (item.attr('id').value.includes('Transparent_Rectangle')) {
            return !item;
          }
        }

        const sizes = ['16', '20', '24', '32', '48'];

        for (const size of sizes) {
          if (
            item.isElem('rect') &&
            item.attr('width', size) &&
            item.attr('height', size)
          ) {
            return !item;
          }
        }
        return item;
      },
    },
  },
  {
    addInnerPath: {
      type: 'perItem',
      description: 'map the inner-path id to a corresponding data attribute',
      fn(item) {
        if (item.attr('id', 'inner-path')) {
          item.removeAttr('id');
          item.addAttr({
            name: 'data-icon-path',
            value: 'inner-path',
            prefix: '',
            local: 'data-icon-path',
          });
        }
        return item;
      },
    },
  },
  {
    inlineStyles: {
      onlyMatchedOnce: false,
      removeMatchedSelectors: true,
      useMqs: ['', 'screen'],
      usePseudos: [''],
    },
  },
  // Remove the style elements from the SVG
  {
    removeStyleElement: true,
  },
  {
    cleanupAttrs: true,
  },
  {
    removeDoctype: true,
  },
  {
    removeXMLProcInst: true,
  },
  {
    removeComments: true,
  },
  {
    removeMetadata: true,
  },
  {
    // Remove any title tags because titles should be based on the context of
    // the SVG.
    removeTitle: true,
  },
  {
    removeDesc: true,
  },
  {
    removeUselessDefs: true,
  },
  {
    removeEditorsNSData: true,
  },
  {
    removeEmptyAttrs: true,
  },
  {
    removeHiddenElems: {
      // Special case where we don't want to ignore nodes with `opacity="0"`
      opacity0: false,
    },
  },
  {
    removeEmptyText: true,
  },
  {
    removeEmptyContainers: true,
  },
  {
    removeViewBox: false,
  },
  {
    cleanupEnableBackground: true,
  },
  {
    convertStyleToAttrs: true,
  },
  {
    convertColors: true,
  },
  {
    convertPathData: false,
  },
  {
    convertTransform: true,
  },
  {
    removeUnknownsAndDefaults: true,
  },
  {
    removeNonInheritableGroupAttrs: true,
  },
  {
    // We disable `stroke` for this plugin as enabling it will cause relevant
    // stroke-* attributes to be removed from the resulting SVG. This can cause
    // issues with pictograms that use stroke attributes for rendering
    // correctly
    removeUselessStrokeAndFill: {
      stroke: false,
    },
  },
  {
    removeUnusedNS: true,
  },
  {
    cleanupIDs: {
      preserve: ['inner-path'],
    },
  },
  {
    cleanupNumericValues: true,
  },
  {
    moveGroupAttrsToElems: true,
  },
  {
    collapseGroups: true,
  },
  {
    removeRasterImages: false,
  },
  {
    mergePaths: true,
  },
  {
    convertShapeToPath: true,
  },
  {
    sortAttrs: true,
  },
  {
    removeDimensions: true,
  },
  {
    // Remove any ids or data attributes that are included in SVG source files.
    removeAttrs: {
      attrs: [
        'class',
        'data-name',
        // Remove all fill and stroke attributes where the value is not "none"
        // https://github.com/svg/svgo/pull/977
        '*:(fill|stroke):((?!^none$).)*',
      ],
    },
  },
];

const svgo = new SVGO({
  plugins,
  full: true,
  multipass: true,
});

module.exports = {
  svgo,
  plugins,
};
