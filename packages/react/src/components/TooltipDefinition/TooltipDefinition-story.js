/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { storiesOf } from '@storybook/react';

import { withKnobs, select, text } from '@storybook/addon-knobs';
import TooltipDefinition from '../TooltipDefinition';

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
  direction: select('Tooltip direction (direction)', directions, 'bottom'),
  alignment: select(
    'Tooltip alignment to trigger button (alignment)',
    alignments,
    'start'
  ),
  tooltipText: text(
    'Tooltip content (tooltipText)',
    'Brief description of the dotted, underlined word above.'
  ),
});

storiesOf('TooltipDefinition', module)
  .addDecorator(withKnobs)
  .add(
    'default',
    () => (
      <div style={{ marginTop: '2rem' }}>
        <TooltipDefinition {...props()}>Definition Tooltip</TooltipDefinition>
      </div>
    ),
    {
      info: {
        text: `
            Definition Tooltip
          `,
      },
    }
  );
