import React from 'react';
import { storiesOf } from '@storybook/react';
import UserFollow24 from '../../../es/user--follow/24.js';

storiesOf('UserFollow24', module)
  .add('default', () => <UserFollow24 />)
  .add('with accessibility label', () => (
    <UserFollow24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <UserFollow24 aria-label="Icon label">
      <title>Icon title</title>
    </UserFollow24>
  ));
