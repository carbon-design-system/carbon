import React from 'react';
import { storiesOf } from '@storybook/react';
import TextItalic24 from '../../../es/text-italic/24.js';

storiesOf('TextItalic24', module)
  .add('default', () => <TextItalic24 />)
  .add('with accessibility label', () => (
    <TextItalic24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <TextItalic24 aria-label="Icon label">
      <title>Icon title</title>
    </TextItalic24>
  ));
