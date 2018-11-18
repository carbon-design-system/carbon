import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthAutoScroll24 from '../../../es/watson-health/auto-scroll/24.js';

storiesOf('WatsonHealthAutoScroll24', module)
  .add('default', () => <WatsonHealthAutoScroll24 />)
  .add('with accessibility label', () => (
    <WatsonHealthAutoScroll24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthAutoScroll24 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealthAutoScroll24>
  ));
