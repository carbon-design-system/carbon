import React from 'react';
import { storiesOf } from '@storybook/react';
import LogoTwitter32 from '../../../lib/logo--twitter/32';

storiesOf('LogoTwitter32', module)
  .add('default', () => <LogoTwitter32 />)
  .add('with accessibility label', () => (
    <LogoTwitter32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LogoTwitter32 focusable>
      <title>Icon title</title>
    </LogoTwitter32>
  ));
