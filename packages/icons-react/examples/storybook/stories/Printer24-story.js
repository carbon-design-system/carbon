import React from 'react';
import { storiesOf } from '@storybook/react';
import Printer24 from '../../../es/printer/24.js';

storiesOf('Printer24', module)
  .add('default', () => <Printer24 />)
  .add('with accessibility label', () => (
    <Printer24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Printer24 aria-label="Icon label">
      <title>Icon title</title>
    </Printer24>
  ));
