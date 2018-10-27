import React from 'react';
import { storiesOf } from '@storybook/react';
import LogoDelicious32 from '../../../lib/logo--delicious/32';

storiesOf('LogoDelicious32', module)
  .add('default', () => <LogoDelicious32 />)
  .add('with accessibility label', () => (
    <LogoDelicious32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LogoDelicious32 focusable>
      <title>Icon title</title>
    </LogoDelicious32>
  ));
