import React from 'react';
import { storiesOf } from '@storybook/react';
import LetterOo24 from '../../../es/letter--Oo/24.js';

storiesOf('LetterOo24', module)
  .add('default', () => <LetterOo24 />)
  .add('with accessibility label', () => (
    <LetterOo24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LetterOo24 aria-label="Icon label">
      <title>Icon title</title>
    </LetterOo24>
  ));
