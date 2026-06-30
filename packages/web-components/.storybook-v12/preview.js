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

export const parameters = {
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
