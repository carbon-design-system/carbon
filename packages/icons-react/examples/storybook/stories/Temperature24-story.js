import React from 'react';
import { storiesOf } from '@storybook/react';
import Temperature24 from '../../../es/temperature/24.js';

storiesOf('Temperature24', module)
  .add('default', () => <Temperature24 />)
  .add('with accessibility label', () => (
    <Temperature24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Temperature24 aria-label="Icon label">
      <title>Icon title</title>
    </Temperature24>
  ));
