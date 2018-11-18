import React from 'react';
import { storiesOf } from '@storybook/react';
import Misuse32 from '../../../es/misuse/32.js';

storiesOf('Misuse32', module)
  .add('default', () => <Misuse32 />)
  .add('with accessibility label', () => (
    <Misuse32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Misuse32 aria-label="Icon label">
      <title>Icon title</title>
    </Misuse32>
  ));
