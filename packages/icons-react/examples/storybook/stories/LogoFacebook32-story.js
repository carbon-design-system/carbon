import React from 'react';
import { storiesOf } from '@storybook/react';
import LogoFacebook32 from '../../../lib/logo--facebook/32';

storiesOf('LogoFacebook32', module)
  .add('default', () => <LogoFacebook32 />)
  .add('with accessibility label', () => (
    <LogoFacebook32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LogoFacebook32 focusable>
      <title>Icon title</title>
    </LogoFacebook32>
  ));
