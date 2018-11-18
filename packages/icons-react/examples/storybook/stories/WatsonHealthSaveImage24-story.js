import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthSaveImage24 from '../../../es/watson-health/save--image/24.js';

storiesOf('WatsonHealthSaveImage24', module)
  .add('default', () => <WatsonHealthSaveImage24 />)
  .add('with accessibility label', () => (
    <WatsonHealthSaveImage24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthSaveImage24 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealthSaveImage24>
  ));
