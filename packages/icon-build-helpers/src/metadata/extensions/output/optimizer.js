/**
 * Copyright IBM Corp. 2018, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { optimize } = require('svgo');

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
 *    in our `cleanupIds` plugin so that we can target them in CSS
 */
const plugins = [
  {
    name: 'removeTransparentRectangle',
    description: 'removes transparent rectangles used for bounding box',
    fn: () => {
      return {
        element: {
          enter: (node, parentNode) => {
            // Two potential situations can happen if we have a bounding Transparent
            // Rectangle, namely the node has a `<rect>` element for the rectangle or
            // the group has valid content inside of it. As a result, we can return
            // the content and then have multipass remove the `<rect>` if that is
            // what is contained inside.
            if (
              node.name === 'g' &&
              node.attributes?.id === 'Transparent_Rectangle'
            ) {
              // Replace group with its children
              if (parentNode && parentNode.children) {
                const index = parentNode.children.indexOf(node);
                if (index !== -1) {
                  parentNode.children.splice(
                    index,
                    1,
                    ...(node.children || [])
                  );
                }
              }
              return;
            }

            // Check for element with Transparent_Rectangle in id
            if (node.attributes?.id?.includes('Transparent_Rectangle')) {
              if (parentNode && parentNode.children) {
                parentNode.children = parentNode.children.filter(
                  (child) => child !== node
                );
              }
              return;
            }

            // Check for transparent rectangles by size
            const sizes = ['16', '20', '24', '32', '48'];
            if (node.name === 'rect') {
              const width = node.attributes?.width;
              const height = node.attributes?.height;
              if (
                sizes.includes(width) &&
                sizes.includes(height) &&
                width === height
              ) {
                if (parentNode && parentNode.children) {
                  parentNode.children = parentNode.children.filter(
                    (child) => child !== node
                  );
                }
              }
            }
          },
        },
      };
    },
  },
  {
    name: 'addInnerPath',
    description: 'map the inner-path id to a corresponding data attribute',
    fn: () => {
      return {
        element: {
          enter: (node) => {
            if (node.attributes?.id === 'inner-path') {
              node.attributes['data-icon-path'] = 'inner-path';
              delete node.attributes.id;
            }
          },
        },
      };
    },
  },
  {
    name: 'inlineStyles',
    params: {
      onlyMatchedOnce: false,
      removeMatchedSelectors: true,
      useMqs: ['', 'screen'],
      usePseudos: [''],
    },
  },
  // Remove the style elements from the SVG
  {
    name: 'removeStyleElement',
  },
  {
    name: 'cleanupAttrs',
  },
  {
    name: 'removeDoctype',
  },
  {
    name: 'removeXMLProcInst',
  },
  {
    name: 'removeComments',
  },
  {
    name: 'removeMetadata',
  },
  {
    // Remove any title tags because titles should be based on the context of
    // the SVG.
    name: 'removeTitle',
  },
  {
    name: 'removeDesc',
  },
  {
    name: 'removeUselessDefs',
  },
  {
    name: 'removeEditorsNSData',
  },
  {
    name: 'removeEmptyAttrs',
  },
  {
    name: 'removeHiddenElems',
    params: {
      // Special case where we don't want to ignore nodes with `opacity="0"`
      opacity0: false,
    },
  },
  {
    name: 'removeEmptyText',
  },
  {
    name: 'removeEmptyContainers',
  },
  {
    name: 'removeViewBox',
    active: false,
  },
  {
    name: 'cleanupEnableBackground',
  },
  {
    name: 'convertStyleToAttrs',
  },
  {
    name: 'convertColors',
  },
  {
    name: 'convertTransform',
  },
  {
    name: 'removeUnknownsAndDefaults',
  },
  {
    name: 'removeNonInheritableGroupAttrs',
  },
  {
    // We disable `stroke` for this plugin as enabling it will cause relevant
    // stroke-* attributes to be removed from the resulting SVG. This can cause
    // issues with pictograms that use stroke attributes for rendering
    // correctly
    name: 'removeUselessStrokeAndFill',
    params: {
      stroke: false,
    },
  },
  {
    name: 'removeUnusedNS',
  },
  {
    name: 'cleanupIds',
    params: {
      preserve: ['inner-path'],
    },
  },
  {
    name: 'cleanupNumericValues',
  },
  {
    name: 'moveGroupAttrsToElems',
  },
  {
    name: 'collapseGroups',
  },
  {
    name: 'removeRasterImages',
    active: false,
  },
  // mergePaths is disabled due to infinite loop issues in SVGO v4
  {
    name: 'convertShapeToPath',
  },
  {
    name: 'sortAttrs',
  },
  {
    name: 'removeDimensions',
  },
  {
    // Remove any ids or data attributes that are included in SVG source files.
    // Use elemSeparator '#' to allow removing namespaced attributes (xml:space)
    // that contain colons, which conflict with the default ':' separator.
    // Also avoids conflict with '|' in regex patterns like (fill|stroke)
    name: 'removeAttrs',
    params: {
      elemSeparator: '#',
      attrs: [
        'class',
        'data-name',
        // Remove namespaced attributes that cause issues in JSX
        '*#xml:space#*',
        '*#xml:lang#*',
        // Remove all fill and stroke attributes where the value is not "none"
        '*#(fill|stroke)#((?!^none$).)*',
      ],
    },
  },
];

/**
 * Optimize SVG with our custom configuration
 * @param {string} svgString - The SVG string to optimize
 * @param {object} options - Additional options (e.g., path for error messages)
 * @returns {Promise<object>} - Result object with data property containing optimized SVG
 */
async function optimizeSvg(svgString, options = {}) {
  return optimize(svgString, {
    path: options.path,
    multipass: true,
    plugins: plugins,
  });
}

module.exports = {
  optimize: optimizeSvg,
  svgo: {
    optimize: optimizeSvg,
  },
  plugins,
};
