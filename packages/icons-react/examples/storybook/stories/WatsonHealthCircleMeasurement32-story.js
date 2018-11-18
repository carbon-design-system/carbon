import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthCircleMeasurement32 from '../../../es/watson-health/circle-measurement/32.js';

storiesOf('WatsonHealthCircleMeasurement32', module)
  .add('default', () => <WatsonHealthCircleMeasurement32 />)
  .add('with accessibility label', () => (
    <WatsonHealthCircleMeasurement32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthCircleMeasurement32 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealthCircleMeasurement32>
  ));
