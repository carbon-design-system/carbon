/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { enable } from '@carbon/feature-flags';
import { html } from 'lit';

import * as basePreview from '../.storybook/preview';
import '../src/components/feature-flags/index';

enable('enable-v12-release');

const v12ReleaseToolbar = {
  name: '🚀 enable-v12-release',
  description: 'Visual indicator for the v12 Storybook',
  defaultValue: true,
  toolbar: {
    icon: 'flag',
    title: '🚀 enable-v12-release',
    items: [
      {
        value: true,
        title:
          'This Storybook reflects work in progress for v12. Every story here has the enable-v12-release flag set to true. Stories with 🚀 are v12-specific stories not present in the v11 Storybook.',
      },
    ],
    dynamicTitle: false,
  },
};

const { options: baseOptions = {}, ...baseParameters } =
  basePreview.parameters ?? {};
const baseOptionsWithoutStorySort = { ...baseOptions };
delete baseOptionsWithoutStorySort.storySort;

export const parameters = {
  ...baseParameters,
  options: {
    ...baseOptionsWithoutStorySort,
    // Same story-level order as v11 React: Default/Overview first, then A–Z.
    storySort: (storyA, storyB) => {
      const categoryOrder = [
        'Introduction',
        'Components',
        'Deprecated',
        'Elements',
        'Helpers',
        'Hooks',
        'Layout',
        'Preview',
      ];
      const idA = storyA.id;
      const idB = storyB.id;
      const titleA = storyA.title;
      const titleB = storyB.title;
      const categoryA = titleA.split('/')[0];
      const categoryB = titleB.split('/')[0];

      if (categoryA !== categoryB) {
        const indexA = categoryOrder.indexOf(categoryA);
        const indexB = categoryOrder.indexOf(categoryB);
        if (indexA !== -1 || indexB !== -1) {
          return (
            (indexA === -1 ? categoryOrder.length : indexA) -
            (indexB === -1 ? categoryOrder.length : indexB)
          );
        }
        return titleA.localeCompare(titleB);
      }

      if (titleA !== titleB) {
        if (idA.includes('welcome')) {
          return -1;
        }
        if (idB.includes('welcome')) {
          return 1;
        }
        if (idA.includes('overview') && !idB.includes('overview')) {
          return -1;
        }
        if (idB.includes('overview') && !idA.includes('overview')) {
          return 1;
        }
        return titleA.localeCompare(titleB);
      }

      const UNKNOWN_KEYWORD = 5;
      const keywords = [
        ['welcome', 0],
        ['overview', 1],
        ['default', 2],
        ['usage', 3],
        ['flag-details', 4],
        ['playground', 6],
        ['development', 7],
        ['deprecated', 8],
        ['unstable', 9],
      ];
      const weightOf = (id) => {
        for (const [keyword, weight] of keywords) {
          if (id.includes(keyword)) {
            return weight;
          }
        }
        return UNKNOWN_KEYWORD;
      };
      const weightA = weightOf(idA);
      const weightB = weightOf(idB);
      if (weightA !== weightB) {
        return weightA - weightB;
      }
      return idA.localeCompare(idB);
    },
  },
};
export const globalTypes = {
  ...basePreview.globalTypes,
  v12Release: v12ReleaseToolbar,
};
export const decorators = [
  (story) => html`<feature-flags enable-v12-release>${story()}</feature-flags>`,
  ...(basePreview.decorators ?? []),
];
export const tags = ['autodocs'];
export const Preview = {
  parameters,
  globalTypes,
  decorators,
};
