import React from 'react';
import { storiesOf } from '@storybook/react';
import TextFill32 from '../../../lib/text-fill/32';

storiesOf('TextFill32', module)
  .add('default', () => <TextFill32 />)
  .add('with accessibility label', () => (
    <TextFill32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <TextFill32 focusable>
      <title>Icon title</title>
    </TextFill32>
  ));
