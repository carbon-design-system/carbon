/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import './ai-skeleton-icon';
import storyDocs from './ai-skeleton-story.mdx';

export const Default = () =>
  html`<cds-ai-skeleton-icon
      custom-styles="margin: 50px"></cds-ai-skeleton-icon>
    <cds-ai-skeleton-icon
      custom-styles="margin: 50px; width: 24px; height: 24px"></cds-ai-skeleton-icon>`;

Default.parameters = {
  percy: {
    skip: true,
  },
};

export default {
  title: 'Experimental/AISkeleton/AISkeletonIcon',
  parameters: {
    ...storyDocs.parameters,
  },
};
