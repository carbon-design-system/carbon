import React from 'react';
import { storiesOf } from '@storybook/react';
import TextHighlight20 from '../../../es/text-highlight/20.js';

storiesOf('TextHighlight20', module)
  .add('default', () => <TextHighlight20 />)
  .add('with accessibility label', () => (
    <TextHighlight20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <TextHighlight20 aria-label="Icon label">
      <title>Icon title</title>
    </TextHighlight20>
  ));
