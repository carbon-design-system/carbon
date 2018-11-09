import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthCobbAngle32 from '../../../lib/WatsonHealthCobbAngle/32';

storiesOf('WatsonHealthCobbAngle32', module)
  .add('default', () => <WatsonHealthCobbAngle32 />)
  .add('with accessibility label', () => (
    <WatsonHealthCobbAngle32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthCobbAngle32 focusable>
      <title>Icon title</title>
    </WatsonHealthCobbAngle32>
  ));
