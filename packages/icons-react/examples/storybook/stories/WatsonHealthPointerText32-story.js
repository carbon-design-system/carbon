import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthPointerText32 from '../../../es/watson-health/pointer-text/32.js';

storiesOf('WatsonHealthPointerText32', module)
  .add('default', () => <WatsonHealthPointerText32 />)
  .add('with accessibility label', () => (
    <WatsonHealthPointerText32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthPointerText32 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealthPointerText32>
  ));
