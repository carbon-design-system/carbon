import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthStressBreathEditor32 from '../../../es/watson-health/stress-breath-editor/32.js';

storiesOf('WatsonHealthStressBreathEditor32', module)
  .add('default', () => <WatsonHealthStressBreathEditor32 />)
  .add('with accessibility label', () => (
    <WatsonHealthStressBreathEditor32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthStressBreathEditor32 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealthStressBreathEditor32>
  ));
