import React from 'react';
import { storiesOf } from '@storybook/react';
import UserAvatar32 from '../../../lib/UserAvatar/32';

storiesOf('UserAvatar32', module)
  .add('default', () => <UserAvatar32 />)
  .add('with accessibility label', () => (
    <UserAvatar32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <UserAvatar32 focusable>
      <title>Icon title</title>
    </UserAvatar32>
  ));
