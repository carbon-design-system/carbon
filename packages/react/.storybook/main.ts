/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { StorybookConfig } from '@storybook/react-vite';
import type { Plugin } from 'vite';

import { fileURLToPath } from 'node:url';

import remarkGfm from 'remark-gfm';
import glob from 'fast-glob';
import babel from '@rolldown/plugin-babel';
import react from '@vitejs/plugin-react';
import { mergeConfig } from 'vite';

import { productMigratedStoryGlobs } from '../product-migrated-components.mjs';

const configDir = fileURLToPath(new URL('.', import.meta.url));

// Keep top level MDX docs pages in Storybook, but exclude component level docs
// directories from story discovery because those pages are referenced through
// colocated component docs instead of the main stories index.
//
// TODO: Remove `*.js` story support once React stories have been migrated to
// TypeScript.
const storyGlobs = [
  './Welcome/Welcome.mdx',
  '../src/**/*.stories.js',
  '../src/**/*.stories.tsx',
  '../src/**/*.mdx',
  '../src/components/Tile/Tile.mdx',
  '../src/**/next/*.stories.js',
  '../src/**/next/*.stories.tsx',
  '../src/**/next/**/*.stories.js',
  '../src/**/next/**/*.stories.tsx',
  '../src/**/next/*.mdx',
  '../src/**/*-story.js',
  '../src/**/*-story.tsx',
  './Preview/Preview.mdx',
];

const stories = glob.sync(storyGlobs, {
  ignore: [
    '../src/**/docs/*.mdx',
    '../src/**/next/docs/*.mdx',
    // ibm-products components in migration are v12-only; exclude from v11 Storybook
    ...productMigratedStoryGlobs,
  ],
  cwd: configDir,
});

const config: StorybookConfig = {
  addons: [
    'storybook-addon-accessibility-checker',
    {
      name: '@storybook/addon-docs',
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
          },
        },
      },
    },
  ],
  core: {
    builder: '@storybook/builder-vite',
  },
  features: {
    previewCsfV3: true,
    buildStoriesJson: true,
    interactions: process.env.NODE_ENV !== 'production', // disable interactions in production builds, but enabled in development
  },
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  stories,
  typescript: {
    reactDocgen: 'react-docgen', // Favor docgen from prop-types instead of TS interfaces
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      css: {
        preprocessorOptions: {
          scss: {
            api: 'modern',
          },
        },
      },
      server: {
        watch: {
          // Watch for changes in the styles package
          ignored: ['!**/node_modules/@carbon/**'],
        },
        fs: {
          // Allow serving files from the monorepo root
          allow: ['../..'],
        },
      },
      optimizeDeps: {
        exclude: ['@carbon/motion'],
        rolldownOptions: {
          moduleTypes: {
            '.js': 'jsx',
          },
        },
      },
      plugins: [
        // storybook:inject-original-source plugin
        // This is a plugin that manually injects the story source code
        // into the parameters.docs.source.originalSource object.
        //
        // The need for this arises from the fact that esbuild minimizes the
        // code and mangles names. The 'show code' locations in storybook
        // are then showing minified code. The source code is injected manually
        // as a string, and is thus not minified.
        //
        // This plugin is based on the webpack-loader at
        // node_modules/@storybook/csf-plugin/dist/webpack-loader.js.
        ((): Plugin => ({
          name: 'storybook:inject-original-source',
          enforce: 'pre', // pre is required so that this runs before react/babel
          async transform(code, id) {
            // Skip running this in dev mode and skip any non-story files
            if (
              process.env.NODE_ENV !== 'production' ||
              !/\.(stories|story)\.(js|jsx|ts|tsx)$/.test(id)
            ) {
              return;
            }

            try {
              const { readFile } = await import('node:fs/promises');
              const { loadCsf, enrichCsf, formatCsf } = await import(
                'storybook/internal/csf-tools'
              );
              const makeTitle = (userTitle: string) => userTitle || 'default';
              // Re-read the original source code in-case vite may have already
              // modified what is passed into transform for 'code'
              const sourceCode = await readFile(id, 'utf-8');
              // csf is the code being transformed
              const csf = loadCsf(code, { makeTitle }).parse();
              // csfSource is the raw file on disk (used to extract source text)
              const csfSource = loadCsf(sourceCode, { makeTitle }).parse();
              await enrichCsf(csf, csfSource, {
                disableSource: false,
                disableDescription: true,
              });
              const result = formatCsf(
                csf,
                { sourceMaps: true, sourceFileName: id },
                code
              );
              if (typeof result === 'string') {
                return { code: result, map: null };
              }
              return { code: result.code, map: result.map };
            } catch {
              // Not a valid CSF file or parse error — leave unchanged
              return;
            }
          },
        }))(),
        react({
          // use a regex instead of a glob.Vite 8 (Rolldown)
          // globs `**/*.{jsx,js,ts,tsx}` seem to mishandle the transform
          // filter and ends up matching `package.json`, which then fails to
          // parse as JS. using regex matches the same set of files (and the
          // plugin's own default) without that bug
          include: /\.[jt]sx?$/,
        }),
        babel({
          presets: ['babel-preset-carbon'],
        }),
      ],
      resolve: {
        preserveSymlinks: true,
        alias: {
          '~@ibm/plex': '@ibm/plex',
          '~@ibm/plex/': '@ibm/plex/',
        },
      },
      build: {
        rollupOptions: {
          output: {
            // Don't add hashes to font file names during build
            assetFileNames: (assetInfo) => {
              if (
                assetInfo.name &&
                (assetInfo.name.endsWith('.woff2') ||
                  assetInfo.name.endsWith('.woff'))
              ) {
                return 'assets/[name][extname]';
              }
              return 'assets/[name]-[hash][extname]';
            },
          },
        },
      },
    });
  },
  docs: {
    defaultName: 'Overview',
  },
};

export default config;
