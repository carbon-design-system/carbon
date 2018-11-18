import React from 'react';
import { storiesOf } from '@storybook/react';
import IndentLess32 from '../../../es/indent--less/32.js';

storiesOf('IndentLess32', module)
  .add('default', () => <IndentLess32 />)
  .add('with accessibility label', () => (
    <IndentLess32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <IndentLess32 aria-label="Icon label">
      <title>Icon title</title>
    </IndentLess32>
  ));
