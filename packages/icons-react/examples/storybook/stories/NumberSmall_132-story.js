import React from 'react';
import { storiesOf } from '@storybook/react';
import NumberSmall_132 from '../../../es/number--small--1/32.js';

storiesOf('NumberSmall_132', module)
  .add('default', () => <NumberSmall_132 />)
  .add('with accessibility label', () => (
    <NumberSmall_132 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <NumberSmall_132 aria-label="Icon label">
      <title>Icon title</title>
    </NumberSmall_132>
  ));
