import React from 'react';
import { storiesOf } from '@storybook/react';
import LogoQuora20 from '../../../es/logo--quora/20.js';

storiesOf('LogoQuora20', module)
  .add('default', () => <LogoQuora20 />)
  .add('with accessibility label', () => (
    <LogoQuora20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LogoQuora20 aria-label="Icon label">
      <title>Icon title</title>
    </LogoQuora20>
  ));
