import React from 'react';
import { storiesOf } from '@storybook/react';
import LogoLivestream20 from '../../../es/logo--livestream/20.js';

storiesOf('LogoLivestream20', module)
  .add('default', () => <LogoLivestream20 />)
  .add('with accessibility label', () => (
    <LogoLivestream20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LogoLivestream20 aria-label="Icon label">
      <title>Icon title</title>
    </LogoLivestream20>
  ));
