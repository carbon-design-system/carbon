import React from 'react';
import { storiesOf } from '@storybook/react';
import NumberSmall_224 from '../../../es/number--small--2/24.js';

storiesOf('NumberSmall_224', module)
  .add('default', () => <NumberSmall_224 />)
  .add('with accessibility label', () => (
    <NumberSmall_224 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <NumberSmall_224 aria-label="Icon label">
      <title>Icon title</title>
    </NumberSmall_224>
  ));
