import React from 'react';
import { storiesOf } from '@storybook/react';
import UserOnline32 from '../../../lib/user--online/32';

storiesOf('UserOnline32', module)
  .add('default', () => <UserOnline32 />)
  .add('with accessibility label', () => (
    <UserOnline32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <UserOnline32 focusable>
      <title>Icon title</title>
    </UserOnline32>
  ));
