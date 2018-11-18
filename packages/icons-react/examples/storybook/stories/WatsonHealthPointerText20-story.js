import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthPointerText20 from '../../../es/watson-health/pointer-text/20.js';

storiesOf('WatsonHealthPointerText20', module)
  .add('default', () => <WatsonHealthPointerText20 />)
  .add('with accessibility label', () => (
    <WatsonHealthPointerText20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthPointerText20 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealthPointerText20>
  ));
