import React from 'react';
import { storiesOf } from '@storybook/react';
import Asleep32 from '../../../es/asleep/32.js';

storiesOf('Asleep32', module)
  .add('default', () => <Asleep32 />)
  .add('with accessibility label', () => (
    <Asleep32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Asleep32 aria-label="Icon label">
      <title>Icon title</title>
    </Asleep32>
  ));
