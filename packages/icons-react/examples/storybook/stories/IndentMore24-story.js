import React from 'react';
import { storiesOf } from '@storybook/react';
import IndentMore24 from '../../../es/indent--more/24.js';

storiesOf('IndentMore24', module)
  .add('default', () => <IndentMore24 />)
  .add('with accessibility label', () => (
    <IndentMore24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <IndentMore24 aria-label="Icon label">
      <title>Icon title</title>
    </IndentMore24>
  ));
