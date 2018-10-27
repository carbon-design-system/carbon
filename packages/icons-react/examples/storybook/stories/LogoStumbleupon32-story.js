import React from 'react';
import { storiesOf } from '@storybook/react';
import LogoStumbleupon32 from '../../../lib/logo--stumbleupon/32';

storiesOf('LogoStumbleupon32', module)
  .add('default', () => <LogoStumbleupon32 />)
  .add('with accessibility label', () => (
    <LogoStumbleupon32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LogoStumbleupon32 focusable>
      <title>Icon title</title>
    </LogoStumbleupon32>
  ));
