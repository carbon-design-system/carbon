import React from 'react';
import { storiesOf } from '@storybook/react';
import Draggable16 from '../../../lib/draggable/16';

storiesOf('Draggable16', module)
  .add('default', () => <Draggable16 />)
  .add('with accessibility label', () => (
    <Draggable16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Draggable16 focusable>
      <title>Icon title</title>
    </Draggable16>
  ));
