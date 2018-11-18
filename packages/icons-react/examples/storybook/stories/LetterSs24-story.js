import React from 'react';
import { storiesOf } from '@storybook/react';
import LetterSs24 from '../../../es/letter--Ss/24.js';

storiesOf('LetterSs24', module)
  .add('default', () => <LetterSs24 />)
  .add('with accessibility label', () => (
    <LetterSs24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LetterSs24 aria-label="Icon label">
      <title>Icon title</title>
    </LetterSs24>
  ));
