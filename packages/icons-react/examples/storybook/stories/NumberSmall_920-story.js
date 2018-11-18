import React from 'react';
import { storiesOf } from '@storybook/react';
import NumberSmall_920 from '../../../es/number--small--9/20.js';

storiesOf('NumberSmall_920', module)
  .add('default', () => <NumberSmall_920 />)
  .add('with accessibility label', () => (
    <NumberSmall_920 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <NumberSmall_920 aria-label="Icon label">
      <title>Icon title</title>
    </NumberSmall_920>
  ));
