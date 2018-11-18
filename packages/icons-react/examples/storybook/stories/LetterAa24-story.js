import React from 'react';
import { storiesOf } from '@storybook/react';
import LetterAa24 from '../../../es/letter--Aa/24.js';

storiesOf('LetterAa24', module)
  .add('default', () => <LetterAa24 />)
  .add('with accessibility label', () => (
    <LetterAa24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LetterAa24 aria-label="Icon label">
      <title>Icon title</title>
    </LetterAa24>
  ));
