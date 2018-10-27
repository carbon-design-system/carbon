import React from 'react';
import { storiesOf } from '@storybook/react';
import SpellCheck32 from '../../../lib/spell-check/32';

storiesOf('SpellCheck32', module)
  .add('default', () => <SpellCheck32 />)
  .add('with accessibility label', () => (
    <SpellCheck32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <SpellCheck32 focusable>
      <title>Icon title</title>
    </SpellCheck32>
  ));
