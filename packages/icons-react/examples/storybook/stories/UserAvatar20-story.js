import React from 'react';
import { storiesOf } from '@storybook/react';
import UserAvatar20 from '../../../es/user--avatar/20.js';

storiesOf('UserAvatar20', module)
  .add('default', () => <UserAvatar20 />)
  .add('with accessibility label', () => (
    <UserAvatar20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <UserAvatar20 aria-label="Icon label">
      <title>Icon title</title>
    </UserAvatar20>
  ));
