import React from 'react';
import { storiesOf } from '@storybook/react';
import LetterYy24 from '../../../es/letter--Yy/24.js';

storiesOf('LetterYy24', module)
  .add('default', () => <LetterYy24 />)
  .add('with accessibility label', () => (
    <LetterYy24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LetterYy24 aria-label="Icon label">
      <title>Icon title</title>
    </LetterYy24>
  ));
