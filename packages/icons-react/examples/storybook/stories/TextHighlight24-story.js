import React from 'react';
import { storiesOf } from '@storybook/react';
import TextHighlight24 from '../../../es/text-highlight/24.js';

storiesOf('TextHighlight24', module)
  .add('default', () => <TextHighlight24 />)
  .add('with accessibility label', () => (
    <TextHighlight24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <TextHighlight24 aria-label="Icon label">
      <title>Icon title</title>
    </TextHighlight24>
  ));
