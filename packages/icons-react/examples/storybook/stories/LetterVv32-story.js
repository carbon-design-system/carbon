import React from 'react';
import { storiesOf } from '@storybook/react';
import LetterVv32 from '../../../lib/letter--Vv/32';

storiesOf('LetterVv32', module)
  .add('default', () => <LetterVv32 />)
  .add('with accessibility label', () => (
    <LetterVv32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LetterVv32 focusable>
      <title>Icon title</title>
    </LetterVv32>
  ));
