import React from 'react';
import { storiesOf } from '@storybook/react';
import LetterKk32 from '../../../lib/LetterKk/32';

storiesOf('LetterKk32', module)
  .add('default', () => <LetterKk32 />)
  .add('with accessibility label', () => (
    <LetterKk32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LetterKk32 focusable>
      <title>Icon title</title>
    </LetterKk32>
  ));
