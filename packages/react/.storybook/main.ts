/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { StorybookConfig } from '@storybook/react-vite';

import fs from 'node:fs';
import path from 'node:path';
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
    // Sass importer that resolves @carbon/ibm-products-styles/ imports to the
    // absolute path in the monorepo root node_modules. Vite's internal Sass
    // resolver walks up from the importing file's directory, which fails for
    // files deep in src/examples/*/example/ because the package is installed at
    // the repo root, not in packages/react/node_modules/.
    const ibmProductsStylesRoot = path.resolve(
      configDir,
      '../../../node_modules/@carbon/ibm-products-styles'
    );
    const ibmProductsStylesImporter = {
      canonicalize(url: string) {
        if (!url.startsWith('@carbon/ibm-products-styles/')) return null;
        const rel = url.slice('@carbon/ibm-products-styles/'.length);
        // Try _<name>.scss, <name>.scss, <name>/_index.scss in order
        const base = path.join(ibmProductsStylesRoot, rel);
        const dir = path.dirname(base);
        const name = path.basename(base);
        const candidates = [
          path.join(dir, `_${name}.scss`),
          `${base}.scss`,
          path.join(base, '_index.scss'),
          path.join(base, 'index.scss'),
        ];
        for (const candidate of candidates) {
          try {
            fs.accessSync(candidate);
            return new URL(`file://${candidate}`);
          } catch {
            // try next
          }
        }
        return null;
      },
      load(canonicalUrl: URL) {
        const filePath = canonicalUrl.pathname;
        const contents = fs.readFileSync(filePath, 'utf-8');
        return { contents, syntax: 'scss' as const };
      },
    };

    return mergeConfig(config, {
      css: {
        preprocessorOptions: {
          scss: {
            api: 'modern',
            importers: [ibmProductsStylesImporter],
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
