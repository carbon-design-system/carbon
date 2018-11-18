import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthWindowOverlay24 from '../../../es/watson-health/window--overlay/24.js';

storiesOf('WatsonHealthWindowOverlay24', module)
  .add('default', () => <WatsonHealthWindowOverlay24 />)
  .add('with accessibility label', () => (
    <WatsonHealthWindowOverlay24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthWindowOverlay24 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealthWindowOverlay24>
  ));
