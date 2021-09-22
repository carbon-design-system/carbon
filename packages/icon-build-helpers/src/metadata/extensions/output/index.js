/**
 * Copyright IBM Corp. 2020, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const svg2js = require('svgo/lib/svgo/svg2js');
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
  const info = await parse(data, name);
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
 * using SVGO's svg2js
 * @param {string} svg - the source svg for the icon
 * @param {string} name - the name of the icon
 * @returns {object}
 */
async function parse(svg, name) {
  const root = await svg2jsAsync(svg);
  try {
    return convert(root.content[0]);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    // eslint-disable-next-line no-console
    console.log(`Error parsing icon with name: ${name}`);
  }
}

/**
 * Convert svg2js from a callback style to a Promise
 * @param {any} args
 * @returns {Promise}
 */
function svg2jsAsync(...args) {
  return new Promise((resolve, reject) => {
    svg2js(...args, ({ error, ...rest }) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(rest);
    });
  });
}

/**
 * Converts the data structure from svg2js to one that we can use for a
 * descriptor
 * @param {object} root
 * @returns {object}
 */
function convert(root) {
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
}

module.exports = output;
