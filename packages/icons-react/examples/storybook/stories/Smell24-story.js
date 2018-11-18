import React from 'react';
import { storiesOf } from '@storybook/react';
import Smell24 from '../../../es/smell/24.js';

storiesOf('Smell24', module)
  .add('default', () => <Smell24 />)
  .add('with accessibility label', () => (
    <Smell24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Smell24 aria-label="Icon label">
      <title>Icon title</title>
    </Smell24>
  ));
