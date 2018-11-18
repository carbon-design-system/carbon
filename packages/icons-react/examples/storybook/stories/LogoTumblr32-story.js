import React from 'react';
import { storiesOf } from '@storybook/react';
import LogoTumblr32 from '../../../es/logo--tumblr/32.js';

storiesOf('LogoTumblr32', module)
  .add('default', () => <LogoTumblr32 />)
  .add('with accessibility label', () => (
    <LogoTumblr32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LogoTumblr32 aria-label="Icon label">
      <title>Icon title</title>
    </LogoTumblr32>
  ));
