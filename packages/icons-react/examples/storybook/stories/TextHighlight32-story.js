import React from 'react';
import { storiesOf } from '@storybook/react';
import TextHighlight32 from '../../../lib/text-highlight/32';

storiesOf('TextHighlight32', module)
  .add('default', () => <TextHighlight32 />)
  .add('with accessibility label', () => (
    <TextHighlight32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <TextHighlight32 focusable>
      <title>Icon title</title>
    </TextHighlight32>
  ));
