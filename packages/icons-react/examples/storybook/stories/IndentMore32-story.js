import React from 'react';
import { storiesOf } from '@storybook/react';
import IndentMore32 from '../../../lib/IndentMore/32';

storiesOf('IndentMore32', module)
  .add('default', () => <IndentMore32 />)
  .add('with accessibility label', () => (
    <IndentMore32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <IndentMore32 focusable>
      <title>Icon title</title>
    </IndentMore32>
  ));
