/**
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const parser = require('svgson');
const { svgo } = require('./optimizer');
const { getModuleName } = require('./getModuleName');

// Icon size targets and default size. Not used with pictograms
const sizes = [32, 24, 20, 16];
const defaultSize = 32;

/**
 * @typedef {object} OutputExtensionOptions
 * @property {('icons' | 'pictograms')} target
 */
const defaultOptions = {
  target: 'icons',
};

/**
 * @type {Extension}
 */
const output = (options = defaultOptions) => {
  return {
    name: 'output',
    computed: true,
    async extend(metadata) {
      for (const icon of metadata.icons) {
        for (const asset of icon.assets) {
          asset.optimized = await svgo.optimize(asset.source, {
            path: asset.filepath,
          });
        }

        if (options.target === 'pictograms') {
          const [asset] = icon.assets;
          const descriptor = await createDescriptor(
            icon.name,
            asset.optimized.data
          );
          icon.output = [
            {
              moduleName: getModuleName(
                icon.name,
                null,
                icon.namespace,
                descriptor
              ),
              filepath: [...icon.namespace, `${icon.name}/index.js`].join('/'),
              descriptor,
            },
          ];
          continue;
        }

        if (icon.sizes.length === 1 && icon.sizes[0] === 'glyph') {
          const [asset] = icon.assets;
          icon.output = [
            {
              descriptor: await createDescriptor(
                icon.name,
                asset.optimized.data,
                'glyph'
              ),
              moduleName: getModuleName(icon.name, 'glyph', icon.namespace),
              filepath: [...icon.namespace, icon.name, 'index.js'].join('/'),
              size: 'glyph',
            },
          ];
          continue;
        }

        // If the target is not set to pictograms, then we're building up
        // metadata for icons
        const defaultAsset = icon.assets.find(
          (asset) => asset.size === defaultSize
        );
        // eslint-disable-next-line require-atomic-updates
        icon.output = await Promise.all(
          sizes.map(async (size) => {
            const asset = icon.assets.find((asset) => asset.size === size);
            const descriptor = asset
              ? await createDescriptor(icon.name, asset.optimized.data, size)
              : await createDescriptor(
                  icon.name,
                  defaultAsset.optimized.data,
                  size,
                  defaultAsset.size
                );
            return {
              moduleName: getModuleName(
                icon.name,
                size,
                icon.namespace,
                descriptor
              ),
              filepath: [...icon.namespace, icon.name, `${size}.js`].join('/'),
              descriptor,
              size,
            };
          })
        );

        // Handle glyph sizes that may not be one of our predetermined sizes
        const hasGlyphAsset = icon.sizes.find((size) => size === 'glyph');
        if (hasGlyphAsset) {
          const asset = icon.assets.find((asset) => asset.size === 'glyph');
          icon.output.push({
            descriptor: await createDescriptor(
              icon.name,
              asset.optimized.data,
              'glyph'
            ),
            moduleName: getModuleName(icon.name, 'glyph', icon.namespace),
            filepath: [...icon.namespace, icon.name, 'index.js'].join('/'),
            size: 'glyph',
          });
        }
      }
    },
  };
};

/**
 * Create a descriptor for the given asset data given its target size and an
 * optional original size.
 *
 * Size can optionally be passed in as `undefined` or `null` for pictograms, or
 * for modules that don't want a size set on the descriptor. It can also be set
 * to `glyph` in order to set the exact dimensions from the data on the
 * descriptor.
 *
 * In cases where we want to downsample a given icon, for example going from
 * 32x32px to 16x16px, you can pass in the original size so that the generated
 * viewBox attribute is correct.
 *
 * @param {string} name
 * @param {string} data
 * @param {(string | 'glyph')} [size]
 * @param {string} [original]
 * @returns {object}
 */
async function createDescriptor(name, data, size, original) {
  const info = parse(data, name);
  const { attrs } = info;
  const descriptor = {
    ...info,
    name,
    attrs: {
      ...attrs,
      fill: 'currentColor',
    },
  };

  if (size) {
    descriptor.size = size;
    if (size !== 'glyph') {
      descriptor.attrs.width = size;
      descriptor.attrs.height = size;
      descriptor.attrs.viewBox = original
        ? `0 0 ${original} ${original}`
        : `0 0 ${size} ${size}`;
    } else {
      const [width, height] = info.attrs.viewBox.split(' ').slice(2);
      descriptor.attrs.width = width;
      descriptor.attrs.height = height;
    }
  } else {
    descriptor.attrs.width = 64;
    descriptor.attrs.height = 64;
  }

  return descriptor;
}

/**
 * Attempt to parse the given svg string to an object-based representation
 * using svgson (similar structure to XAST)
 * @param {string} svg - the source svg for the icon
 * @param {string} name - the name of the icon
 * @returns {object}
 */
function parse(svg, name) {
  try {
    const root = parser.parseSync(svg);
    // svgson returns the root element directly (not wrapped in a 'root' node)
    // It has type: 'element', name, attributes, children structure similar to XAST
    if (root.type === 'element') {
      return convert(root);
    }
    throw new Error('Invalid SVG structure: no root element found');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    // eslint-disable-next-line no-console
    console.log(`Error parsing icon with name: ${name}`);
    throw error;
  }
}

/**
 * Converts the data structure from XAST to one that we can use for a
 * descriptor
 * @param {object} node - XAST node (element type)
 * @returns {object}
 */
function convert(node) {
  // XAST structure: name instead of elem, attributes (plain object) instead of attrs.value, children instead of content
  if (node.type !== 'element') {
    throw new Error(`Expected element node, got ${node.type}`);
  }

  const { name, attributes = {}, children } = node;
  const safeFormat = {
    elem: name,
    attrs: attributes,
  };

  if (children && children.length > 0) {
    safeFormat.content = children
      .filter((child) => child.type === 'element') // Only convert element nodes
      .map(convert);
  }

  return safeFormat;
}

module.exports = output;
