import React from 'react';
import { storiesOf } from '@storybook/react';
import LetterTt32 from '../../../lib/LetterTt/32';

storiesOf('LetterTt32', module)
  .add('default', () => <LetterTt32 />)
  .add('with accessibility label', () => (
    <LetterTt32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LetterTt32 focusable>
      <title>Icon title</title>
    </LetterTt32>
  ));
