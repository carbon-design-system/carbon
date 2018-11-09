import React from 'react';
import { storiesOf } from '@storybook/react';
import LetterGg32 from '../../../lib/LetterGg/32';

storiesOf('LetterGg32', module)
  .add('default', () => <LetterGg32 />)
  .add('with accessibility label', () => (
    <LetterGg32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LetterGg32 focusable>
      <title>Icon title</title>
    </LetterGg32>
  ));
