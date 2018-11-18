import React from 'react';
import { storiesOf } from '@storybook/react';
import TextColor32 from '../../../es/text-color/32.js';

storiesOf('TextColor32', module)
  .add('default', () => <TextColor32 />)
  .add('with accessibility label', () => (
    <TextColor32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <TextColor32 aria-label="Icon label">
      <title>Icon title</title>
    </TextColor32>
  ));
