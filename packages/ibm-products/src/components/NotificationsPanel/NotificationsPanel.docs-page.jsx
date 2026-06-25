/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { StoryDocsPage } from '../../global/js/utils/StoryDocsPage';

import * as stories from './NotificationsPanel.stories';

const DocsPage = () => (
  <StoryDocsPage
    altGuidelinesHref={[
      {
        href: 'https://pages.github.ibm.com/carbon/ibm-products/components/notification-panel/usage/',
        label: 'Usage guidelines',
      },
    ]}
    blocks={[
      {
        story: stories.Default,
      },
    ]}
  />
);

export default DocsPage;
