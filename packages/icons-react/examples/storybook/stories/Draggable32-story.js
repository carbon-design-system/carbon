import React from 'react';
import { storiesOf } from '@storybook/react';
import Draggable32 from '../../../lib/Draggable/32';

storiesOf('Draggable32', module)
  .add('default', () => <Draggable32 />)
  .add('with accessibility label', () => (
    <Draggable32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Draggable32 focusable>
      <title>Icon title</title>
    </Draggable32>
  ));
