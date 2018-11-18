import React from 'react';
import { storiesOf } from '@storybook/react';
import LetterPp24 from '../../../es/letter--Pp/24.js';

storiesOf('LetterPp24', module)
  .add('default', () => <LetterPp24 />)
  .add('with accessibility label', () => (
    <LetterPp24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LetterPp24 aria-label="Icon label">
      <title>Icon title</title>
    </LetterPp24>
  ));
