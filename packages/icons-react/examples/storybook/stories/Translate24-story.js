import React from 'react';
import { storiesOf } from '@storybook/react';
import Translate24 from '../../../es/translate/24.js';

storiesOf('Translate24', module)
  .add('default', () => <Translate24 />)
  .add('with accessibility label', () => (
    <Translate24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Translate24 aria-label="Icon label">
      <title>Icon title</title>
    </Translate24>
  ));
