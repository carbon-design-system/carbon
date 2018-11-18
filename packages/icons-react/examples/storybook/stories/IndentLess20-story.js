import React from 'react';
import { storiesOf } from '@storybook/react';
import IndentLess20 from '../../../es/indent--less/20.js';

storiesOf('IndentLess20', module)
  .add('default', () => <IndentLess20 />)
  .add('with accessibility label', () => (
    <IndentLess20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <IndentLess20 aria-label="Icon label">
      <title>Icon title</title>
    </IndentLess20>
  ));
