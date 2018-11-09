import React from 'react';
import { storiesOf } from '@storybook/react';
import LetterHh32 from '../../../lib/LetterHh/32';

storiesOf('LetterHh32', module)
  .add('default', () => <LetterHh32 />)
  .add('with accessibility label', () => (
    <LetterHh32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LetterHh32 focusable>
      <title>Icon title</title>
    </LetterHh32>
  ));
