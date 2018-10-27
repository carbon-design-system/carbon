import React from 'react';
import { storiesOf } from '@storybook/react';
import TextUnderline32 from '../../../lib/text-underline/32';

storiesOf('TextUnderline32', module)
  .add('default', () => <TextUnderline32 />)
  .add('with accessibility label', () => (
    <TextUnderline32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <TextUnderline32 focusable>
      <title>Icon title</title>
    </TextUnderline32>
  ));
