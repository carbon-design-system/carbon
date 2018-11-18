import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthWindowOverlay20 from '../../../es/watson-health/window--overlay/20.js';

storiesOf('WatsonHealthWindowOverlay20', module)
  .add('default', () => <WatsonHealthWindowOverlay20 />)
  .add('with accessibility label', () => (
    <WatsonHealthWindowOverlay20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthWindowOverlay20 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealthWindowOverlay20>
  ));
