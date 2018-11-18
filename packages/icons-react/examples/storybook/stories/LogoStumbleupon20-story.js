import React from 'react';
import { storiesOf } from '@storybook/react';
import LogoStumbleupon20 from '../../../es/logo--stumbleupon/20.js';

storiesOf('LogoStumbleupon20', module)
  .add('default', () => <LogoStumbleupon20 />)
  .add('with accessibility label', () => (
    <LogoStumbleupon20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LogoStumbleupon20 aria-label="Icon label">
      <title>Icon title</title>
    </LogoStumbleupon20>
  ));
