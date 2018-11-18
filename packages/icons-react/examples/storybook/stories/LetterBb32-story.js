import React from 'react';
import { storiesOf } from '@storybook/react';
import LetterBb32 from '../../../es/letter--Bb/32.js';

storiesOf('LetterBb32', module)
  .add('default', () => <LetterBb32 />)
  .add('with accessibility label', () => (
    <LetterBb32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LetterBb32 aria-label="Icon label">
      <title>Icon title</title>
    </LetterBb32>
  ));
