/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { StoryDocsPage } from '../../global/js/utils/StoryDocsPage';

import * as stories from './Carousel.internal.stories';

const DocsPage = () => (
  <StoryDocsPage
    blocks={[
      {
        story: stories.carousel,
      },
    ]}
  />
);

export default DocsPage;
