import React from 'react';
import { storiesOf } from '@storybook/react';
import NumberSmall_324 from '../../../es/number--small--3/24.js';

storiesOf('NumberSmall_324', module)
  .add('default', () => <NumberSmall_324 />)
  .add('with accessibility label', () => (
    <NumberSmall_324 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <NumberSmall_324 aria-label="Icon label">
      <title>Icon title</title>
    </NumberSmall_324>
  ));
