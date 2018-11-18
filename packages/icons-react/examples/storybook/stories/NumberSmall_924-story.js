import React from 'react';
import { storiesOf } from '@storybook/react';
import NumberSmall_924 from '../../../es/number--small--9/24.js';

storiesOf('NumberSmall_924', module)
  .add('default', () => <NumberSmall_924 />)
  .add('with accessibility label', () => (
    <NumberSmall_924 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <NumberSmall_924 aria-label="Icon label">
      <title>Icon title</title>
    </NumberSmall_924>
  ));
