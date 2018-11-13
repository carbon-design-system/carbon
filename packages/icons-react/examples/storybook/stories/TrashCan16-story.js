import React from 'react';
import { storiesOf } from '@storybook/react';
import TrashCan16 from '../../../lib/TrashCan/16';

storiesOf('TrashCan16', module)
  .add('default', () => <TrashCan16 />)
  .add('with accessibility label', () => (
    <TrashCan16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <TrashCan16 focusable>
      <title>Icon title</title>
    </TrashCan16>
  ));
