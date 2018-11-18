import React from 'react';
import { storiesOf } from '@storybook/react';
import LetterKk32 from '../../../es/letter--Kk/32.js';

storiesOf('LetterKk32', module)
  .add('default', () => <LetterKk32 />)
  .add('with accessibility label', () => (
    <LetterKk32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LetterKk32 aria-label="Icon label">
      <title>Icon title</title>
    </LetterKk32>
  ));
