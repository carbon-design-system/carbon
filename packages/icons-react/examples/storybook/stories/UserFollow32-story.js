import React from 'react';
import { storiesOf } from '@storybook/react';
import UserFollow32 from '../../../es/user--follow/32.js';

storiesOf('UserFollow32', module)
  .add('default', () => <UserFollow32 />)
  .add('with accessibility label', () => (
    <UserFollow32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <UserFollow32 aria-label="Icon label">
      <title>Icon title</title>
    </UserFollow32>
  ));
