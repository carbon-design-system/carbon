import React from 'react';
import { storiesOf } from '@storybook/react';
import User20 from '../../../es/user/20.js';

storiesOf('User20', module)
  .add('default', () => <User20 />)
  .add('with accessibility label', () => (
    <User20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <User20 aria-label="Icon label">
      <title>Icon title</title>
    </User20>
  ));
