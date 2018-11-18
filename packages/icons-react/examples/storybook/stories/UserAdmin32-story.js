import React from 'react';
import { storiesOf } from '@storybook/react';
import UserAdmin32 from '../../../es/user--admin/32.js';

storiesOf('UserAdmin32', module)
  .add('default', () => <UserAdmin32 />)
  .add('with accessibility label', () => (
    <UserAdmin32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <UserAdmin32 aria-label="Icon label">
      <title>Icon title</title>
    </UserAdmin32>
  ));
