import React from 'react';
import { storiesOf } from '@storybook/react';
import Asleep24 from '../../../es/asleep/24.js';

storiesOf('Asleep24', module)
  .add('default', () => <Asleep24 />)
  .add('with accessibility label', () => (
    <Asleep24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Asleep24 aria-label="Icon label">
      <title>Icon title</title>
    </Asleep24>
  ));
