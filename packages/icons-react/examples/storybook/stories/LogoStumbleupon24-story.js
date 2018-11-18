import React from 'react';
import { storiesOf } from '@storybook/react';
import LogoStumbleupon24 from '../../../es/logo--stumbleupon/24.js';

storiesOf('LogoStumbleupon24', module)
  .add('default', () => <LogoStumbleupon24 />)
  .add('with accessibility label', () => (
    <LogoStumbleupon24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LogoStumbleupon24 aria-label="Icon label">
      <title>Icon title</title>
    </LogoStumbleupon24>
  ));
