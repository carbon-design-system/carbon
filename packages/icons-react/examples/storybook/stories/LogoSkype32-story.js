import React from 'react';
import { storiesOf } from '@storybook/react';
import LogoSkype32 from '../../../lib/logo--skype/32';

storiesOf('LogoSkype32', module)
  .add('default', () => <LogoSkype32 />)
  .add('with accessibility label', () => (
    <LogoSkype32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LogoSkype32 focusable>
      <title>Icon title</title>
    </LogoSkype32>
  ));
