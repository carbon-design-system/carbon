/**
 * Copyright IBM Corp. 2020, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const assets = require('../assets');
const icons = require('../icons');
const { svgo } = require('./optimizer');
const { getModuleName } = require('./getModuleName');

const defaultOptions = {
  // sizes: [32, 24, 20, 16],
  // defaultSize: 32,
};

/**
 * @type {Extension}
 */
const build = (options = defaultOptions) => {
  return {
    name: 'build',
    computed: true,
    before: [assets],
    async extend(metadata, _data, registry) {
      for (const icon of metadata.icons) {
        for (const asset of icon.assets) {
          asset.optimized = await svgo.optimize(asset.source, {
            path: asset.filepath,
          });
        }

        icon.output = {
          name: icon.name,
        };

        continue;
        icon.output = await Promise.all(
          options.sizes.map(async size => {
            const asset = icon.assets.find(asset => asset.size === size);
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
            };
          })
        );
      }

      return;
      for (const icon of metadata.icons) {
        for (const asset of icon.assets) {
          asset.optimized = await svgo.optimize(asset.source, {
            path: asset.filepath,
          });
        }

        const defaultAsset = icon.assets.find(
          asset => asset.size === options.defaultSize
        );
        icon.output = await Promise.all(
          options.sizes.map(async size => {
            const asset = icon.assets.find(asset => asset.size === size);
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
            };
          })
        );
      }
    },
  };
};

/**
 * @param {string} name
 * @param {string} data
 * @param {string} [size]
 * @param {string} [original]
 * @returns {object}
 */
async function createDescriptor(name, data, size, original) {
  const info = await parse(data, name);
  const descriptor = {
    ...info,
    name,
  };

  if (size) {
    descriptor.size = size;
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

  return descriptor;
}

const svg2js = require('svgo/lib/svgo/svg2js');

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

module.exports = build;
