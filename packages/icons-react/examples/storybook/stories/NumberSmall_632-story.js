import React from 'react';
import { storiesOf } from '@storybook/react';
import NumberSmall_632 from '../../../es/number--small--6/32.js';

storiesOf('NumberSmall_632', module)
  .add('default', () => <NumberSmall_632 />)
  .add('with accessibility label', () => (
    <NumberSmall_632 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <NumberSmall_632 aria-label="Icon label">
      <title>Icon title</title>
    </NumberSmall_632>
  ));
