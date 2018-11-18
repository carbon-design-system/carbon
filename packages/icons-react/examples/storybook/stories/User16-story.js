import React from 'react';
import { storiesOf } from '@storybook/react';
import User16 from '../../../es/user/16.js';

storiesOf('User16', module)
  .add('default', () => <User16 />)
  .add('with accessibility label', () => (
    <User16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <User16 aria-label="Icon label">
      <title>Icon title</title>
    </User16>
  ));
