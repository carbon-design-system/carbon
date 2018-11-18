import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthSaveImage32 from '../../../es/watson-health/save--image/32.js';

storiesOf('WatsonHealthSaveImage32', module)
  .add('default', () => <WatsonHealthSaveImage32 />)
  .add('with accessibility label', () => (
    <WatsonHealthSaveImage32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthSaveImage32 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealthSaveImage32>
  ));
