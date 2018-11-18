import React from 'react';
import { storiesOf } from '@storybook/react';
import NumberSmall_520 from '../../../es/number--small--5/20.js';

storiesOf('NumberSmall_520', module)
  .add('default', () => <NumberSmall_520 />)
  .add('with accessibility label', () => (
    <NumberSmall_520 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <NumberSmall_520 aria-label="Icon label">
      <title>Icon title</title>
    </NumberSmall_520>
  ));
