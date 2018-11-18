import React from 'react';
import { storiesOf } from '@storybook/react';
import Tools20 from '../../../es/tools/20.js';

storiesOf('Tools20', module)
  .add('default', () => <Tools20 />)
  .add('with accessibility label', () => (
    <Tools20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Tools20 aria-label="Icon label">
      <title>Icon title</title>
    </Tools20>
  ));
