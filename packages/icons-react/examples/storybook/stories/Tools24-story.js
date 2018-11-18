import React from 'react';
import { storiesOf } from '@storybook/react';
import Tools24 from '../../../es/tools/24.js';

storiesOf('Tools24', module)
  .add('default', () => <Tools24 />)
  .add('with accessibility label', () => (
    <Tools24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Tools24 aria-label="Icon label">
      <title>Icon title</title>
    </Tools24>
  ));
