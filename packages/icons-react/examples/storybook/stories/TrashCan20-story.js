import React from 'react';
import { storiesOf } from '@storybook/react';
import TrashCan20 from '../../../es/trash-can/20.js';

storiesOf('TrashCan20', module)
  .add('default', () => <TrashCan20 />)
  .add('with accessibility label', () => (
    <TrashCan20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <TrashCan20 aria-label="Icon label">
      <title>Icon title</title>
    </TrashCan20>
  ));
