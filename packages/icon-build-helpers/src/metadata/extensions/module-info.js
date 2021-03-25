/**
 * Copyright IBM Corp. 2020, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { pascalCase } = require('change-case');
const path = require('path');
const { parse } = require('svg-parser');
const { svgo } = require('./output/optimizer');

/**
 * @type {Extension}
 */
const moduleInfo = () => {
  return {
    name: 'module-info',
    computed: true,
    async extend(metadata) {
      for (const icon of metadata.icons) {
        const moduleName = getModuleName(icon.name);
        const component = {
          name: getJSModuleName(moduleName),
          filepath: path.join(...icon.namespace, `${moduleName}.js`),
          sizes: await Promise.all(
            icon.assets.map(async (asset) => {
              const optimized = await svgo.optimize(asset.source, {
                path: asset.filepath,
              });
              const ast = parse(optimized.data);

              return {
                size: asset.size,
                ast,
              };
            })
          ),
        };

        icon.component = component;
      }
    },
  };
};

/**
 * @param {string} name
 * @param {Array<string>} [namespace]
 * @returns {string}
 */
function getModuleName(name, namespace = []) {
  let moduleName = namespace
    .filter((size) => isNaN(size))
    .map(pascalCase)
    .join('');

  moduleName = moduleName + pascalCase(name);

  return moduleName;
}

function getJSModuleName(name) {
  if (!isNaN(name[0])) {
    return '_' + name;
  }
  return name;
}

module.exports = moduleInfo;
