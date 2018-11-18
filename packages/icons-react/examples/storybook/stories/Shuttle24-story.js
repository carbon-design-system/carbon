import React from 'react';
import { storiesOf } from '@storybook/react';
import Shuttle24 from '../../../es/shuttle/24.js';

storiesOf('Shuttle24', module)
  .add('default', () => <Shuttle24 />)
  .add('with accessibility label', () => (
    <Shuttle24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Shuttle24 aria-label="Icon label">
      <title>Icon title</title>
    </Shuttle24>
  ));
