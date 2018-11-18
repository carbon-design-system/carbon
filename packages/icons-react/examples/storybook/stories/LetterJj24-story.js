import React from 'react';
import { storiesOf } from '@storybook/react';
import LetterJj24 from '../../../es/letter--Jj/24.js';

storiesOf('LetterJj24', module)
  .add('default', () => <LetterJj24 />)
  .add('with accessibility label', () => (
    <LetterJj24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LetterJj24 aria-label="Icon label">
      <title>Icon title</title>
    </LetterJj24>
  ));
