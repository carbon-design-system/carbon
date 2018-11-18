import React from 'react';
import { storiesOf } from '@storybook/react';
import Draggable32 from '../../../es/draggable/32.js';

storiesOf('Draggable32', module)
  .add('default', () => <Draggable32 />)
  .add('with accessibility label', () => (
    <Draggable32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Draggable32 aria-label="Icon label">
      <title>Icon title</title>
    </Draggable32>
  ));
