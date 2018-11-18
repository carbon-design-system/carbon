import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthCobbAngle20 from '../../../es/watson-health/cobb-angle/20.js';

storiesOf('WatsonHealthCobbAngle20', module)
  .add('default', () => <WatsonHealthCobbAngle20 />)
  .add('with accessibility label', () => (
    <WatsonHealthCobbAngle20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthCobbAngle20 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealthCobbAngle20>
  ));
