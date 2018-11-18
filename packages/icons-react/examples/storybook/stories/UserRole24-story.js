import React from 'react';
import { storiesOf } from '@storybook/react';
import UserRole24 from '../../../es/user--role/24.js';

storiesOf('UserRole24', module)
  .add('default', () => <UserRole24 />)
  .add('with accessibility label', () => (
    <UserRole24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <UserRole24 aria-label="Icon label">
      <title>Icon title</title>
    </UserRole24>
  ));
