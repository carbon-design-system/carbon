import React from 'react';
import { storiesOf } from '@storybook/react';
import TextUnderline32 from '../../../es/text-underline/32.js';

storiesOf('TextUnderline32', module)
  .add('default', () => <TextUnderline32 />)
  .add('with accessibility label', () => (
    <TextUnderline32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <TextUnderline32 aria-label="Icon label">
      <title>Icon title</title>
    </TextUnderline32>
  ));
