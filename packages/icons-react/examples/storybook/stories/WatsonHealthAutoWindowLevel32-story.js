import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthAutoWindowLevel32 from '../../../lib/watson-health--auto-window-level/32';

storiesOf('WatsonHealthAutoWindowLevel32', module)
  .add('default', () => <WatsonHealthAutoWindowLevel32 />)
  .add('with accessibility label', () => (
    <WatsonHealthAutoWindowLevel32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthAutoWindowLevel32 focusable>
      <title>Icon title</title>
    </WatsonHealthAutoWindowLevel32>
  ));
