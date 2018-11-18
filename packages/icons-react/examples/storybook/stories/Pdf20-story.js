import React from 'react';
import { storiesOf } from '@storybook/react';
import Pdf20 from '../../../es/PDF/20.js';

storiesOf('Pdf20', module)
  .add('default', () => <Pdf20 />)
  .add('with accessibility label', () => (
    <Pdf20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Pdf20 aria-label="Icon label">
      <title>Icon title</title>
    </Pdf20>
  ));
