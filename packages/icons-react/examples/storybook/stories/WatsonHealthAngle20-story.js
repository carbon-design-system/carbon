import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthAngle20 from '../../../es/watson-health/angle/20.js';

storiesOf('WatsonHealthAngle20', module)
  .add('default', () => <WatsonHealthAngle20 />)
  .add('with accessibility label', () => (
    <WatsonHealthAngle20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthAngle20 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealthAngle20>
  ));
