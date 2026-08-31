/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Glob patterns for components migrated from ibm-products into
 * @carbon/web-components. These stories are excluded from the v11 Storybook
 * and only appear in the v12 Storybook. Add a new entry here for each newly
 * migrated component's stories and MDX files.
 */
export const productMigratedStoryGlobs = [
  '../src/components/action-set/action-set.stories.ts',
  '../src/components/action-set/*.mdx',
  '../src/components/options-tile/options-tile.stories.ts',
  '../src/components/options-tile/*.mdx',
  '../src/components/truncated-text/truncated-text.stories.ts',
  '../src/components/truncated-text/*.mdx',
  '../src/components/resizer/resizer.stories.ts',
  '../src/components/resizer/*.mdx',
  '../src/components/side-panel/side-panel.stories.ts',
  '../src/components/side-panel/*.mdx',
];

/**
 * Components currently being migrated from IBM Products into
 * @carbon/web-components.
 *
 * These are excluded from the published build (both JS bundle and .d.ts files)
 * until the next major release. Each entry is a glob pattern matching the
 * format used in globby / tsconfig "exclude" arrays.
 *
 * To ship a component:
 *   1. Remove its entry from this list.
 *   2. Uncomment its export in src/index.ts.
 */
export const excludeProductsComponents = [
  'src/components/resizer/**/*',
  'src/components/action-set/**/*',
  'src/components/truncated-text/**/*',
  'src/components/side-panel/**/*',
  'src/components/options-tile/**/*',
];
