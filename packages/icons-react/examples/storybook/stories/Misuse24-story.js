import React from 'react';
import { storiesOf } from '@storybook/react';
import Misuse24 from '../../../es/misuse/24.js';

storiesOf('Misuse24', module)
  .add('default', () => <Misuse24 />)
  .add('with accessibility label', () => (
    <Misuse24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Misuse24 aria-label="Icon label">
      <title>Icon title</title>
    </Misuse24>
  ));
