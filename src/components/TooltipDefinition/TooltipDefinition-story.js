import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, select, text } from '@storybook/addon-knobs';
import TooltipDefinition from '../TooltipDefinition';

const directions = {
  bottom: 'Bottom (bottom)',
  top: 'Top (top)',
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
    withInfo({
      text: `
        Definition Tooltip
      `,
    })(() => (
      <div style={{ marginTop: '2rem' }}>
        <TooltipDefinition {...props()}>Definition Tooltip</TooltipDefinition>
      </div>
    ))
  );
