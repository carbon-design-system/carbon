import React from 'react';
import { storiesOf } from '@storybook/react';
import User32 from '../../../es/user/32.js';

storiesOf('User32', module)
  .add('default', () => <User32 />)
  .add('with accessibility label', () => (
    <User32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <User32 aria-label="Icon label">
      <title>Icon title</title>
    </User32>
  ));
