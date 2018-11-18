import React from 'react';
import { storiesOf } from '@storybook/react';
import NumberSmall_932 from '../../../es/number--small--9/32.js';

storiesOf('NumberSmall_932', module)
  .add('default', () => <NumberSmall_932 />)
  .add('with accessibility label', () => (
    <NumberSmall_932 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <NumberSmall_932 aria-label="Icon label">
      <title>Icon title</title>
    </NumberSmall_932>
  ));
