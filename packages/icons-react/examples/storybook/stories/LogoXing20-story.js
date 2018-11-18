import React from 'react';
import { storiesOf } from '@storybook/react';
import LogoXing20 from '../../../es/logo--xing/20.js';

storiesOf('LogoXing20', module)
  .add('default', () => <LogoXing20 />)
  .add('with accessibility label', () => (
    <LogoXing20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LogoXing20 aria-label="Icon label">
      <title>Icon title</title>
    </LogoXing20>
  ));
