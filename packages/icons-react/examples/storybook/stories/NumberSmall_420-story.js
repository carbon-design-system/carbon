import React from 'react';
import { storiesOf } from '@storybook/react';
import NumberSmall_420 from '../../../es/number--small--4/20.js';

storiesOf('NumberSmall_420', module)
  .add('default', () => <NumberSmall_420 />)
  .add('with accessibility label', () => (
    <NumberSmall_420 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <NumberSmall_420 aria-label="Icon label">
      <title>Icon title</title>
    </NumberSmall_420>
  ));
