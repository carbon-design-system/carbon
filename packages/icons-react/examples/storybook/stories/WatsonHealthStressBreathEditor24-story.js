import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthStressBreathEditor24 from '../../../es/watson-health/stress-breath-editor/24.js';

storiesOf('WatsonHealthStressBreathEditor24', module)
  .add('default', () => <WatsonHealthStressBreathEditor24 />)
  .add('with accessibility label', () => (
    <WatsonHealthStressBreathEditor24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthStressBreathEditor24 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealthStressBreathEditor24>
  ));
