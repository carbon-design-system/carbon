import React from 'react';
import { storiesOf } from '@storybook/react';
import LogoXing32 from '../../../lib/logo--xing/32';

storiesOf('LogoXing32', module)
  .add('default', () => <LogoXing32 />)
  .add('with accessibility label', () => (
    <LogoXing32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LogoXing32 focusable>
      <title>Icon title</title>
    </LogoXing32>
  ));
