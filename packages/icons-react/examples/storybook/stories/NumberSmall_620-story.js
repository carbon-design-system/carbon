import React from 'react';
import { storiesOf } from '@storybook/react';
import NumberSmall_620 from '../../../es/number--small--6/20.js';

storiesOf('NumberSmall_620', module)
  .add('default', () => <NumberSmall_620 />)
  .add('with accessibility label', () => (
    <NumberSmall_620 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <NumberSmall_620 aria-label="Icon label">
      <title>Icon title</title>
    </NumberSmall_620>
  ));
