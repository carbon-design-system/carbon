/**
 * Copyright IBM Corp. 2020, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

export const storybookPrefixCanary = 'Cloud & Cognitive/Canary';
export const storybookPrefixReleased = 'Cloud & Cognitive/Released';
export const storybookPrefixInternal = 'Cloud & Cognitive/Internal';

export const getStorybookPrefix = (pkg, componentName) => {
  return pkg.isComponentEnabled(componentName, true)
    ? storybookPrefixReleased
    : pkg.isComponentPublic(componentName, true)
      ? storybookPrefixCanary
      : storybookPrefixInternal;
};

/**
 * A helper function to return the slug (structure path name reduced to lower
 * case text and hyphens) which identifies story instances.
 * @param {string} pkg The package settings instance.
 * @param {string} componentName The name of the component.
 * @param {string} scenario The scenario name, also as a slug.
 * @param {string} folders The names of any sub-folders being used. This param
 * can be omitted (or falsy) if the component appears directly within the
 * category. Where applicable, the folders should be specified as a slug (all
 * lower case, with hyphens rather than / to separate multiple folder levels).
 * @returns The story id.
 */
export const getStorybookSlug = (pkg, componentName, scenario, folders) => {
  const hFolders = folders ? folders + '-' : '';
  const lcName = componentName.toLocaleLowerCase();
  const state = pkg.isComponentEnabled(componentName, true)
    ? 'released'
    : pkg.isComponentPublic(componentName, true)
      ? 'canary'
      : 'internal';

  return `cloud-cognitive-${state}-${hFolders}${lcName}--${scenario}`;
};
