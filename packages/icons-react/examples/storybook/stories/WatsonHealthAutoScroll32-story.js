import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthAutoScroll32 from '../../../es/watson-health/auto-scroll/32.js';

storiesOf('WatsonHealthAutoScroll32', module)
  .add('default', () => <WatsonHealthAutoScroll32 />)
  .add('with accessibility label', () => (
    <WatsonHealthAutoScroll32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthAutoScroll32 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealthAutoScroll32>
  ));
