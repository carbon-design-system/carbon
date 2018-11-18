import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthAutoScroll20 from '../../../es/watson-health/auto-scroll/20.js';

storiesOf('WatsonHealthAutoScroll20', module)
  .add('default', () => <WatsonHealthAutoScroll20 />)
  .add('with accessibility label', () => (
    <WatsonHealthAutoScroll20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthAutoScroll20 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealthAutoScroll20>
  ));
