import React from 'react';
import { storiesOf } from '@storybook/react';
import Printer20 from '../../../es/printer/20.js';

storiesOf('Printer20', module)
  .add('default', () => <Printer20 />)
  .add('with accessibility label', () => (
    <Printer20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Printer20 aria-label="Icon label">
      <title>Icon title</title>
    </Printer20>
  ));
