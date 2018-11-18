import React from 'react';
import { storiesOf } from '@storybook/react';
import LetterIi20 from '../../../es/letter--Ii/20.js';

storiesOf('LetterIi20', module)
  .add('default', () => <LetterIi20 />)
  .add('with accessibility label', () => (
    <LetterIi20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LetterIi20 aria-label="Icon label">
      <title>Icon title</title>
    </LetterIi20>
  ));
