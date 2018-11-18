import React from 'react';
import { storiesOf } from '@storybook/react';
import UserAdmin20 from '../../../es/user--admin/20.js';

storiesOf('UserAdmin20', module)
  .add('default', () => <UserAdmin20 />)
  .add('with accessibility label', () => (
    <UserAdmin20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <UserAdmin20 aria-label="Icon label">
      <title>Icon title</title>
    </UserAdmin20>
  ));
