import React from 'react';
import { storiesOf } from '@storybook/react';
import OverflowMenuVertical32 from '../../../lib/OverflowMenuVertical/32';

storiesOf('OverflowMenuVertical32', module)
  .add('default', () => <OverflowMenuVertical32 />)
  .add('with accessibility label', () => (
    <OverflowMenuVertical32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <OverflowMenuVertical32 focusable>
      <title>Icon title</title>
    </OverflowMenuVertical32>
  ));
