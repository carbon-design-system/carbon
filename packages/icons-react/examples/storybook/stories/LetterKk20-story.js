import React from 'react';
import { storiesOf } from '@storybook/react';
import LetterKk20 from '../../../es/letter--Kk/20.js';

storiesOf('LetterKk20', module)
  .add('default', () => <LetterKk20 />)
  .add('with accessibility label', () => (
    <LetterKk20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LetterKk20 aria-label="Icon label">
      <title>Icon title</title>
    </LetterKk20>
  ));
