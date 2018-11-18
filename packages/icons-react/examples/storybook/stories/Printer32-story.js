import React from 'react';
import { storiesOf } from '@storybook/react';
import Printer32 from '../../../es/printer/32.js';

storiesOf('Printer32', module)
  .add('default', () => <Printer32 />)
  .add('with accessibility label', () => (
    <Printer32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Printer32 aria-label="Icon label">
      <title>Icon title</title>
    </Printer32>
  ));
