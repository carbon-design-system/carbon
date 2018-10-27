import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthAutoScroll32 from '../../../lib/watson-health--auto-scroll/32';

storiesOf('WatsonHealthAutoScroll32', module)
  .add('default', () => <WatsonHealthAutoScroll32 />)
  .add('with accessibility label', () => (
    <WatsonHealthAutoScroll32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthAutoScroll32 focusable>
      <title>Icon title</title>
    </WatsonHealthAutoScroll32>
  ));
