import React from 'react';
import { storiesOf } from '@storybook/react';
import User32 from '../../../lib/User/32';

storiesOf('User32', module)
  .add('default', () => <User32 />)
  .add('with accessibility label', () => (
    <User32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <User32 focusable>
      <title>Icon title</title>
    </User32>
  ));
