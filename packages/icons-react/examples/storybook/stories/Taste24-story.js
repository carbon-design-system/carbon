import React from 'react';
import { storiesOf } from '@storybook/react';
import Taste24 from '../../../es/taste/24.js';

storiesOf('Taste24', module)
  .add('default', () => <Taste24 />)
  .add('with accessibility label', () => (
    <Taste24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Taste24 aria-label="Icon label">
      <title>Icon title</title>
    </Taste24>
  ));
