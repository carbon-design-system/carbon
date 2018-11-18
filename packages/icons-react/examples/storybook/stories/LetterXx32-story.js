import React from 'react';
import { storiesOf } from '@storybook/react';
import LetterXx32 from '../../../es/letter--Xx/32.js';

storiesOf('LetterXx32', module)
  .add('default', () => <LetterXx32 />)
  .add('with accessibility label', () => (
    <LetterXx32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LetterXx32 aria-label="Icon label">
      <title>Icon title</title>
    </LetterXx32>
  ));
