import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthCobbAngle24 from '../../../es/watson-health/cobb-angle/24.js';

storiesOf('WatsonHealthCobbAngle24', module)
  .add('default', () => <WatsonHealthCobbAngle24 />)
  .add('with accessibility label', () => (
    <WatsonHealthCobbAngle24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthCobbAngle24 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealthCobbAngle24>
  ));
