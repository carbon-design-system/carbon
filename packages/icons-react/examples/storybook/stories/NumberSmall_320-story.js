import React from 'react';
import { storiesOf } from '@storybook/react';
import NumberSmall_320 from '../../../es/number--small--3/20.js';

storiesOf('NumberSmall_320', module)
  .add('default', () => <NumberSmall_320 />)
  .add('with accessibility label', () => (
    <NumberSmall_320 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <NumberSmall_320 aria-label="Icon label">
      <title>Icon title</title>
    </NumberSmall_320>
  ));
