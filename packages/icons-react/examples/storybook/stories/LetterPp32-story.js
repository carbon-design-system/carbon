import React from 'react';
import { storiesOf } from '@storybook/react';
import LetterPp32 from '../../../es/letter--Pp/32.js';

storiesOf('LetterPp32', module)
  .add('default', () => <LetterPp32 />)
  .add('with accessibility label', () => (
    <LetterPp32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LetterPp32 aria-label="Icon label">
      <title>Icon title</title>
    </LetterPp32>
  ));
