import React from 'react';
import { storiesOf } from '@storybook/react';
import LetterSs20 from '../../../es/letter--Ss/20.js';

storiesOf('LetterSs20', module)
  .add('default', () => <LetterSs20 />)
  .add('with accessibility label', () => (
    <LetterSs20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LetterSs20 aria-label="Icon label">
      <title>Icon title</title>
    </LetterSs20>
  ));
