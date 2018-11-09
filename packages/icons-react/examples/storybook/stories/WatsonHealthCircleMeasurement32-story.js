import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthCircleMeasurement32 from '../../../lib/WatsonHealthCircleMeasurement/32';

storiesOf('WatsonHealthCircleMeasurement32', module)
  .add('default', () => <WatsonHealthCircleMeasurement32 />)
  .add('with accessibility label', () => (
    <WatsonHealthCircleMeasurement32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthCircleMeasurement32 focusable>
      <title>Icon title</title>
    </WatsonHealthCircleMeasurement32>
  ));
