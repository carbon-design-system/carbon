'use strict';

const SVGO = require('svgo');
const svg2js = require('svgo/lib/svgo/svg2js');

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

        if (
          item.isElem('rect') &&
          item.attr('width', '32') &&
          item.attr('height', '32')
        ) {
          return !item;
        }

        if (
          item.isElem('rect') &&
          item.attr('width', '16') &&
          item.attr('height', '16')
        ) {
          return !item;
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
    removeHiddenElems: true,
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
    cleanupIDs: true,
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
      attrs: ['class', 'data-name', 'fill', 'id'],
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
