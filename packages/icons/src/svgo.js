/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const SVGO = require('svgo');
const svg2js = require('svgo/lib/svgo/svg2js');

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
        // Rectangle, namly the node has a `<rect>` element for the rectangle or
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

        const sizes = ['16', '20', '24', '32'];

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
    convertPathData: true,
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
    removeUselessStrokeAndFill: true,
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
    moveElemsAttrsToGroup: true,
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
      attrs: ['class', 'data-name', 'fill'],
    },
  },
];

const svgo = new SVGO({
  plugins,
  full: true,
  multipass: true,
});

const svg2jsAsync = (...args) =>
  new Promise((resolve, reject) => {
    svg2js(...args, ({ error, ...rest }) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(rest);
    });
  });

const parse = async (svg, name) => {
  const root = await svg2jsAsync(svg);
  try {
    return convert(root.content[0]);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    // eslint-disable-next-line no-console
    console.log(`Error parsing icon with name: ${name}`);
  }
};

const convert = root => {
  const { elem, attrs = {}, content } = root;
  const safeFormat = {
    elem,
    attrs: Object.keys(attrs).reduce((acc, attr) => {
      return {
        ...acc,
        [attr]: attrs[attr].value,
      };
    }, {}),
  };

  if (content) {
    safeFormat.content = content.map(convert);
  }

  return safeFormat;
};

module.exports = {
  svgo,
  plugins,
  svg2js: svg2jsAsync,
  parse,
};
