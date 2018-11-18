import React from 'react';
import { storiesOf } from '@storybook/react';
import LetterVv24 from '../../../es/letter--Vv/24.js';

storiesOf('LetterVv24', module)
  .add('default', () => <LetterVv24 />)
  .add('with accessibility label', () => (
    <LetterVv24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LetterVv24 aria-label="Icon label">
      <title>Icon title</title>
    </LetterVv24>
  ));
