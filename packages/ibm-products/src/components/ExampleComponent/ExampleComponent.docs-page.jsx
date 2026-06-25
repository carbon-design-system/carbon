/**
 * Copyright IBM Corp. 2023, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import { StoryDocsPage } from '../../global/js/utils/StoryDocsPage';

import * as stories from './ExampleComponent.stories';

/**
 * OPTIONAL: required only to customize default docs page
 */
const DocsPage = () => (
  <StoryDocsPage
    blocks={[
      {
        description: 'Here it is in use.',
        story: stories.exampleComponent,
      },
    ]}
  />
);

export default DocsPage;
