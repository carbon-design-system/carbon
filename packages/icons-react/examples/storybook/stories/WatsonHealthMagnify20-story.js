import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthMagnify20 from '../../../es/watson-health/magnify/20.js';

storiesOf('WatsonHealthMagnify20', module)
  .add('default', () => <WatsonHealthMagnify20 />)
  .add('with accessibility label', () => (
    <WatsonHealthMagnify20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthMagnify20 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealthMagnify20>
  ));
