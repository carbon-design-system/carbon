import React from 'react';
import { storiesOf } from '@storybook/react';
import LogoStumbleupon32 from '../../../es/logo--stumbleupon/32.js';

storiesOf('LogoStumbleupon32', module)
  .add('default', () => <LogoStumbleupon32 />)
  .add('with accessibility label', () => (
    <LogoStumbleupon32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LogoStumbleupon32 aria-label="Icon label">
      <title>Icon title</title>
    </LogoStumbleupon32>
  ));
