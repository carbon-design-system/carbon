import React from 'react';
import { storiesOf } from '@storybook/react';
import NumberSmall_820 from '../../../es/number--small--8/20.js';

storiesOf('NumberSmall_820', module)
  .add('default', () => <NumberSmall_820 />)
  .add('with accessibility label', () => (
    <NumberSmall_820 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <NumberSmall_820 aria-label="Icon label">
      <title>Icon title</title>
    </NumberSmall_820>
  ));
