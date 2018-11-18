import React from 'react';
import { storiesOf } from '@storybook/react';
import UserOnline32 from '../../../es/user--online/32.js';

storiesOf('UserOnline32', module)
  .add('default', () => <UserOnline32 />)
  .add('with accessibility label', () => (
    <UserOnline32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <UserOnline32 aria-label="Icon label">
      <title>Icon title</title>
    </UserOnline32>
  ));
