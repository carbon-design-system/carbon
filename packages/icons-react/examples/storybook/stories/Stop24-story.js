import React from 'react';
import { storiesOf } from '@storybook/react';
import Stop24 from '../../../es/stop/24.js';

storiesOf('Stop24', module)
  .add('default', () => <Stop24 />)
  .add('with accessibility label', () => (
    <Stop24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Stop24 aria-label="Icon label">
      <title>Icon title</title>
    </Stop24>
  ));
