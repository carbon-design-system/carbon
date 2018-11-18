import React from 'react';
import { storiesOf } from '@storybook/react';
import Password24 from '../../../es/password/24.js';

storiesOf('Password24', module)
  .add('default', () => <Password24 />)
  .add('with accessibility label', () => (
    <Password24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Password24 aria-label="Icon label">
      <title>Icon title</title>
    </Password24>
  ));
