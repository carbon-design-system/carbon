/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

import path from 'path';
import { fileURLToPath } from 'url';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import fs from 'fs/promises';
import postcss from 'postcss';

import fixHostPseudo from '../tools/postcss-fix-host-pseudo.js';
import litSCSS from '../tools/rollup-plugin-lit-scss.js';
import * as packageJson from '../package.json' with { type: 'json' };

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_BANNER = 'let process = { env: {} };';

/**
 * Gets all of the folders and returns out
 *
 * @param {string} dir Directory to check
 * @returns {Promise<string[]>} List of folders
 * @private
 */
async function getFolders(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
}

/**
 * Builds all dist bundles for components.
 */
async function buildDist() {
  const { build: tsdown } = await import('tsdown');
  const packageRoot = path.resolve(__dirname, '..');
  const componentsDir = path.resolve(packageRoot, 'src/components');
  const postCSSPlugins = [fixHostPseudo(), autoprefixer(), cssnano()];
  const licenseBanner = await createLicenseBanner(packageRoot);
  const folders = await getFolders(componentsDir);
  const entry = {};

  for (const folder of folders) {
    try {
      await fs.access(path.join(componentsDir, folder, 'index.ts'));
      entry[`${folder}.min`] = path.join(componentsDir, folder, 'index.ts');
    } catch {
      // Skip component directories without dist entrypoint.
    }
  }

  await tsdown({
    clean: false,
    dts: false,
    entry,
    external: [],
    failOnWarn: false,
    format: 'esm',
    inputOptions: withInputCompatibilityAndPlugins({
      postCSSPlugins,
      packageRoot,
    }),
    inlineOnly: false,
    logLevel: 'warn',
    noExternal: [/.*/],
    minify: true,
    outDir: path.resolve(packageRoot, 'dist'),
    outputOptions(options) {
      return {
        ...options,
        banner: `${DIST_BANNER}\n${licenseBanner}`,
        chunkFileNames: '[name]-[hash].js',
        entryFileNames: '[name].js',
      };
    },
    platform: 'browser',
    report: false,
    sourcemap: false,
    target: 'es2022',
    tsconfig: path.resolve(packageRoot, 'tsconfig.json'),
  });
}

function withInputCompatibilityAndPlugins({ postCSSPlugins }) {
  return function patchInputOptions(inputOptions) {
    const options = { ...inputOptions };

    // Temporary compatibility shim for tsdown+rolldown option validation.
    if ('define' in options) {
      delete options.define;
    }
    if ('inject' in options) {
      delete options.inject;
    }

    options.plugins = [
      ...(options.plugins || []),
      replaceNodeEnvProduction(),
      litSCSS({
        includePaths: [
          path.resolve(__dirname, '../node_modules'),
          path.resolve(__dirname, '../../../node_modules'),
        ],
        async preprocessor(contents, id) {
          return (await postcss(postCSSPlugins).process(contents, { from: id }))
            .css;
        },
      }),
    ];

    return options;
  };
}

async function createLicenseBanner() {
  const whitelist = /^(carbon-components|@carbon.*)$/i;
  const thirdPartyDependencies = new Set([
    ...Object.keys(packageJson.default.dependencies || {}),
    // Transitive packages commonly bundled into dist artifacts.
    'lit-html',
    'lit-element',
    '@lit/reactive-element',
    '@floating-ui/core',
    '@floating-ui/utils',
  ]);

  const links = Array.from(thirdPartyDependencies)
    .filter((name) => !whitelist.test(name))
    .sort((a, b) => a.localeCompare(b))
    .map((name) => ` * https://www.npmjs.com/package/${name}`)
    .join('\n');

  return `/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * Also refer to the following links for third-party dependencies:
${links}
 */
`;
}

function replaceNodeEnvProduction() {
  return {
    name: 'replace-node-env-production',
    transform(code, id) {
      if (!/\.(m?[jt]s|tsx?)$/i.test(id)) {
        return null;
      }

      const replaced = code.replaceAll('process.env.NODE_ENV', '"production"');
      if (replaced === code) {
        return null;
      }

      return {
        code: replaced,
        map: null,
      };
    },
  };
}

buildDist().catch((error) => {
  console.log(error);
  process.exit(1);
});
