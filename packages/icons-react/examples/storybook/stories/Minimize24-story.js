import React from 'react';
import { storiesOf } from '@storybook/react';
import Minimize24 from '../../../es/minimize/24.js';

storiesOf('Minimize24', module)
  .add('default', () => <Minimize24 />)
  .add('with accessibility label', () => (
    <Minimize24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Minimize24 aria-label="Icon label">
      <title>Icon title</title>
    </Minimize24>
  ));
