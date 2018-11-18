import React from 'react';
import { storiesOf } from '@storybook/react';
import Tools32 from '../../../es/tools/32.js';

storiesOf('Tools32', module)
  .add('default', () => <Tools32 />)
  .add('with accessibility label', () => (
    <Tools32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Tools32 aria-label="Icon label">
      <title>Icon title</title>
    </Tools32>
  ));
