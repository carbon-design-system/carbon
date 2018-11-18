import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthPointerText24 from '../../../es/watson-health/pointer-text/24.js';

storiesOf('WatsonHealthPointerText24', module)
  .add('default', () => <WatsonHealthPointerText24 />)
  .add('with accessibility label', () => (
    <WatsonHealthPointerText24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthPointerText24 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealthPointerText24>
  ));
