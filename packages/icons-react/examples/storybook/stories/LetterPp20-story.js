import React from 'react';
import { storiesOf } from '@storybook/react';
import LetterPp20 from '../../../es/letter--Pp/20.js';

storiesOf('LetterPp20', module)
  .add('default', () => <LetterPp20 />)
  .add('with accessibility label', () => (
    <LetterPp20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LetterPp20 aria-label="Icon label">
      <title>Icon title</title>
    </LetterPp20>
  ));
