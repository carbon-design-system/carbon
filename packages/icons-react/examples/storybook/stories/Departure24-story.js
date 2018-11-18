import React from 'react';
import { storiesOf } from '@storybook/react';
import Departure24 from '../../../es/departure/24.js';

storiesOf('Departure24', module)
  .add('default', () => <Departure24 />)
  .add('with accessibility label', () => (
    <Departure24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Departure24 aria-label="Icon label">
      <title>Icon title</title>
    </Departure24>
  ));
