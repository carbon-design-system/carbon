import React from 'react';
import { storiesOf } from '@storybook/react';
import Diagram24 from '../../../es/diagram/24.js';

storiesOf('Diagram24', module)
  .add('default', () => <Diagram24 />)
  .add('with accessibility label', () => (
    <Diagram24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Diagram24 aria-label="Icon label">
      <title>Icon title</title>
    </Diagram24>
  ));
