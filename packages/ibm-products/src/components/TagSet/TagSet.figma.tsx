/**
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { TagSet } from './TagSet';
import figma from '@figma/code-connect';

figma.connect(
  TagSet,
  'https://www.figma.com/design/0F9dKH2abAd7gSfvnacfWf/-v11--IBM-Products-%E2%80%93-Carbon-Design-System?node-id=9322%3A404195',
  {
    props: {
      // No matching props could be found for these Figma properties:
      tagArray: figma.boolean('Tag overflow', {
        true: [
          { size: 'md', title: 'Tag', type: 'blue' },
          { size: 'md', title: 'Tag', type: 'blue' },
          { size: 'md', title: 'Tag', type: 'blue' },
          { size: 'md', title: 'Tag', type: 'blue' },
          { size: 'md', title: 'Tag', type: 'blue' },
          { size: 'md', title: 'Tag', type: 'blue' },
          { size: 'md', title: 'Tag', type: 'blue' },
          { size: 'md', title: 'Tag', type: 'blue' },
          { size: 'md', title: 'Tag', type: 'blue' },
          { size: 'md', title: 'Tag', type: 'blue' },
          { size: 'md', title: 'Tag', type: 'blue' },
          { size: 'md', title: 'Tag', type: 'blue' },
          { size: 'md', title: 'Tag', type: 'blue' },
          { size: 'md', title: 'Tag', type: 'blue' },
          { size: 'md', title: 'Tag', type: 'blue' },
          { size: 'md', title: 'Tag', type: 'blue' },
          { size: 'md', title: 'Tag', type: 'blue' },
          { size: 'md', title: 'Tag', type: 'blue' },
          { size: 'md', title: 'Tag', type: 'blue' },
        ],
        false: [
          { size: 'md', title: 'Tag', type: 'blue' },
          { size: 'md', title: 'Tag', type: 'blue' },
          { size: 'md', title: 'Tag', type: 'blue' },
          { size: 'md', title: 'Tag', type: 'blue' },
          { size: 'md', title: 'Tag', type: 'blue' },
          { size: 'md', title: 'Tag', type: 'blue' },
          { size: 'md', title: 'Tag', type: 'blue' },
          { size: 'md', title: 'Tag', type: 'blue' },
          { size: 'md', title: 'Tag', type: 'blue' },
        ],
      }),
    },
    example: ({ tagArray }) => <TagSet tags={tagArray} />,
  }
);
