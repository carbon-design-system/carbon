import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthAutoWindowLevel24 from '../../../es/watson-health/auto-window-level/24.js';

storiesOf('WatsonHealthAutoWindowLevel24', module)
  .add('default', () => <WatsonHealthAutoWindowLevel24 />)
  .add('with accessibility label', () => (
    <WatsonHealthAutoWindowLevel24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthAutoWindowLevel24 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealthAutoWindowLevel24>
  ));
