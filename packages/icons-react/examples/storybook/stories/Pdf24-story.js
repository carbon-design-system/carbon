import React from 'react';
import { storiesOf } from '@storybook/react';
import Pdf24 from '../../../es/PDF/24.js';

storiesOf('Pdf24', module)
  .add('default', () => <Pdf24 />)
  .add('with accessibility label', () => (
    <Pdf24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Pdf24 aria-label="Icon label">
      <title>Icon title</title>
    </Pdf24>
  ));
