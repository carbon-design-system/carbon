import React from 'react';
import { storiesOf } from '@storybook/react';
import LetterWw20 from '../../../es/letter--Ww/20.js';

storiesOf('LetterWw20', module)
  .add('default', () => <LetterWw20 />)
  .add('with accessibility label', () => (
    <LetterWw20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LetterWw20 aria-label="Icon label">
      <title>Icon title</title>
    </LetterWw20>
  ));
