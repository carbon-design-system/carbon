import React from 'react';
import { storiesOf } from '@storybook/react';
import LetterHh24 from '../../../es/letter--Hh/24.js';

storiesOf('LetterHh24', module)
  .add('default', () => <LetterHh24 />)
  .add('with accessibility label', () => (
    <LetterHh24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LetterHh24 aria-label="Icon label">
      <title>Icon title</title>
    </LetterHh24>
  ));
