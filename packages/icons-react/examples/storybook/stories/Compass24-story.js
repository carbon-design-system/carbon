import React from 'react';
import { storiesOf } from '@storybook/react';
import Compass24 from '../../../es/compass/24.js';

storiesOf('Compass24', module)
  .add('default', () => <Compass24 />)
  .add('with accessibility label', () => (
    <Compass24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Compass24 aria-label="Icon label">
      <title>Icon title</title>
    </Compass24>
  ));
