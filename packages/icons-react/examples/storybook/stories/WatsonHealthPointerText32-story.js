import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthPointerText32 from '../../../lib/watson-health--pointer-text/32';

storiesOf('WatsonHealthPointerText32', module)
  .add('default', () => <WatsonHealthPointerText32 />)
  .add('with accessibility label', () => (
    <WatsonHealthPointerText32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthPointerText32 focusable>
      <title>Icon title</title>
    </WatsonHealthPointerText32>
  ));
