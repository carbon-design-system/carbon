import React from 'react';
import { storiesOf } from '@storybook/react';
import UserOnline20 from '../../../es/user--online/20.js';

storiesOf('UserOnline20', module)
  .add('default', () => <UserOnline20 />)
  .add('with accessibility label', () => (
    <UserOnline20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <UserOnline20 aria-label="Icon label">
      <title>Icon title</title>
    </UserOnline20>
  ));
