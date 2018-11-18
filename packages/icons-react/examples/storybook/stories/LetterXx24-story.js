import React from 'react';
import { storiesOf } from '@storybook/react';
import LetterXx24 from '../../../es/letter--Xx/24.js';

storiesOf('LetterXx24', module)
  .add('default', () => <LetterXx24 />)
  .add('with accessibility label', () => (
    <LetterXx24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LetterXx24 aria-label="Icon label">
      <title>Icon title</title>
    </LetterXx24>
  ));
