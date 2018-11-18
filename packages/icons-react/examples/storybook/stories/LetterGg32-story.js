import React from 'react';
import { storiesOf } from '@storybook/react';
import LetterGg32 from '../../../es/letter--Gg/32.js';

storiesOf('LetterGg32', module)
  .add('default', () => <LetterGg32 />)
  .add('with accessibility label', () => (
    <LetterGg32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LetterGg32 aria-label="Icon label">
      <title>Icon title</title>
    </LetterGg32>
  ));
