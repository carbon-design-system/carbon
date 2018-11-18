import React from 'react';
import { storiesOf } from '@storybook/react';
import LetterGg20 from '../../../es/letter--Gg/20.js';

storiesOf('LetterGg20', module)
  .add('default', () => <LetterGg20 />)
  .add('with accessibility label', () => (
    <LetterGg20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LetterGg20 aria-label="Icon label">
      <title>Icon title</title>
    </LetterGg20>
  ));
