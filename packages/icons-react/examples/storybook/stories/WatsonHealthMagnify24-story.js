import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthMagnify24 from '../../../es/watson-health/magnify/24.js';

storiesOf('WatsonHealthMagnify24', module)
  .add('default', () => <WatsonHealthMagnify24 />)
  .add('with accessibility label', () => (
    <WatsonHealthMagnify24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthMagnify24 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealthMagnify24>
  ));
