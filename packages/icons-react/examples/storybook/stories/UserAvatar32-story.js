import React from 'react';
import { storiesOf } from '@storybook/react';
import UserAvatar32 from '../../../es/user--avatar/32.js';

storiesOf('UserAvatar32', module)
  .add('default', () => <UserAvatar32 />)
  .add('with accessibility label', () => (
    <UserAvatar32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <UserAvatar32 aria-label="Icon label">
      <title>Icon title</title>
    </UserAvatar32>
  ));
