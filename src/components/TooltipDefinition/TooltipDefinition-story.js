import React from 'react';
import { storiesOf } from '@storybook/react';
import TooltipDefinition from '../TooltipDefinition';

storiesOf('TooltipDefinition', module)
  .addWithInfo(
    'default',
    `
    Definition Tooltip
    `,
    () => (
      <div style={{ marginTop: '2rem' }}>
        <TooltipDefinition tooltipText="Brief description of the dotted, underlined word above.">
          Definition Tooltip
        </TooltipDefinition>
      </div>
    )
  )
  .addWithInfo(
    'with custom direction',
    `
    Definition Tooltip with custom direction
    `,
    () => (
      <div style={{ marginTop: '2rem' }}>
        <TooltipDefinition
          direction="top"
          tooltipText="Brief description of the dotted, underlined word above.">
          Definition Tooltip
        </TooltipDefinition>
      </div>
    )
  );
