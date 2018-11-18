import React from 'react';
import { storiesOf } from '@storybook/react';
import TrashCan24 from '../../../es/trash-can/24.js';

storiesOf('TrashCan24', module)
  .add('default', () => <TrashCan24 />)
  .add('with accessibility label', () => (
    <TrashCan24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <TrashCan24 aria-label="Icon label">
      <title>Icon title</title>
    </TrashCan24>
  ));
