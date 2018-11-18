import React from 'react';
import { storiesOf } from '@storybook/react';
import LogoTumblr20 from '../../../es/logo--tumblr/20.js';

storiesOf('LogoTumblr20', module)
  .add('default', () => <LogoTumblr20 />)
  .add('with accessibility label', () => (
    <LogoTumblr20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LogoTumblr20 aria-label="Icon label">
      <title>Icon title</title>
    </LogoTumblr20>
  ));
