import React from 'react';
import { storiesOf } from '@storybook/react';
import LogoQuora24 from '../../../es/logo--quora/24.js';

storiesOf('LogoQuora24', module)
  .add('default', () => <LogoQuora24 />)
  .add('with accessibility label', () => (
    <LogoQuora24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LogoQuora24 aria-label="Icon label">
      <title>Icon title</title>
    </LogoQuora24>
  ));
