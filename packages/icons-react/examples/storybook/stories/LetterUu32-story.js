import React from 'react';
import { storiesOf } from '@storybook/react';
import LetterUu32 from '../../../es/letter--Uu/32.js';

storiesOf('LetterUu32', module)
  .add('default', () => <LetterUu32 />)
  .add('with accessibility label', () => (
    <LetterUu32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LetterUu32 aria-label="Icon label">
      <title>Icon title</title>
    </LetterUu32>
  ));
