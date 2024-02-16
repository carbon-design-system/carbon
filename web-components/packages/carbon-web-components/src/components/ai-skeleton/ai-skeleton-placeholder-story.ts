/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import './ai-skeleton-placeholder';
import storyDocs from './ai-skeleton-story.mdx';

export const Default = () =>
  html`<cds-ai-skeleton-placeholder
    class="test"></cds-ai-skeleton-placeholder>`;

Default.parameters = {
  percy: {
    skip: true,
  },
};

export default {
  title: 'Experimental/AISkeleton/AISkeletonPlaceholder',
  parameters: {
    ...storyDocs.parameters,
  },
};
