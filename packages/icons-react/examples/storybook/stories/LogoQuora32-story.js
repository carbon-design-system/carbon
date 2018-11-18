import React from 'react';
import { storiesOf } from '@storybook/react';
import LogoQuora32 from '../../../es/logo--quora/32.js';

storiesOf('LogoQuora32', module)
  .add('default', () => <LogoQuora32 />)
  .add('with accessibility label', () => (
    <LogoQuora32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LogoQuora32 aria-label="Icon label">
      <title>Icon title</title>
    </LogoQuora32>
  ));
