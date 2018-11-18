import React from 'react';
import { storiesOf } from '@storybook/react';
import NumberSmall_020 from '../../../es/number--small--0/20.js';

storiesOf('NumberSmall_020', module)
  .add('default', () => <NumberSmall_020 />)
  .add('with accessibility label', () => (
    <NumberSmall_020 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <NumberSmall_020 aria-label="Icon label">
      <title>Icon title</title>
    </NumberSmall_020>
  ));
