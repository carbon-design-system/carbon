import React from 'react';
import { storiesOf } from '@storybook/react';
import Taxi32 from '../../../es/taxi/32.js';

storiesOf('Taxi32', module)
  .add('default', () => <Taxi32 />)
  .add('with accessibility label', () => (
    <Taxi32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Taxi32 aria-label="Icon label">
      <title>Icon title</title>
    </Taxi32>
  ));
