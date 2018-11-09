import React from 'react';
import { storiesOf } from '@storybook/react';
import LetterNn32 from '../../../lib/LetterNn/32';

storiesOf('LetterNn32', module)
  .add('default', () => <LetterNn32 />)
  .add('with accessibility label', () => (
    <LetterNn32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LetterNn32 focusable>
      <title>Icon title</title>
    </LetterNn32>
  ));
