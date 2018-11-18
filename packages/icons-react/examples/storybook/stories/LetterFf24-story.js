import React from 'react';
import { storiesOf } from '@storybook/react';
import LetterFf24 from '../../../es/letter--Ff/24.js';

storiesOf('LetterFf24', module)
  .add('default', () => <LetterFf24 />)
  .add('with accessibility label', () => (
    <LetterFf24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LetterFf24 aria-label="Icon label">
      <title>Icon title</title>
    </LetterFf24>
  ));
