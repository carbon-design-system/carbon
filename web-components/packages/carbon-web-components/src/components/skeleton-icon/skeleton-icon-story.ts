/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import './skeleton-icon';
import storyDocs from './skeleton-icon-story.mdx';

export const Default = () =>
  html`<cds-skeleton-icon style="margin: 50px"></cds-skeleton-icon
    ><cds-skeleton-icon
      style="margin: 50px; width: 24px; height: 24px;"></cds-skeleton-icon>`;

Default.storyName = 'Default';

Default.parameters = {
  percy: {
    skip: true,
  },
};

export default {
  title: 'Components/Skeleton/Skeleton icon',
  parameters: {
    ...storyDocs.parameters,
  },
};
