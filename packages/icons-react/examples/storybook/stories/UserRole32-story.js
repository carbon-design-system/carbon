import React from 'react';
import { storiesOf } from '@storybook/react';
import UserRole32 from '../../../es/user--role/32.js';

storiesOf('UserRole32', module)
  .add('default', () => <UserRole32 />)
  .add('with accessibility label', () => (
    <UserRole32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <UserRole32 aria-label="Icon label">
      <title>Icon title</title>
    </UserRole32>
  ));
