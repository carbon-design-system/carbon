/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import './skeleton-placeholder';
import storyDocs from './skeleton-placeholder.mdx';

export const Default = {
  parameters: {
    percy: {
      skip: true,
    },
  },
  render: () => html`<cds-skeleton-placeholder></cds-skeleton-placeholder>`,
};

const meta = {
  title: 'Components/Skeleton/Skeleton Placeholder',
  parameters: {
    docs: {
      page: storyDocs,
    },
  },
};

export default meta;
