import React from 'react';
import { storiesOf } from '@storybook/react';
import TextFill32 from '../../../es/text-fill/32.js';

storiesOf('TextFill32', module)
  .add('default', () => <TextFill32 />)
  .add('with accessibility label', () => (
    <TextFill32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <TextFill32 aria-label="Icon label">
      <title>Icon title</title>
    </TextFill32>
  ));
