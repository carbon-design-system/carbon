import React from 'react';
import { storiesOf } from '@storybook/react';
import Draggable20 from '../../../es/draggable/20.js';

storiesOf('Draggable20', module)
  .add('default', () => <Draggable20 />)
  .add('with accessibility label', () => (
    <Draggable20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Draggable20 aria-label="Icon label">
      <title>Icon title</title>
    </Draggable20>
  ));
