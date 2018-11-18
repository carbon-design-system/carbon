import React from 'react';
import { storiesOf } from '@storybook/react';
import LetterOo20 from '../../../es/letter--Oo/20.js';

storiesOf('LetterOo20', module)
  .add('default', () => <LetterOo20 />)
  .add('with accessibility label', () => (
    <LetterOo20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LetterOo20 aria-label="Icon label">
      <title>Icon title</title>
    </LetterOo20>
  ));
