import React from 'react';
import { storiesOf } from '@storybook/react';
import LetterPp32 from '../../../lib/letter--Pp/32';

storiesOf('LetterPp32', module)
  .add('default', () => <LetterPp32 />)
  .add('with accessibility label', () => (
    <LetterPp32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LetterPp32 focusable>
      <title>Icon title</title>
    </LetterPp32>
  ));
