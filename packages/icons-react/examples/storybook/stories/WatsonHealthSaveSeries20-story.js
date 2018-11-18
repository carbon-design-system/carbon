import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthSaveSeries20 from '../../../es/watson-health/save--series/20.js';

storiesOf('WatsonHealthSaveSeries20', module)
  .add('default', () => <WatsonHealthSaveSeries20 />)
  .add('with accessibility label', () => (
    <WatsonHealthSaveSeries20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthSaveSeries20 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealthSaveSeries20>
  ));
