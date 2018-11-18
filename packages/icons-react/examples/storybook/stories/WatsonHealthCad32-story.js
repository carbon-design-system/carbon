import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthCad32 from '../../../es/watson-health/CAD/32.js';

storiesOf('WatsonHealthCad32', module)
  .add('default', () => <WatsonHealthCad32 />)
  .add('with accessibility label', () => (
    <WatsonHealthCad32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthCad32 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealthCad32>
  ));
