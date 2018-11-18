import React from 'react';
import { storiesOf } from '@storybook/react';
import LetterYy32 from '../../../es/letter--Yy/32.js';

storiesOf('LetterYy32', module)
  .add('default', () => <LetterYy32 />)
  .add('with accessibility label', () => (
    <LetterYy32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LetterYy32 aria-label="Icon label">
      <title>Icon title</title>
    </LetterYy32>
  ));
