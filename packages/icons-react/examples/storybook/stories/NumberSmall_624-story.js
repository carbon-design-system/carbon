import React from 'react';
import { storiesOf } from '@storybook/react';
import NumberSmall_624 from '../../../es/number--small--6/24.js';

storiesOf('NumberSmall_624', module)
  .add('default', () => <NumberSmall_624 />)
  .add('with accessibility label', () => (
    <NumberSmall_624 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <NumberSmall_624 aria-label="Icon label">
      <title>Icon title</title>
    </NumberSmall_624>
  ));
