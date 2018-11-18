import React from 'react';
import { storiesOf } from '@storybook/react';
import LogoTumblr24 from '../../../es/logo--tumblr/24.js';

storiesOf('LogoTumblr24', module)
  .add('default', () => <LogoTumblr24 />)
  .add('with accessibility label', () => (
    <LogoTumblr24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LogoTumblr24 aria-label="Icon label">
      <title>Icon title</title>
    </LogoTumblr24>
  ));
