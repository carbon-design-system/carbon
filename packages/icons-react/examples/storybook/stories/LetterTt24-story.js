import React from 'react';
import { storiesOf } from '@storybook/react';
import LetterTt24 from '../../../es/letter--Tt/24.js';

storiesOf('LetterTt24', module)
  .add('default', () => <LetterTt24 />)
  .add('with accessibility label', () => (
    <LetterTt24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LetterTt24 aria-label="Icon label">
      <title>Icon title</title>
    </LetterTt24>
  ));
