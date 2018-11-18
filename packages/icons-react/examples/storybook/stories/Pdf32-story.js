import React from 'react';
import { storiesOf } from '@storybook/react';
import Pdf32 from '../../../es/PDF/32.js';

storiesOf('Pdf32', module)
  .add('default', () => <Pdf32 />)
  .add('with accessibility label', () => (
    <Pdf32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Pdf32 aria-label="Icon label">
      <title>Icon title</title>
    </Pdf32>
  ));
