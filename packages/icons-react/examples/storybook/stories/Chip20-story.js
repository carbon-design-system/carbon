import React from 'react';
import { storiesOf } from '@storybook/react';
import Chip20 from '../../../es/chip/20.js';

storiesOf('Chip20', module)
  .add('default', () => <Chip20 />)
  .add('with accessibility label', () => (
    <Chip20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Chip20 aria-label="Icon label">
      <title>Icon title</title>
    </Chip20>
  ));
