import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthSaveImage20 from '../../../es/watson-health/save--image/20.js';

storiesOf('WatsonHealthSaveImage20', module)
  .add('default', () => <WatsonHealthSaveImage20 />)
  .add('with accessibility label', () => (
    <WatsonHealthSaveImage20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthSaveImage20 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealthSaveImage20>
  ));
