/**
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import './ai-skeleton-placeholder';
import mdx from './ai-skeleton.mdx';

export const AISkeletonPlaceholder = {
  // This story doesn't accept any args.
  args: {},
  argTypes: {},
  parameters: {
    docs: {
      page: mdx,
    },
    percy: {
      skip: true,
    },
  },
  render: () => {
    return html`<cds-ai-skeleton-placeholder
      class="test"></cds-ai-skeleton-placeholder>`;
  },
};

const meta = {
  title: 'Components/Skeleton/AI Skeleton',
};

export default meta;
