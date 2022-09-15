/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const { readFile, writeFile } = require('fs');
const path = require('path');
const { promisify } = require('util');
const mkdirp = require('mkdirp');
const { transformAsync } = require('@babel/core');
const babelPluginCreateReactCustomElementType = require('../../tools/babel-plugin-create-react-custom-element-type');
const { addons, managerWebpack, webpackFinal } = require('../main');

const regexComponentsReactPath = /es[\\/]components-react[\\/](.*?)(\.[jt]s)?$/;
const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);
const mkdirpAsync = promisify(mkdirp);

const buildCreateReactCustomElementTypeBabelOpts = {
  babelrc: false,
  plugins: [
    ['@babel/plugin-syntax-decorators', { decoratorsBeforeExport: true }],
    '@babel/plugin-syntax-typescript',
    '@babel/plugin-proposal-nullish-coalescing-operator',
    '@babel/plugin-proposal-optional-chaining',
    babelPluginCreateReactCustomElementType,
  ],
};

/**
 * Generates React wrapper module for the given custom element module.
 * @param {string} dst The file path of the generated React wrapper module.
 * @param {string} src The file path of the custom element module.
 */
const buildReactCustomElementTypeOnTheFly = async (dst, src) => {
  await mkdirpAsync(path.dirname(dst));
  const transformed = await transformAsync(await readFileAsync(src), {
    ...buildCreateReactCustomElementTypeBabelOpts,
    filename: src,
  });
  await writeFileAsync(dst, transformed.code);
};

class CreateReactCustomElementTypeProxyPlugin {
  /**
   * A WebPack resolver plugin that proxies module request for:
   *
   * * `carbon-web-components/es/components-react/**` to the corresponsing local path in this project
   * * `es/components`/`es/globals` to the corresponding source code, given the former may not have been built yet
   */
  constructor() {
    this.source = 'before-described-relative';
  }

  apply(resolver) {
    resolver.plugin(this.source, (request, callback) => {
      request.path = request.path
        .replace(/[\\/]es[\\/](components|globals)[\\/](.*?)(\.[jt]s)?$/i, '/src/$1/$2')
        .replace(/[\\/](es|src)[\\/]components-react[\\/](.*)[\\/]defs(\.[jt]s)?$/i, '/src/components/$2/defs');
      const tokens = regexComponentsReactPath.exec(request.path);
      if (!tokens) {
        // Bails if the request is not of the React wrapper module
        callback();
        return;
      }
      const src = path.resolve(__dirname, '../../src/components', `${tokens[1]}.ts`);
      const dst = path.resolve(__dirname, '../../es/components-react', `${tokens[1]}.js`);
      (process.env.NODE_ENV === 'production' ? Promise.resolve() : buildReactCustomElementTypeOnTheFly(dst, src)).then(() => {
        request.path = dst;
        callback();
      }, callback);
    });
  }
}

module.exports = {
  stories: ['../../docs/**/*-story-react.mdx', '../../src/**/*-story-react.tsx'],
  addons,
  managerWebpack,
  webpackFinal(config, options) {
    const massagedConfig = webpackFinal(config, options);
    if (!massagedConfig.resolve.plugins) {
      massagedConfig.resolve.plugins = [];
    }
    massagedConfig.resolve.plugins.push(new CreateReactCustomElementTypeProxyPlugin());
    return massagedConfig;
  },
};
