import React from 'react';
import { storiesOf } from '@storybook/react';
import Diagram32 from '../../../es/diagram/32.js';

storiesOf('Diagram32', module)
  .add('default', () => <Diagram32 />)
  .add('with accessibility label', () => (
    <Diagram32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Diagram32 aria-label="Icon label">
      <title>Icon title</title>
    </Diagram32>
  ));
