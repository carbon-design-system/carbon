/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable no-console */

import React from 'react';

import { withKnobs, boolean, number, select } from '@storybook/addon-knobs';
import SkeletonText from '../SkeletonText';
import mdx from './SkeletonText.mdx';

const widths = {
  '100%': '100%',
  '250px': '250px',
};

const props = () => ({
  heading: boolean('Skeleton text at a larger size (heading)'),
  paragraph: boolean('Use multiple lines of text (paragraph)'),
  lineCount: number('The number of lines in a paragraph (lineCount)', 3),
  width: select(
    'Width (in px or %) of single line of text or max-width of paragraph lines (width)',
    widths,
    '100%'
  ),
});

export default {
  title: 'Components/Skeleton/SkeletonText',
  decorators: [withKnobs],

  parameters: {
    component: SkeletonText,
    docs: {
      page: mdx,
    },
  },
};

export const Default = () => (
  <div style={{ width: '300px' }}>
    <SkeletonText {...props()} />
  </div>
);

Default.parameters = {
  info: {
    text: `
        Skeleton states are used as a progressive loading state while the user waits for content to load.
      `,
  },
};
