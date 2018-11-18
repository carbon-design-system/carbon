import React from 'react';
import { storiesOf } from '@storybook/react';
import Cognitive32 from '../../../es/cognitive/32.js';

storiesOf('Cognitive32', module)
  .add('default', () => <Cognitive32 />)
  .add('with accessibility label', () => (
    <Cognitive32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Cognitive32 aria-label="Icon label">
      <title>Icon title</title>
    </Cognitive32>
  ));
