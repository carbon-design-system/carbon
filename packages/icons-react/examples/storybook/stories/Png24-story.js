import React from 'react';
import { storiesOf } from '@storybook/react';
import Png24 from '../../../es/PNG/24.js';

storiesOf('Png24', module)
  .add('default', () => <Png24 />)
  .add('with accessibility label', () => (
    <Png24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Png24 aria-label="Icon label">
      <title>Icon title</title>
    </Png24>
  ));
