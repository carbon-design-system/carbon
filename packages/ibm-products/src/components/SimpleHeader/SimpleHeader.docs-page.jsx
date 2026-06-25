/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { StoryDocsPage } from '../../global/js/utils/StoryDocsPage';
import * as stories from './SimpleHeader.internal.stories';

const DocsPage = () => {
  return (
    <StoryDocsPage
      blocks={[
        { story: stories.simpleHeader },
        { story: stories.simpleHeaderWithBreadcrumbsOnly },
        { story: stories.simpleHeaderWithTitleOnly },
        { story: stories.simpleHeaderWithOverflowBreadcrumbs },
      ]}
    />
  );
};

export default DocsPage;
