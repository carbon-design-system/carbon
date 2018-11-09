import React from 'react';
import { storiesOf } from '@storybook/react';
import UserAvatar16 from '../../../lib/UserAvatar/16';

storiesOf('UserAvatar16', module)
  .add('default', () => <UserAvatar16 />)
  .add('with accessibility label', () => (
    <UserAvatar16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <UserAvatar16 focusable>
      <title>Icon title</title>
    </UserAvatar16>
  ));
