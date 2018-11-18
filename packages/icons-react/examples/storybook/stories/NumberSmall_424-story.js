import React from 'react';
import { storiesOf } from '@storybook/react';
import NumberSmall_424 from '../../../es/number--small--4/24.js';

storiesOf('NumberSmall_424', module)
  .add('default', () => <NumberSmall_424 />)
  .add('with accessibility label', () => (
    <NumberSmall_424 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <NumberSmall_424 aria-label="Icon label">
      <title>Icon title</title>
    </NumberSmall_424>
  ));
