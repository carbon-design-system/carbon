import React from 'react';
import { storiesOf } from '@storybook/react';
import AlignLeft32 from '../../../lib/AlignLeft/32';

storiesOf('AlignLeft32', module)
  .add('default', () => <AlignLeft32 />)
  .add('with accessibility label', () => (
    <AlignLeft32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <AlignLeft32 focusable>
      <title>Icon title</title>
    </AlignLeft32>
  ));
