import React from 'react';
import { storiesOf } from '@storybook/react';
import LetterWw32 from '../../../lib/letter--Ww/32';

storiesOf('LetterWw32', module)
  .add('default', () => <LetterWw32 />)
  .add('with accessibility label', () => (
    <LetterWw32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LetterWw32 focusable>
      <title>Icon title</title>
    </LetterWw32>
  ));
