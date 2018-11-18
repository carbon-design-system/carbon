import React from 'react';
import { storiesOf } from '@storybook/react';
import LetterCc24 from '../../../es/letter--Cc/24.js';

storiesOf('LetterCc24', module)
  .add('default', () => <LetterCc24 />)
  .add('with accessibility label', () => (
    <LetterCc24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LetterCc24 aria-label="Icon label">
      <title>Icon title</title>
    </LetterCc24>
  ));
