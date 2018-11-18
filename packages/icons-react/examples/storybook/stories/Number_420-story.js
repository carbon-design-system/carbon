import React from 'react';
import { storiesOf } from '@storybook/react';
import Number_420 from '../../../es/number--4/20.js';

storiesOf('Number_420', module)
  .add('default', () => <Number_420 />)
  .add('with accessibility label', () => (
    <Number_420 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Number_420 aria-label="Icon label">
      <title>Icon title</title>
    </Number_420>
  ));
