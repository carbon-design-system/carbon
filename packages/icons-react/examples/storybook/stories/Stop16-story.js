import React from 'react';
import { storiesOf } from '@storybook/react';
import Stop16 from '../../../lib/Stop/16';

storiesOf('Stop16', module)
  .add('default', () => <Stop16 />)
  .add('with accessibility label', () => (
    <Stop16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Stop16 focusable>
      <title>Icon title</title>
    </Stop16>
  ));
