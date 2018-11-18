import React from 'react';
import { storiesOf } from '@storybook/react';
import IndentMore32 from '../../../es/indent--more/32.js';

storiesOf('IndentMore32', module)
  .add('default', () => <IndentMore32 />)
  .add('with accessibility label', () => (
    <IndentMore32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <IndentMore32 aria-label="Icon label">
      <title>Icon title</title>
    </IndentMore32>
  ));
