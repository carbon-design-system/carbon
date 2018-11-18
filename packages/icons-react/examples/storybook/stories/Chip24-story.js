import React from 'react';
import { storiesOf } from '@storybook/react';
import Chip24 from '../../../es/chip/24.js';

storiesOf('Chip24', module)
  .add('default', () => <Chip24 />)
  .add('with accessibility label', () => (
    <Chip24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Chip24 aria-label="Icon label">
      <title>Icon title</title>
    </Chip24>
  ));
