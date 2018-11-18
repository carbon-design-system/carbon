import React from 'react';
import { storiesOf } from '@storybook/react';
import IndentLess24 from '../../../es/indent--less/24.js';

storiesOf('IndentLess24', module)
  .add('default', () => <IndentLess24 />)
  .add('with accessibility label', () => (
    <IndentLess24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <IndentLess24 aria-label="Icon label">
      <title>Icon title</title>
    </IndentLess24>
  ));
