import React from 'react';
import { storiesOf } from '@storybook/react';
import LogoYoutube24 from '../../../es/logo--youtube/24.js';

storiesOf('LogoYoutube24', module)
  .add('default', () => <LogoYoutube24 />)
  .add('with accessibility label', () => (
    <LogoYoutube24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LogoYoutube24 aria-label="Icon label">
      <title>Icon title</title>
    </LogoYoutube24>
  ));
