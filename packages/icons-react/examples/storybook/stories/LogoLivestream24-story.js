import React from 'react';
import { storiesOf } from '@storybook/react';
import LogoLivestream24 from '../../../es/logo--livestream/24.js';

storiesOf('LogoLivestream24', module)
  .add('default', () => <LogoLivestream24 />)
  .add('with accessibility label', () => (
    <LogoLivestream24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LogoLivestream24 aria-label="Icon label">
      <title>Icon title</title>
    </LogoLivestream24>
  ));
