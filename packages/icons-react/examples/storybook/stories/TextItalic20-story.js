import React from 'react';
import { storiesOf } from '@storybook/react';
import TextItalic20 from '../../../es/text-italic/20.js';

storiesOf('TextItalic20', module)
  .add('default', () => <TextItalic20 />)
  .add('with accessibility label', () => (
    <TextItalic20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <TextItalic20 aria-label="Icon label">
      <title>Icon title</title>
    </TextItalic20>
  ));
