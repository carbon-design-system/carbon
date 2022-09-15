/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const deepReplace = require('../../tools/deep-replace');
const { addons, managerWebpack, webpackFinal } = require('../main');

const arrayify = value => (Array.isArray(value) ? value : value != null ? [value] : []); // eslint-disable-line no-nested-ternary
const testMatches = (test, s) => arrayify(test).some(item => item.test && item.test(s));

module.exports = {
  stories: ['../../src/**/*-story-vue.ts'],
  addons,
  managerWebpack,
  webpackFinal(config, options) {
    const massagedConfig = webpackFinal(config, options);
    massagedConfig.module.rules.push({
      test: /@carbon[\\/]icons-vue/i,
      use: [
        {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: [
              [
                '@babel/preset-env',
                {
                  modules: false,
                  targets: ['last 1 version', 'Firefox ESR', 'ie >= 11'],
                },
              ],
            ],
          },
        },
      ],
    });
    return massagedConfig;
  },
};
