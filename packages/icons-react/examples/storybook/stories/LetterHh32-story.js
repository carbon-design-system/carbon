import React from 'react';
import { storiesOf } from '@storybook/react';
import LetterHh32 from '../../../es/letter--Hh/32.js';

storiesOf('LetterHh32', module)
  .add('default', () => <LetterHh32 />)
  .add('with accessibility label', () => (
    <LetterHh32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LetterHh32 aria-label="Icon label">
      <title>Icon title</title>
    </LetterHh32>
  ));
