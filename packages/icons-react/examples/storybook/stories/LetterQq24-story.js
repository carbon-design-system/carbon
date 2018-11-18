import React from 'react';
import { storiesOf } from '@storybook/react';
import LetterQq24 from '../../../es/letter--Qq/24.js';

storiesOf('LetterQq24', module)
  .add('default', () => <LetterQq24 />)
  .add('with accessibility label', () => (
    <LetterQq24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LetterQq24 aria-label="Icon label">
      <title>Icon title</title>
    </LetterQq24>
  ));
