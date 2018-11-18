import React from 'react';
import { storiesOf } from '@storybook/react';
import LogoXing24 from '../../../es/logo--xing/24.js';

storiesOf('LogoXing24', module)
  .add('default', () => <LogoXing24 />)
  .add('with accessibility label', () => (
    <LogoXing24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LogoXing24 aria-label="Icon label">
      <title>Icon title</title>
    </LogoXing24>
  ));
