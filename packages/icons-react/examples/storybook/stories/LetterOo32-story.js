import React from 'react';
import { storiesOf } from '@storybook/react';
import LetterOo32 from '../../../es/letter--Oo/32.js';

storiesOf('LetterOo32', module)
  .add('default', () => <LetterOo32 />)
  .add('with accessibility label', () => (
    <LetterOo32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LetterOo32 aria-label="Icon label">
      <title>Icon title</title>
    </LetterOo32>
  ));
