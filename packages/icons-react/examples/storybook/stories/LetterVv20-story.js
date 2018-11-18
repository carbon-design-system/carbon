import React from 'react';
import { storiesOf } from '@storybook/react';
import LetterVv20 from '../../../es/letter--Vv/20.js';

storiesOf('LetterVv20', module)
  .add('default', () => <LetterVv20 />)
  .add('with accessibility label', () => (
    <LetterVv20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LetterVv20 aria-label="Icon label">
      <title>Icon title</title>
    </LetterVv20>
  ));
