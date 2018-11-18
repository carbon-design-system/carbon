import React from 'react';
import { storiesOf } from '@storybook/react';
import UserAvatar24 from '../../../es/user--avatar/24.js';

storiesOf('UserAvatar24', module)
  .add('default', () => <UserAvatar24 />)
  .add('with accessibility label', () => (
    <UserAvatar24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <UserAvatar24 aria-label="Icon label">
      <title>Icon title</title>
    </UserAvatar24>
  ));
