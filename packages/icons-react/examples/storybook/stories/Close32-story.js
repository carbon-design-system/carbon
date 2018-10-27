import React from 'react';
import { storiesOf } from '@storybook/react';
import Close32 from '../../../lib/close/32';

storiesOf('Close32', module)
  .add('default', () => <Close32 />)
  .add('with accessibility label', () => (
    <Close32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Close32 focusable>
      <title>Icon title</title>
    </Close32>
  ));
