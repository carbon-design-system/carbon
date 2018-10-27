import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthAngle32 from '../../../lib/watson-health--angle/32';

storiesOf('WatsonHealthAngle32', module)
  .add('default', () => <WatsonHealthAngle32 />)
  .add('with accessibility label', () => (
    <WatsonHealthAngle32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthAngle32 focusable>
      <title>Icon title</title>
    </WatsonHealthAngle32>
  ));
