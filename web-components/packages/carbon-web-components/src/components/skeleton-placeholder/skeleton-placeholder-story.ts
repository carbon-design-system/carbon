/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import './skeleton-placeholder';
import storyDocs from './skeleton-placeholder-story.mdx';

export const Default = () =>
  html` <bx-skeleton-placeholder></bx-skeleton-placeholder> `;

Default.storyName = 'Default';

Default.parameters = {
  percy: {
    skip: true,
  },
};

export default {
  title: 'Components/Skeleton placeholder',
  parameters: {
    ...storyDocs.parameters,
  },
};
