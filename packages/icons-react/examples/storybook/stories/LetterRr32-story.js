import React from 'react';
import { storiesOf } from '@storybook/react';
import LetterRr32 from '../../../lib/letter--Rr/32';

storiesOf('LetterRr32', module)
  .add('default', () => <LetterRr32 />)
  .add('with accessibility label', () => (
    <LetterRr32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LetterRr32 focusable>
      <title>Icon title</title>
    </LetterRr32>
  ));
