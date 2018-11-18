import React from 'react';
import { storiesOf } from '@storybook/react';
import Pause24 from '../../../es/pause/24.js';

storiesOf('Pause24', module)
  .add('default', () => <Pause24 />)
  .add('with accessibility label', () => (
    <Pause24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Pause24 aria-label="Icon label">
      <title>Icon title</title>
    </Pause24>
  ));
