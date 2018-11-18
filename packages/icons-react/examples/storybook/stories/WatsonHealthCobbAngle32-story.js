import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthCobbAngle32 from '../../../es/watson-health/cobb-angle/32.js';

storiesOf('WatsonHealthCobbAngle32', module)
  .add('default', () => <WatsonHealthCobbAngle32 />)
  .add('with accessibility label', () => (
    <WatsonHealthCobbAngle32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthCobbAngle32 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealthCobbAngle32>
  ));
