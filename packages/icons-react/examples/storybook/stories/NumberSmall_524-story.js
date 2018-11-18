import React from 'react';
import { storiesOf } from '@storybook/react';
import NumberSmall_524 from '../../../es/number--small--5/24.js';

storiesOf('NumberSmall_524', module)
  .add('default', () => <NumberSmall_524 />)
  .add('with accessibility label', () => (
    <NumberSmall_524 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <NumberSmall_524 aria-label="Icon label">
      <title>Icon title</title>
    </NumberSmall_524>
  ));
