import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, select, text } from '@storybook/addon-knobs';
import TooltipIcon from '../TooltipIcon';

const directions = {
  bottom: 'Bottom (bottom)',
  top: 'Top (top)',
};

const props = () => ({
  direction: select('Tooltip direction (direction)', directions, 'bottom'),
  tooltipText: text('Tooltip content (tooltipText)', 'Filter'),
});

storiesOf('TooltipIcon', module)
  .addDecorator(withKnobs)
  .add(
    'default',
    withInfo({
      text: `
        Tooltip Icon
      `,
    })(() => (
      <TooltipIcon {...props()}>
        <svg width="16" height="12" viewBox="0 0 16 12">
          <g fillRule="nonzero">
            <path d="M8.05 2a2.5 2.5 0 0 1 4.9 0H16v1h-3.05a2.5 2.5 0 0 1-4.9 0H0V2h8.05zm2.45 2a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM3.05 9a2.5 2.5 0 0 1 4.9 0H16v1H7.95a2.5 2.5 0 0 1-4.9 0H0V9h3.05zm2.45 2a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
          </g>
        </svg>
      </TooltipIcon>
    ))
  );
