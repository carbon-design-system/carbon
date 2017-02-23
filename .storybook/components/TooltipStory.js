import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Tooltip from '../../components/Tooltip';
import Link from '../../components/Link';
import UnderReviewDecorator from '../UnderReviewDecorator';

storiesOf('Tooltip', module)
  .addDecorator(UnderReviewDecorator)
	.addWithInfo(
    'default',
    `
      Tooltips are used to supply additional information to an element when hovering over it. By default,
      the tooltip will render above the element. The example below shows the default scenario.
    `,
    () => (
      <div style={{ marginTop: '2rem' }}>
        <Tooltip text="This is some tooltip text" className="some-class"><Link href="#">Tooltip - hover</Link></Tooltip>
      </div>
    ),
  )
  .addWithInfo(
    'position',
    `
      Tooltips are used to supply additional information to an element when hovering over it. By default,
      the tooltip will render above the element. The example below shows specifying the position (supports 'bottom' and 'top')
    `,
    () => (
      <div style={{ marginTop: '2rem' }}>
        <Tooltip position="bottom" text="This is some tooltip text"><div>Tooltip - hover</div></Tooltip>
      </div>
    ),
  )
  .addWithInfo(
    'no icon',
    `
      Tooltips are used to supply additional information to an element when hovering over it. By default,
      the tooltip will render with an information Icon. The example below shows the option to exclude the Icon.
    `,
    () => (
      <div style={{ marginTop: '2rem' }}>
        <Tooltip text="This is some tooltip text" showIcon={false}><div>Tooltip - hover</div></Tooltip>
      </div>
    ),
  );
