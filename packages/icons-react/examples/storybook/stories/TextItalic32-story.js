import React from 'react';
import { storiesOf } from '@storybook/react';
import TextItalic32 from '../../../lib/text-italic/32';

storiesOf('TextItalic32', module)
  .add('default', () => <TextItalic32 />)
  .add('with accessibility label', () => (
    <TextItalic32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <TextItalic32 focusable>
      <title>Icon title</title>
    </TextItalic32>
  ));
