import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthCircleMeasurement24 from '../../../es/watson-health/circle-measurement/24.js';

storiesOf('WatsonHealthCircleMeasurement24', module)
  .add('default', () => <WatsonHealthCircleMeasurement24 />)
  .add('with accessibility label', () => (
    <WatsonHealthCircleMeasurement24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthCircleMeasurement24 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealthCircleMeasurement24>
  ));
