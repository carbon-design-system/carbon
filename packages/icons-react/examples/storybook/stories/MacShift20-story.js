import React from 'react';
import { storiesOf } from '@storybook/react';
import MacShift20 from '../../../es/mac--shift/20.js';

storiesOf('MacShift20', module)
  .add('default', () => <MacShift20 />)
  .add('with accessibility label', () => (
    <MacShift20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <MacShift20 aria-label="Icon label">
      <title>Icon title</title>
    </MacShift20>
  ));
