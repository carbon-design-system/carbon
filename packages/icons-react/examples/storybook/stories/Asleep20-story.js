import React from 'react';
import { storiesOf } from '@storybook/react';
import Asleep20 from '../../../es/asleep/20.js';

storiesOf('Asleep20', module)
  .add('default', () => <Asleep20 />)
  .add('with accessibility label', () => (
    <Asleep20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Asleep20 aria-label="Icon label">
      <title>Icon title</title>
    </Asleep20>
  ));
