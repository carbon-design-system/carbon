import React from 'react';
import { storiesOf } from '@storybook/react';
import LetterQq32 from '../../../es/letter--Qq/32.js';

storiesOf('LetterQq32', module)
  .add('default', () => <LetterQq32 />)
  .add('with accessibility label', () => (
    <LetterQq32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LetterQq32 aria-label="Icon label">
      <title>Icon title</title>
    </LetterQq32>
  ));
