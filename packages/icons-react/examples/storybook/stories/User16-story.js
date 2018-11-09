import React from 'react';
import { storiesOf } from '@storybook/react';
import User16 from '../../../lib/User/16';

storiesOf('User16', module)
  .add('default', () => <User16 />)
  .add('with accessibility label', () => (
    <User16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <User16 focusable>
      <title>Icon title</title>
    </User16>
  ));
