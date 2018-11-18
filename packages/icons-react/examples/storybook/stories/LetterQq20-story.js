import React from 'react';
import { storiesOf } from '@storybook/react';
import LetterQq20 from '../../../es/letter--Qq/20.js';

storiesOf('LetterQq20', module)
  .add('default', () => <LetterQq20 />)
  .add('with accessibility label', () => (
    <LetterQq20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LetterQq20 aria-label="Icon label">
      <title>Icon title</title>
    </LetterQq20>
  ));
