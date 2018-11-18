import React from 'react';
import { storiesOf } from '@storybook/react';
import Arrival24 from '../../../es/arrival/24.js';

storiesOf('Arrival24', module)
  .add('default', () => <Arrival24 />)
  .add('with accessibility label', () => (
    <Arrival24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Arrival24 aria-label="Icon label">
      <title>Icon title</title>
    </Arrival24>
  ));
