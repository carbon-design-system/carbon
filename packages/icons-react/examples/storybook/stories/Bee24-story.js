import React from 'react';
import { storiesOf } from '@storybook/react';
import Bee24 from '../../../es/bee/24.js';

storiesOf('Bee24', module)
  .add('default', () => <Bee24 />)
  .add('with accessibility label', () => (
    <Bee24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Bee24 aria-label="Icon label">
      <title>Icon title</title>
    </Bee24>
  ));
