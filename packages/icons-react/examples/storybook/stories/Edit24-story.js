import React from 'react';
import { storiesOf } from '@storybook/react';
import Edit24 from '../../../es/edit/24.js';

storiesOf('Edit24', module)
  .add('default', () => <Edit24 />)
  .add('with accessibility label', () => (
    <Edit24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Edit24 aria-label="Icon label">
      <title>Icon title</title>
    </Edit24>
  ));
