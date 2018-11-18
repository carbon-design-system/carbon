import React from 'react';
import { storiesOf } from '@storybook/react';
import Password32 from '../../../es/password/32.js';

storiesOf('Password32', module)
  .add('default', () => <Password32 />)
  .add('with accessibility label', () => (
    <Password32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Password32 aria-label="Icon label">
      <title>Icon title</title>
    </Password32>
  ));
