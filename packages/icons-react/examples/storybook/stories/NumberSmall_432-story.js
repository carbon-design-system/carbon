import React from 'react';
import { storiesOf } from '@storybook/react';
import NumberSmall_432 from '../../../es/number--small--4/32.js';

storiesOf('NumberSmall_432', module)
  .add('default', () => <NumberSmall_432 />)
  .add('with accessibility label', () => (
    <NumberSmall_432 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <NumberSmall_432 aria-label="Icon label">
      <title>Icon title</title>
    </NumberSmall_432>
  ));
