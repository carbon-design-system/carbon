import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthAutoWindowLevel32 from '../../../es/watson-health/auto-window-level/32.js';

storiesOf('WatsonHealthAutoWindowLevel32', module)
  .add('default', () => <WatsonHealthAutoWindowLevel32 />)
  .add('with accessibility label', () => (
    <WatsonHealthAutoWindowLevel32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthAutoWindowLevel32 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealthAutoWindowLevel32>
  ));
