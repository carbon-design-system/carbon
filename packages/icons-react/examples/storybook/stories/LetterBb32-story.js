import React from 'react';
import { storiesOf } from '@storybook/react';
import LetterBb32 from '../../../lib/LetterBb/32';

storiesOf('LetterBb32', module)
  .add('default', () => <LetterBb32 />)
  .add('with accessibility label', () => (
    <LetterBb32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LetterBb32 focusable>
      <title>Icon title</title>
    </LetterBb32>
  ));
