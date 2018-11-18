import React from 'react';
import { storiesOf } from '@storybook/react';
import LetterZz20 from '../../../es/letter--Zz/20.js';

storiesOf('LetterZz20', module)
  .add('default', () => <LetterZz20 />)
  .add('with accessibility label', () => (
    <LetterZz20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LetterZz20 aria-label="Icon label">
      <title>Icon title</title>
    </LetterZz20>
  ));
