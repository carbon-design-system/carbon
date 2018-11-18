import React from 'react';
import { storiesOf } from '@storybook/react';
import LetterAa20 from '../../../es/letter--Aa/20.js';

storiesOf('LetterAa20', module)
  .add('default', () => <LetterAa20 />)
  .add('with accessibility label', () => (
    <LetterAa20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LetterAa20 aria-label="Icon label">
      <title>Icon title</title>
    </LetterAa20>
  ));
