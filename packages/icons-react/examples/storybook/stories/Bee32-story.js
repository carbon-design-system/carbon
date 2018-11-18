import React from 'react';
import { storiesOf } from '@storybook/react';
import Bee32 from '../../../es/bee/32.js';

storiesOf('Bee32', module)
  .add('default', () => <Bee32 />)
  .add('with accessibility label', () => (
    <Bee32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Bee32 aria-label="Icon label">
      <title>Icon title</title>
    </Bee32>
  ));
