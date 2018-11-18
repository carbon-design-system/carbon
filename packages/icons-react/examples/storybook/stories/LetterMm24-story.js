import React from 'react';
import { storiesOf } from '@storybook/react';
import LetterMm24 from '../../../es/letter--Mm/24.js';

storiesOf('LetterMm24', module)
  .add('default', () => <LetterMm24 />)
  .add('with accessibility label', () => (
    <LetterMm24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LetterMm24 aria-label="Icon label">
      <title>Icon title</title>
    </LetterMm24>
  ));
