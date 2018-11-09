import React from 'react';
import { storiesOf } from '@storybook/react';
import TrashCan32 from '../../../lib/TrashCan/32';

storiesOf('TrashCan32', module)
  .add('default', () => <TrashCan32 />)
  .add('with accessibility label', () => (
    <TrashCan32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <TrashCan32 focusable>
      <title>Icon title</title>
    </TrashCan32>
  ));
