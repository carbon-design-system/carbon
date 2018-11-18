import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthAutoWindowLevel20 from '../../../es/watson-health/auto-window-level/20.js';

storiesOf('WatsonHealthAutoWindowLevel20', module)
  .add('default', () => <WatsonHealthAutoWindowLevel20 />)
  .add('with accessibility label', () => (
    <WatsonHealthAutoWindowLevel20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthAutoWindowLevel20 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealthAutoWindowLevel20>
  ));
