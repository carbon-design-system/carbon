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

export const Default = {
  // This story doesn't accept any args.
  args: {},
  argTypes: {},
  parameters: {
    percy: {
      skip: true,
    },
  },
  render: () => {
    return html`<cds-ai-skeleton-icon
        custom-styles="margin: 50px"></cds-ai-skeleton-icon>
      <cds-ai-skeleton-icon
        custom-styles="margin: 50px; width: 24px; height: 24px"></cds-ai-skeleton-icon>`;
  },
};

const meta = {
  title: 'Experimental/AISkeleton/AISkeletonIcon',
};

export default meta;
