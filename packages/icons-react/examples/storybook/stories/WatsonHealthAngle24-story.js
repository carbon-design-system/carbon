import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthAngle24 from '../../../es/watson-health/angle/24.js';

storiesOf('WatsonHealthAngle24', module)
  .add('default', () => <WatsonHealthAngle24 />)
  .add('with accessibility label', () => (
    <WatsonHealthAngle24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthAngle24 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealthAngle24>
  ));
