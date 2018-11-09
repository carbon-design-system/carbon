import React from 'react';
import { storiesOf } from '@storybook/react';
import AlignCenter32 from '../../../lib/AlignCenter/32';

storiesOf('AlignCenter32', module)
  .add('default', () => <AlignCenter32 />)
  .add('with accessibility label', () => (
    <AlignCenter32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <AlignCenter32 focusable>
      <title>Icon title</title>
    </AlignCenter32>
  ));
