import React from 'react';
import { storiesOf } from '@storybook/react';
import LetterIi32 from '../../../lib/letter--Ii/32';

storiesOf('LetterIi32', module)
  .add('default', () => <LetterIi32 />)
  .add('with accessibility label', () => (
    <LetterIi32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LetterIi32 focusable>
      <title>Icon title</title>
    </LetterIi32>
  ));
