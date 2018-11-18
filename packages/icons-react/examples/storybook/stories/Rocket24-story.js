import React from 'react';
import { storiesOf } from '@storybook/react';
import Rocket24 from '../../../es/rocket/24.js';

storiesOf('Rocket24', module)
  .add('default', () => <Rocket24 />)
  .add('with accessibility label', () => (
    <Rocket24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Rocket24 aria-label="Icon label">
      <title>Icon title</title>
    </Rocket24>
  ));
