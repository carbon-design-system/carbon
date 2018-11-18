import React from 'react';
import { storiesOf } from '@storybook/react';
import UserAdmin24 from '../../../es/user--admin/24.js';

storiesOf('UserAdmin24', module)
  .add('default', () => <UserAdmin24 />)
  .add('with accessibility label', () => (
    <UserAdmin24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <UserAdmin24 aria-label="Icon label">
      <title>Icon title</title>
    </UserAdmin24>
  ));
