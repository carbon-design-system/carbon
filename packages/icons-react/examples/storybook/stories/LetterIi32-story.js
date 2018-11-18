import React from 'react';
import { storiesOf } from '@storybook/react';
import LetterIi32 from '../../../es/letter--Ii/32.js';

storiesOf('LetterIi32', module)
  .add('default', () => <LetterIi32 />)
  .add('with accessibility label', () => (
    <LetterIi32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LetterIi32 aria-label="Icon label">
      <title>Icon title</title>
    </LetterIi32>
  ));
