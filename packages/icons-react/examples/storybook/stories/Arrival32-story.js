import React from 'react';
import { storiesOf } from '@storybook/react';
import Arrival32 from '../../../es/arrival/32.js';

storiesOf('Arrival32', module)
  .add('default', () => <Arrival32 />)
  .add('with accessibility label', () => (
    <Arrival32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Arrival32 aria-label="Icon label">
      <title>Icon title</title>
    </Arrival32>
  ));
