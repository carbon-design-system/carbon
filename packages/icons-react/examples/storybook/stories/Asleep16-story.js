import React from 'react';
import { storiesOf } from '@storybook/react';
import Asleep16 from '../../../es/asleep/16.js';

storiesOf('Asleep16', module)
  .add('default', () => <Asleep16 />)
  .add('with accessibility label', () => (
    <Asleep16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Asleep16 aria-label="Icon label">
      <title>Icon title</title>
    </Asleep16>
  ));
