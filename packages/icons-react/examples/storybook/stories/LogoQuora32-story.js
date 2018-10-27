import React from 'react';
import { storiesOf } from '@storybook/react';
import LogoQuora32 from '../../../lib/logo--quora/32';

storiesOf('LogoQuora32', module)
  .add('default', () => <LogoQuora32 />)
  .add('with accessibility label', () => (
    <LogoQuora32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LogoQuora32 focusable>
      <title>Icon title</title>
    </LogoQuora32>
  ));
