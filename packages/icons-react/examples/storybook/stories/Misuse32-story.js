import React from 'react';
import { storiesOf } from '@storybook/react';
import Misuse32 from '../../../lib/misuse/32';

storiesOf('Misuse32', module)
  .add('default', () => <Misuse32 />)
  .add('with accessibility label', () => (
    <Misuse32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Misuse32 focusable>
      <title>Icon title</title>
    </Misuse32>
  ));
