/**
 * Copyright IBM Corp. 2024, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { StoryDocsPage } from '../../global/js/utils/StoryDocsPage';

import * as stories from './Checklist.stories';

const DocsPage = () => (
  <StoryDocsPage
    altGuidelinesHref={[
      {
        href: 'https://pages.github.ibm.com/carbon/ibm-products/components/onboarding/checklist/usage/',
        label: 'Usage guidelines',
      },
    ]}
    blocks={[
      {
        story: stories.checklist,
      },
      {
        story: stories.taskStates,
      },
    ]}
  />
);

export default DocsPage;
