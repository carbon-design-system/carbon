/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { StoryDocsPage } from '../../global/js/utils/StoryDocsPage';
import * as stories from './Cascade.stories';

const DocsPage = () => {
  return (
    <StoryDocsPage
      altGuidelinesHref={[
        {
          href: 'https://pages.github.ibm.com/carbon/ibm-products/patterns/cascade/usage',
          label: 'Usage guidelines',
        },
        {
          href: 'https://carbondesignsystem.com/elements/motion/overview/',
          label: 'Carbon motion overview',
        },
      ]}
      blocks={[
        {
          story: stories.WithoutGrid,
        },
        {
          description:
            'When using `Cascade` with  grid support its important that you follow the example code structure and provide the rows and columns. The component will assume this structure and add the appropriate CSS classes to the columns.',
          story: stories.WithGrid,
        },
      ]}
    />
  );
};

export default DocsPage;
