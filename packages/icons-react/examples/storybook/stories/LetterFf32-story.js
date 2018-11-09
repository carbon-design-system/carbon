import React from 'react';
import { storiesOf } from '@storybook/react';
import LetterFf32 from '../../../lib/LetterFf/32';

storiesOf('LetterFf32', module)
  .add('default', () => <LetterFf32 />)
  .add('with accessibility label', () => (
    <LetterFf32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LetterFf32 focusable>
      <title>Icon title</title>
    </LetterFf32>
  ));
