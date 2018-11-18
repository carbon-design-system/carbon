import React from 'react';
import { storiesOf } from '@storybook/react';
import NumberSmall_032 from '../../../es/number--small--0/32.js';

storiesOf('NumberSmall_032', module)
  .add('default', () => <NumberSmall_032 />)
  .add('with accessibility label', () => (
    <NumberSmall_032 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <NumberSmall_032 aria-label="Icon label">
      <title>Icon title</title>
    </NumberSmall_032>
  ));
