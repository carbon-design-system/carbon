import React from 'react';
import { storiesOf } from '@storybook/react';
import Cognitive24 from '../../../es/cognitive/24.js';

storiesOf('Cognitive24', module)
  .add('default', () => <Cognitive24 />)
  .add('with accessibility label', () => (
    <Cognitive24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Cognitive24 aria-label="Icon label">
      <title>Icon title</title>
    </Cognitive24>
  ));
