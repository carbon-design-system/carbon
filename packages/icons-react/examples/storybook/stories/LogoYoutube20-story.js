import React from 'react';
import { storiesOf } from '@storybook/react';
import LogoYoutube20 from '../../../es/logo--youtube/20.js';

storiesOf('LogoYoutube20', module)
  .add('default', () => <LogoYoutube20 />)
  .add('with accessibility label', () => (
    <LogoYoutube20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LogoYoutube20 aria-label="Icon label">
      <title>Icon title</title>
    </LogoYoutube20>
  ));
