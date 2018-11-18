import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthCircleMeasurement20 from '../../../es/watson-health/circle-measurement/20.js';

storiesOf('WatsonHealthCircleMeasurement20', module)
  .add('default', () => <WatsonHealthCircleMeasurement20 />)
  .add('with accessibility label', () => (
    <WatsonHealthCircleMeasurement20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthCircleMeasurement20 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealthCircleMeasurement20>
  ));
