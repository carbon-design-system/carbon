import React from 'react';
import { storiesOf } from '@storybook/react';
import LetterTt32 from '../../../es/letter--Tt/32.js';

storiesOf('LetterTt32', module)
  .add('default', () => <LetterTt32 />)
  .add('with accessibility label', () => (
    <LetterTt32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LetterTt32 aria-label="Icon label">
      <title>Icon title</title>
    </LetterTt32>
  ));
