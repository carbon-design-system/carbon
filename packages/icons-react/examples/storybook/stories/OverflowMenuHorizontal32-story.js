import React from 'react';
import { storiesOf } from '@storybook/react';
import OverflowMenuHorizontal32 from '../../../lib/OverflowMenuHorizontal/32';

storiesOf('OverflowMenuHorizontal32', module)
  .add('default', () => <OverflowMenuHorizontal32 />)
  .add('with accessibility label', () => (
    <OverflowMenuHorizontal32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <OverflowMenuHorizontal32 focusable>
      <title>Icon title</title>
    </OverflowMenuHorizontal32>
  ));
