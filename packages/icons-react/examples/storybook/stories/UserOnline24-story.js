import React from 'react';
import { storiesOf } from '@storybook/react';
import UserOnline24 from '../../../es/user--online/24.js';

storiesOf('UserOnline24', module)
  .add('default', () => <UserOnline24 />)
  .add('with accessibility label', () => (
    <UserOnline24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <UserOnline24 aria-label="Icon label">
      <title>Icon title</title>
    </UserOnline24>
  ));
