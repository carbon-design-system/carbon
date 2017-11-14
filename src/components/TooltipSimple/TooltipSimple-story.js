import React from 'react';
import { storiesOf } from '@storybook/react';
import TooltipSimple from '../TooltipSimple';

storiesOf('TooltipSimple', module)
  .addWithInfo(
    'default',
    `
      Tooltips are used to supply additional information to an element when hovering over it. By default,
      the tooltip will render above the element. The example below shows the default scenario.
    `,
    () => (
      <div style={{ marginTop: '2rem' }}>
        <TooltipSimple text="This is some Tooltip text." className="some-class">
          <p className="bx--tooltip__trigger">Tooltip - hover</p>
        </TooltipSimple>
      </div>
    )
  )
  .addWithInfo(
    'position',
    `
      Tooltips are used to supply additional information to an element when hovering over it. By default,
      the tooltip will render above the element. The example below shows specifying the position (supports 'bottom' and 'top')
    `,
    () => (
      <div style={{ marginTop: '2rem' }}>
        <TooltipSimple position="bottom" text="This is some Tooltip text.">
          <p className="bx--tooltip__trigger">Tooltip - hover</p>
        </TooltipSimple>
      </div>
    )
  )
  .addWithInfo(
    'no icon',
    `
      Tooltips are used to supply additional information to an element when hovering over it. By default,
      the tooltip will render with an information Icon. The example below shows the option to exclude the Icon.
    `,
    () => (
      <div style={{ marginTop: '2rem' }}>
        <TooltipSimple text="This is some Tooltip text." showIcon={false}>
          <p className="bx--tooltip__trigger">Tooltip - hover</p>
        </TooltipSimple>
      </div>
    )
  );
