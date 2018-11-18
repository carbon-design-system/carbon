import React from 'react';
import { storiesOf } from '@storybook/react';
import Locked24 from '../../../es/locked/24.js';

storiesOf('Locked24', module)
  .add('default', () => <Locked24 />)
  .add('with accessibility label', () => (
    <Locked24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Locked24 aria-label="Icon label">
      <title>Icon title</title>
    </Locked24>
  ));
