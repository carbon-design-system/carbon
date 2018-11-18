import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthWindowOverlay32 from '../../../es/watson-health/window--overlay/32.js';

storiesOf('WatsonHealthWindowOverlay32', module)
  .add('default', () => <WatsonHealthWindowOverlay32 />)
  .add('with accessibility label', () => (
    <WatsonHealthWindowOverlay32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthWindowOverlay32 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealthWindowOverlay32>
  ));
