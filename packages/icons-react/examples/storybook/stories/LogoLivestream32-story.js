import React from 'react';
import { storiesOf } from '@storybook/react';
import LogoLivestream32 from '../../../lib/LogoLivestream/32';

storiesOf('LogoLivestream32', module)
  .add('default', () => <LogoLivestream32 />)
  .add('with accessibility label', () => (
    <LogoLivestream32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LogoLivestream32 focusable>
      <title>Icon title</title>
    </LogoLivestream32>
  ));
