import React from 'react';
import { storiesOf } from '@storybook/react';
import UserAdmin32 from '../../../lib/UserAdmin/32';

storiesOf('UserAdmin32', module)
  .add('default', () => <UserAdmin32 />)
  .add('with accessibility label', () => (
    <UserAdmin32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <UserAdmin32 focusable>
      <title>Icon title</title>
    </UserAdmin32>
  ));
