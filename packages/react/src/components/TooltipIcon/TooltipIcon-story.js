/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { Filter16 } from '@carbon/icons-react';
import { withKnobs, select, text } from '@storybook/addon-knobs';
import TooltipIcon from '../TooltipIcon';
import mdx from './TooltipIcon.mdx';

const directions = {
  'Top (top)': 'top',
  'Right (right)': 'right',
  'Bottom (bottom)': 'bottom',
  'Left (left)': 'left',
};

const alignments = {
  'Start (start)': 'start',
  'Center (center)': 'center',
  'End (end)': 'end',
};

const props = () => ({
  direction: select('Tooltip direction (direction)', directions, 'bottom'),
  align: select('Tooltip alignment (align)', alignments, 'center'),
  tooltipText: text('Tooltip content (tooltipText)', 'Filter'),
});

export default {
  title: 'Components/TooltipIcon',
  decorators: [withKnobs],

  parameters: {
    component: TooltipIcon,
    docs: {
      page: mdx,
    },
  },
};

export const Default = () => (
  <TooltipIcon {...props()}>
    <Filter16 />
  </TooltipIcon>
);

Default.storyName = 'default';

Default.parameters = {
  info: {
    text: `
      Icon tooltip is for short single line of text describing an icon.
      Icon tooltip does not use any JavaScript. No label should be added to this variation.
      If there are actions a user can take in the tooltip (e.g. a link or a button), use interactive tooltip.
    `,
  },
};
