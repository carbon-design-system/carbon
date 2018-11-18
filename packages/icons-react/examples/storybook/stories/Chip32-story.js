import React from 'react';
import { storiesOf } from '@storybook/react';
import Chip32 from '../../../es/chip/32.js';

storiesOf('Chip32', module)
  .add('default', () => <Chip32 />)
  .add('with accessibility label', () => (
    <Chip32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Chip32 aria-label="Icon label">
      <title>Icon title</title>
    </Chip32>
  ));
