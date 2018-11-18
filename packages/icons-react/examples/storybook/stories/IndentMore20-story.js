import React from 'react';
import { storiesOf } from '@storybook/react';
import IndentMore20 from '../../../es/indent--more/20.js';

storiesOf('IndentMore20', module)
  .add('default', () => <IndentMore20 />)
  .add('with accessibility label', () => (
    <IndentMore20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <IndentMore20 aria-label="Icon label">
      <title>Icon title</title>
    </IndentMore20>
  ));
