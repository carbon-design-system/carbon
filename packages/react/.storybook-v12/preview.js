/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { enable } from '@carbon/feature-flags';
import React from 'react';

import basePreview, { argTypesEnhancers } from '../.storybook/preview';
import { FeatureFlags } from '../src/components/FeatureFlags';

enable('enable-v12-release');

const v12ReleaseToolbar = {
  name: '🏳️‍🌈 enable-v12-release',
  description: 'Visual indicator for the v12 Storybook',
  defaultValue: true,
  toolbar: {
    icon: 'flag',
    title: '🏳️‍🌈 enable-v12-release',
    items: [
      {
        value: true,
        title: '🏳️‍🌈 enable-v12-release',
      },
    ],
  },
};

const withV12Release = (Story, context) => (
  <FeatureFlags enableV12Release>
    <Story {...context} />
  </FeatureFlags>
);

const preview = {
  ...basePreview,
  parameters: {
    ...basePreview.parameters,
    options: {
      ...(basePreview.parameters?.options ?? {}),
      storySort: {
        method: 'alphabetical',
        order: [
          'Getting Started',
          'Components',
          'Deprecated',
          'Elements',
          'Helpers',
          'Hooks',
          'Layout',
          'Preview',
        ],
      },
    },
  },
  globalTypes: {
    ...basePreview.globalTypes,
    v12Release: v12ReleaseToolbar,
  },
  decorators: [withV12Release, ...(basePreview.decorators ?? [])],
};

export { argTypesEnhancers };
export default preview;
