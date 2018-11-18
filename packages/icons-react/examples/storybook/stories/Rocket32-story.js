import React from 'react';
import { storiesOf } from '@storybook/react';
import Rocket32 from '../../../es/rocket/32.js';

storiesOf('Rocket32', module)
  .add('default', () => <Rocket32 />)
  .add('with accessibility label', () => (
    <Rocket32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Rocket32 aria-label="Icon label">
      <title>Icon title</title>
    </Rocket32>
  ));
