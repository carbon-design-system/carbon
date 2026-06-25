/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { StoryDocsPage } from '../../global/js/utils/StoryDocsPage';

import * as stories from './APIKeyModal.stories';

const DocsPage = () => {
  return (
    <StoryDocsPage
      altGuidelinesHref={[
        {
          href: 'https://pages.github.ibm.com/carbon/ibm-products/components/api-key-modal/usage/',
          label: 'Usage guidelines',
        },
        {
          href: 'https://www.carbondesignsystem.com/components/modal/usage',
          label: 'Carbon modal usage guidelines',
        },
        {
          href: 'https://react.carbondesignsystem.com/?path=/docs/components-modal',
          label: 'Carbon modal documentation',
        },
      ]}
      blocks={[
        {
          story: stories.Edit,
          description: `API key creation / generation is assumed to be the default mode for this modal.
To enable key editing you have to set the \`edit\` prop to true and supply any
other edit related props with the relevant input.`,
        },
        {
          description: `By default generate and edit only supply a name input for your key. If you need additional input you should use custom steps`,
          story: stories.CustomEdit,
        },
      ]}
    />
  );
};

export default DocsPage;
