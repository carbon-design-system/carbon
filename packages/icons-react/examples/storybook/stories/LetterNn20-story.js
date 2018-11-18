import React from 'react';
import { storiesOf } from '@storybook/react';
import LetterNn20 from '../../../es/letter--Nn/20.js';

storiesOf('LetterNn20', module)
  .add('default', () => <LetterNn20 />)
  .add('with accessibility label', () => (
    <LetterNn20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LetterNn20 aria-label="Icon label">
      <title>Icon title</title>
    </LetterNn20>
  ));
