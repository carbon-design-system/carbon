import React from 'react';
import { storiesOf } from '@storybook/react';
import TrashCan32 from '../../../es/trash-can/32.js';

storiesOf('TrashCan32', module)
  .add('default', () => <TrashCan32 />)
  .add('with accessibility label', () => (
    <TrashCan32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <TrashCan32 aria-label="Icon label">
      <title>Icon title</title>
    </TrashCan32>
  ));
