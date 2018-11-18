import React from 'react';
import { storiesOf } from '@storybook/react';
import TextHighlight32 from '../../../es/text-highlight/32.js';

storiesOf('TextHighlight32', module)
  .add('default', () => <TextHighlight32 />)
  .add('with accessibility label', () => (
    <TextHighlight32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <TextHighlight32 aria-label="Icon label">
      <title>Icon title</title>
    </TextHighlight32>
  ));
