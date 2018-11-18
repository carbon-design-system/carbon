import React from 'react';
import { storiesOf } from '@storybook/react';
import LetterNn24 from '../../../es/letter--Nn/24.js';

storiesOf('LetterNn24', module)
  .add('default', () => <LetterNn24 />)
  .add('with accessibility label', () => (
    <LetterNn24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LetterNn24 aria-label="Icon label">
      <title>Icon title</title>
    </LetterNn24>
  ));
