import React from 'react';
import { storiesOf } from '@storybook/react';
import Taxi24 from '../../../es/taxi/24.js';

storiesOf('Taxi24', module)
  .add('default', () => <Taxi24 />)
  .add('with accessibility label', () => (
    <Taxi24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Taxi24 aria-label="Icon label">
      <title>Icon title</title>
    </Taxi24>
  ));
