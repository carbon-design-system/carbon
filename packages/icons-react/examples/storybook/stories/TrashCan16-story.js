import React from 'react';
import { storiesOf } from '@storybook/react';
import TrashCan16 from '../../../es/trash-can/16.js';

storiesOf('TrashCan16', module)
  .add('default', () => <TrashCan16 />)
  .add('with accessibility label', () => (
    <TrashCan16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <TrashCan16 aria-label="Icon label">
      <title>Icon title</title>
    </TrashCan16>
  ));
