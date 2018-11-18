import React from 'react';
import { storiesOf } from '@storybook/react';
import LetterGg24 from '../../../es/letter--Gg/24.js';

storiesOf('LetterGg24', module)
  .add('default', () => <LetterGg24 />)
  .add('with accessibility label', () => (
    <LetterGg24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LetterGg24 aria-label="Icon label">
      <title>Icon title</title>
    </LetterGg24>
  ));
