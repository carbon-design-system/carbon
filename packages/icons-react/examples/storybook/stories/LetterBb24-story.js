import React from 'react';
import { storiesOf } from '@storybook/react';
import LetterBb24 from '../../../es/letter--Bb/24.js';

storiesOf('LetterBb24', module)
  .add('default', () => <LetterBb24 />)
  .add('with accessibility label', () => (
    <LetterBb24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LetterBb24 aria-label="Icon label">
      <title>Icon title</title>
    </LetterBb24>
  ));
