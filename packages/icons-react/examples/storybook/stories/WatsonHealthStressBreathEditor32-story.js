import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthStressBreathEditor32 from '../../../lib/WatsonHealthStressBreathEditor/32';

storiesOf('WatsonHealthStressBreathEditor32', module)
  .add('default', () => <WatsonHealthStressBreathEditor32 />)
  .add('with accessibility label', () => (
    <WatsonHealthStressBreathEditor32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthStressBreathEditor32 focusable>
      <title>Icon title</title>
    </WatsonHealthStressBreathEditor32>
  ));
