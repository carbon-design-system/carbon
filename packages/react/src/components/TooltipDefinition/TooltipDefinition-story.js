/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import { withKnobs, select, text } from '@storybook/addon-knobs';
import TooltipDefinition from '../TooltipDefinition';
import mdx from './TooltipDefinition.mdx';

const directions = {
  'Bottom (bottom)': 'bottom',
  'Top (top)': 'top',
};

const alignments = {
  'Start (start)': 'start',
  'Center (center)': 'center',
  'End (end)': 'end',
};

const props = () => ({
  triggerClassName: text(
    'Trigger element CSS class name (triggerClassName)',
    ''
  ),
  direction: select('Tooltip direction (direction)', directions, 'bottom'),
  align: select(
    'Tooltip alignment to trigger button (align)',
    alignments,
    'start'
  ),
  tooltipText: text(
    'Tooltip content (tooltipText)',
    'Brief description of the dotted, underlined word above.'
  ),
});

export default {
  title: 'Components/TooltipDefinition',
  decorators: [withKnobs],

  parameters: {
    component: TooltipDefinition,
    docs: {
      page: mdx,
    },
  },
};

export const Default = () => (
  <div style={{ marginTop: '2rem' }}>
    <TooltipDefinition {...props()}>Definition Tooltip</TooltipDefinition>
  </div>
);

Default.storyName = 'default';

Default.parameters = {
  info: {
    text: `
      Definition tooltip is for regular use case of tooltip, e.g. giving the user more text information about something, like defining a word.
      This works better than the interactive tooltip in regular use cases because the info icon used in interactive tooltip can be repetitive when it’s shown several times on a page.
      Definition tooltip does not use any JavaScript. If there are actions a user can take in the tooltip (e.g. a link or a button), use interactive tooltip.
    `,
  },
};
