import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthWindowOverlay32 from '../../../lib/WatsonHealthWindowOverlay/32';

storiesOf('WatsonHealthWindowOverlay32', module)
  .add('default', () => <WatsonHealthWindowOverlay32 />)
  .add('with accessibility label', () => (
    <WatsonHealthWindowOverlay32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthWindowOverlay32 focusable>
      <title>Icon title</title>
    </WatsonHealthWindowOverlay32>
  ));
