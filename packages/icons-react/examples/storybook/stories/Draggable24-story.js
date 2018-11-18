import React from 'react';
import { storiesOf } from '@storybook/react';
import Draggable24 from '../../../es/draggable/24.js';

storiesOf('Draggable24', module)
  .add('default', () => <Draggable24 />)
  .add('with accessibility label', () => (
    <Draggable24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Draggable24 aria-label="Icon label">
      <title>Icon title</title>
    </Draggable24>
  ));
