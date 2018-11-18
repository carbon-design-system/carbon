import React from 'react';
import { storiesOf } from '@storybook/react';
import LetterKk24 from '../../../es/letter--Kk/24.js';

storiesOf('LetterKk24', module)
  .add('default', () => <LetterKk24 />)
  .add('with accessibility label', () => (
    <LetterKk24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LetterKk24 aria-label="Icon label">
      <title>Icon title</title>
    </LetterKk24>
  ));
