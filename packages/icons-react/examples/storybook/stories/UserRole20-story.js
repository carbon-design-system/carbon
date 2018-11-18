import React from 'react';
import { storiesOf } from '@storybook/react';
import UserRole20 from '../../../es/user--role/20.js';

storiesOf('UserRole20', module)
  .add('default', () => <UserRole20 />)
  .add('with accessibility label', () => (
    <UserRole20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <UserRole20 aria-label="Icon label">
      <title>Icon title</title>
    </UserRole20>
  ));
