import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthStressBreathEditor20 from '../../../es/watson-health/stress-breath-editor/20.js';

storiesOf('WatsonHealthStressBreathEditor20', module)
  .add('default', () => <WatsonHealthStressBreathEditor20 />)
  .add('with accessibility label', () => (
    <WatsonHealthStressBreathEditor20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthStressBreathEditor20 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealthStressBreathEditor20>
  ));
