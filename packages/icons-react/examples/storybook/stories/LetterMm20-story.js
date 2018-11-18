import React from 'react';
import { storiesOf } from '@storybook/react';
import LetterMm20 from '../../../es/letter--Mm/20.js';

storiesOf('LetterMm20', module)
  .add('default', () => <LetterMm20 />)
  .add('with accessibility label', () => (
    <LetterMm20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LetterMm20 aria-label="Icon label">
      <title>Icon title</title>
    </LetterMm20>
  ));
