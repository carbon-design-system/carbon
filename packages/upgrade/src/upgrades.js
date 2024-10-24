/**
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import glob from 'fast-glob';
import path from 'path';
import { run } from './jscodeshift';

const TRANSFORM_DIR = path.join(__dirname, 'transforms');

/**
 * @typedef Upgrade
 * @property {string} name
 * @property {string} description
 * @property {Array<Update>} updates
 */

/**
 * @typedef Update
 * @property {object} package
 * @property {string} package.name
 * @property {string} package.version
 * @property {Array<Change>} changes
 */

/**
 * Represents all possible changes made in a project's package.json file for a
 * package
 */
const Change = {
  /**
   * @param {object} options
   * @param {string} options.name
   * @param {string} options.version
   * @returns {object}
   */
  install({ name, version }) {
    return {
      type: 'install',
      package: {
        name,
        version,
      },
    };
  },

  uninstall: {
    type: 'uninstall',
  },

  /**
   * @param {object} options
   * @param {string} options.version
   * @returns {object}
   */
  update({ version }) {
    return {
      type: 'update',
      package: {
        version,
      },
    };
  },
};

/**
 * @type {Array<Upgrade>}
 */
export const upgrades = [
  {
    name: 'v11: full update',
    description:
      'changes carbon-components, carbon-components-react, carbon-icons, and @carbon/icons-react to @carbon/react',
    updates: [
      {
        package: {
          name: 'carbon-components',
          range: '10.x',
        },
        changes: [Change.uninstall],
      },
      {
        package: {
          name: 'carbon-icons',
          range: '7.x',
        },
        changes: [Change.uninstall],
      },
      {
        package: {
          name: 'carbon-components-react',
          range: '7.x',
        },
        changes: [
          Change.uninstall,
          Change.install({
            name: '@carbon/react',
            version: '~1.0.0',
          }),
        ],
      },
      {
        package: {
          name: '@carbon/icons-react',
          range: '10.x',
        },
        changes: [Change.uninstall],
      },
    ],
  },
  {
    name: 'v11: default update',
    description:
      'changes carbon-components, carbon-components-react, and carbon-icons to @carbon/react',
    updates: [
      {
        package: {
          name: 'carbon-components',
          range: '10.x',
        },
        changes: [Change.uninstall],
      },
      {
        package: {
          name: 'carbon-components-react',
          range: '7.x',
        },
        changes: [
          Change.uninstall,
          Change.install({
            name: '@carbon/react',
            version: '~1.0.0',
          }),
        ],
      },
      {
        package: {
          name: 'carbon-icons',
          range: '7.x',
        },
        changes: [Change.uninstall],
      },
    ],
    migrations: [
      {
        name: 'icons-react-size-prop',
        description: 'Update imports and size usage for @carbon/icons-react',
        migrate: async (options) => {
          const transform = path.join(
            TRANSFORM_DIR,
            'icons-react-size-prop.js'
          );
          const paths =
            Array.isArray(options.paths) && options.paths.length > 0
              ? options.paths
              : await glob(['**/*.js', '**/*.jsx'], {
                  cwd: options.workspaceDir,
                  ignore: [
                    '**/es/**',
                    '**/lib/**',
                    '**/umd/**',
                    '**/node_modules/**',
                    '**/storybook-static/**',
                  ],
                });

          await run({
            dry: !options.write,
            transform,
            paths,
            verbose: options.verbose,
          });
        },
      },
      {
        name: 'size-prop-update',
        description: 'Updates xl sized components to lg',
        migrate: async (options) => {
          const transform = path.join(TRANSFORM_DIR, 'size-prop-update.js');
          const paths =
            Array.isArray(options.paths) && options.paths.length > 0
              ? options.paths
              : await glob(['**/*.js', '**/*.jsx'], {
                  cwd: options.workspaceDir,
                  ignore: [
                    '**/es/**',
                    '**/lib/**',
                    '**/umd/**',
                    '**/node_modules/**',
                    '**/storybook-static/**',
                  ],
                });

          await run({
            dry: !options.write,
            transform,
            paths,
            verbose: options.verbose,
          });
        },
      },
      {
        name: 'small-to-size-prop',
        description: 'Update usage of small prop to size="sm"',
        migrate: async (options) => {
          const transform = path.join(TRANSFORM_DIR, 'small-to-size-prop.js');
          const paths =
            Array.isArray(options.paths) && options.paths.length > 0
              ? options.paths
              : await glob(['**/*.js', '**/*.jsx'], {
                  cwd: options.workspaceDir,
                  ignore: [
                    '**/es/**',
                    '**/lib/**',
                    '**/umd/**',
                    '**/node_modules/**',
                    '**/storybook-static/**',
                  ],
                });

          await run({
            dry: !options.write,
            transform,
            paths,
            verbose: options.verbose,
          });
        },
      },
      {
        name: 'update-carbon-components-react-import-to-scoped',
        description:
          'Rewrites imports from `carbon-components-react` to `@carbon/react`',
        migrate: async (options) => {
          const transform = path.join(
            TRANSFORM_DIR,
            'update-carbon-components-react-import-to-scoped.js'
          );
          const paths =
            Array.isArray(options.paths) && options.paths.length > 0
              ? options.paths
              : await glob(['**/*.js', '**/*.jsx'], {
                  cwd: options.workspaceDir,
                  ignore: [
                    '**/es/**',
                    '**/lib/**',
                    '**/umd/**',
                    '**/node_modules/**',
                    '**/storybook-static/**',
                  ],
                });

          await run({
            dry: !options.write,
            transform,
            paths,
            verbose: options.verbose,
          });
        },
      },
      {
        name: 'update-carbon-icons-react-import-to-carbon-react',
        description:
          'Rewrites imports from `@carbon/icons-react` to `@carbon/react/icons`',
        migrate: async (options) => {
          const transform = path.join(
            TRANSFORM_DIR,
            'update-carbon-icons-react-import-to-carbon-react.js'
          );
          const paths =
            Array.isArray(options.paths) && options.paths.length > 0
              ? options.paths
              : await glob(['**/*.js', '**/*.jsx'], {
                  cwd: options.workspaceDir,
                  ignore: [
                    '**/es/**',
                    '**/lib/**',
                    '**/umd/**',
                    '**/node_modules/**',
                    '**/storybook-static/**',
                  ],
                });

          await run({
            dry: !options.write,
            transform,
            paths,
            verbose: options.verbose,
          });
        },
      },
      {
        name: 'featureflag-deprecate-flags-prop',
        description: `
        Updates the <FeatureFlags> component usage:
        1. Deprecates the 'flags' object prop
        2. Replaces it with individual boolean props for each feature flag
        3. Removes usage of no longer needed flags (e.g., 'enable-v11-release')
        
        Example transformation:
        Before: <FeatureFlags flags={{ 'flag1': true, 'flag2': false, 'flag3': true }}>
        After:  <FeatureFlags flag1 flag3>
      `,

        migrate: async (options) => {
          const transform = path.join(
            TRANSFORM_DIR,
            'featureflag-deprecate-flags-prop.js'
          );
          const paths =
            Array.isArray(options.paths) && options.paths.length > 0
              ? options.paths
              : await glob(['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'], {
                  cwd: options.workspaceDir,
                  ignore: [
                    '**/es/**',
                    '**/lib/**',
                    '**/umd/**',
                    '**/node_modules/**',
                    '**/storybook-static/**',
                  ],
                });

          await run({
            dry: !options.write,
            transform,
            paths,
            verbose: options.verbose,
          });
        },
      },
      {
        name: 'refactor-to-callout',
        description:
          'Rewrites imports and usages of StaticNotification to Callout',
        migrate: async (options) => {
          const transform = path.join(TRANSFORM_DIR, 'refactor-to-callout.js');
          const paths =
            Array.isArray(options.paths) && options.paths.length > 0
              ? options.paths
              : await glob(['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'], {
                  cwd: options.workspaceDir,
                  ignore: [
                    '**/es/**',
                    '**/lib/**',
                    '**/umd/**',
                    '**/node_modules/**',
                    '**/storybook-static/**',
                  ],
                });

          await run({
            dry: !options.write,
            transform,
            paths,
            verbose: options.verbose,
          });
        },
      },
    ],
  },
  {
    name: 'v11: carbon-components',
    description: 'changes carbon-components to @carbon/styles',
    updates: [
      {
        package: {
          name: 'carbon-components',
          range: '10.x',
        },
        changes: [
          Change.uninstall,
          Change.install({
            name: '@carbon/styles',
            version: '~1.0.0',
          }),
        ],
      },
    ],
  },
];
