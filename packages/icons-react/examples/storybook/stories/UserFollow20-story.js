import React from 'react';
import { storiesOf } from '@storybook/react';
import UserFollow20 from '../../../es/user--follow/20.js';

storiesOf('UserFollow20', module)
  .add('default', () => <UserFollow20 />)
  .add('with accessibility label', () => (
    <UserFollow20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <UserFollow20 aria-label="Icon label">
      <title>Icon title</title>
    </UserFollow20>
  ));
