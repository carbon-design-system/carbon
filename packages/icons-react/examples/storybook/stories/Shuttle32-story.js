import React from 'react';
import { storiesOf } from '@storybook/react';
import Shuttle32 from '../../../es/shuttle/32.js';

storiesOf('Shuttle32', module)
  .add('default', () => <Shuttle32 />)
  .add('with accessibility label', () => (
    <Shuttle32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Shuttle32 aria-label="Icon label">
      <title>Icon title</title>
    </Shuttle32>
  ));
