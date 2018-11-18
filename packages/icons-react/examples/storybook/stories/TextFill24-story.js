import React from 'react';
import { storiesOf } from '@storybook/react';
import TextFill24 from '../../../es/text-fill/24.js';

storiesOf('TextFill24', module)
  .add('default', () => <TextFill24 />)
  .add('with accessibility label', () => (
    <TextFill24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <TextFill24 aria-label="Icon label">
      <title>Icon title</title>
    </TextFill24>
  ));
