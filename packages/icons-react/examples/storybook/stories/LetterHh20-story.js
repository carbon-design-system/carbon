import React from 'react';
import { storiesOf } from '@storybook/react';
import LetterHh20 from '../../../es/letter--Hh/20.js';

storiesOf('LetterHh20', module)
  .add('default', () => <LetterHh20 />)
  .add('with accessibility label', () => (
    <LetterHh20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LetterHh20 aria-label="Icon label">
      <title>Icon title</title>
    </LetterHh20>
  ));
