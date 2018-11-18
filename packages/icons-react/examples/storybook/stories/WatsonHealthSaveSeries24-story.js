import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthSaveSeries24 from '../../../es/watson-health/save--series/24.js';

storiesOf('WatsonHealthSaveSeries24', module)
  .add('default', () => <WatsonHealthSaveSeries24 />)
  .add('with accessibility label', () => (
    <WatsonHealthSaveSeries24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthSaveSeries24 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealthSaveSeries24>
  ));
