import React from 'react';
import { storiesOf } from '@storybook/react';
import UserAvatar16 from '../../../es/user--avatar/16.js';

storiesOf('UserAvatar16', module)
  .add('default', () => <UserAvatar16 />)
  .add('with accessibility label', () => (
    <UserAvatar16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <UserAvatar16 aria-label="Icon label">
      <title>Icon title</title>
    </UserAvatar16>
  ));
