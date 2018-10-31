import React from 'react';
import { storiesOf } from '@storybook/react';

import { withKnobs, select, text } from '@storybook/addon-knobs';
import TooltipDefinition from '../TooltipDefinition';

const directions = {
  'Bottom (bottom)': 'bottom',
  'Top (top)': 'top',
};

const props = () => ({
  direction: select('Tooltip direction (direction)', directions, 'bottom'),
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
