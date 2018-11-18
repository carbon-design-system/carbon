import React from 'react';
import { storiesOf } from '@storybook/react';
import Draggable16 from '../../../es/draggable/16.js';

storiesOf('Draggable16', module)
  .add('default', () => <Draggable16 />)
  .add('with accessibility label', () => (
    <Draggable16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Draggable16 aria-label="Icon label">
      <title>Icon title</title>
    </Draggable16>
  ));
