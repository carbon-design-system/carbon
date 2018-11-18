import React from 'react';
import { storiesOf } from '@storybook/react';
import LetterYy20 from '../../../es/letter--Yy/20.js';

storiesOf('LetterYy20', module)
  .add('default', () => <LetterYy20 />)
  .add('with accessibility label', () => (
    <LetterYy20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LetterYy20 aria-label="Icon label">
      <title>Icon title</title>
    </LetterYy20>
  ));
