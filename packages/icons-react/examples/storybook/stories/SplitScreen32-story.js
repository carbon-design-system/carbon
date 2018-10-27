import React from 'react';
import { storiesOf } from '@storybook/react';
import SplitScreen32 from '../../../lib/split-screen/32';

storiesOf('SplitScreen32', module)
  .add('default', () => <SplitScreen32 />)
  .add('with accessibility label', () => (
    <SplitScreen32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <SplitScreen32 focusable>
      <title>Icon title</title>
    </SplitScreen32>
  ));
