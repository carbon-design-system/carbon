/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Glob patterns for components migrated from ibm-products into @carbon/react.
 * These stories are excluded from the v11 Storybook and only appear in the
 * v12 Storybook. Add a new entry here for each newly migrated component's
 * stories and MDX files.
 */
export const productMigratedStoryGlobs = [
  '../src/components/ActionSet/ActionSet.stories.js',
  '../src/components/TruncatedText/TruncatedText.stories.js',
  '../src/components/Resizer/Resizer.stories.js',
];

/**
 * Components currently being migrated from IBM Products into @carbon/react.
 *
 * These are excluded from the published build (both JS bundle and .d.ts files)
 * until the next major release. Each entry is a glob pattern relative to the
 * package root, matching the same format used in tsconfig "exclude" arrays.
 *
 * To ship a component:
 *   1. Remove its entry from this list.
 *   2. Add its export to src/index.ts.
 */
export const excludeProductsComponents = [
  'src/components/Resizer/**/*',
  'src/components/ActionSet/**/*',
  'src/components/TruncatedText/**/*',
];
