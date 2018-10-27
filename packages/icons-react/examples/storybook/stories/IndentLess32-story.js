import React from 'react';
import { storiesOf } from '@storybook/react';
import IndentLess32 from '../../../lib/indent--less/32';

storiesOf('IndentLess32', module)
  .add('default', () => <IndentLess32 />)
  .add('with accessibility label', () => (
    <IndentLess32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <IndentLess32 focusable>
      <title>Icon title</title>
    </IndentLess32>
  ));
