/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { StoryDocsPage } from '../../global/js/utils/StoryDocsPage';
import * as stories from './StatusIcon.stories';

const DocsPage = () => (
  <StoryDocsPage
    altGuidelinesHref={[
      {
        href: 'https://carbondesignsystem.com/patterns/status-indicator-pattern/',
        label: 'Carbon status indicator patterns',
      },
    ]}
    blocks={[
      {
        story: stories.Default,
      },
      {
        title: 'Accessibility',
        description: `The \`StatusIcon\` component follows the Carbon guidelines for status icons with
some added specifications around illustration usage. For additional usage
guidelines and documentation please refer to the links above.

_Status icons_ are an important method of communicating severity level
information to users. The shapes and colors, communicate severity that enable
users to quickly assess and identify status and respond accordingly.`,
      },
      {
        title: 'Sizing',
        description: `
| Size    | Pixels  |
| ------- | ------- |
| small   | 16 x 16 |
| medium  | 20 x 20 |
| large   | 24 x 24 |
| x-large | 32 x 32 |
          `,
      },
    ]}
  />
);

export default DocsPage;
