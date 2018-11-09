import React from 'react';
import { storiesOf } from '@storybook/react';
import LogoSlack32 from '../../../lib/LogoSlack/32';

storiesOf('LogoSlack32', module)
  .add('default', () => <LogoSlack32 />)
  .add('with accessibility label', () => (
    <LogoSlack32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LogoSlack32 focusable>
      <title>Icon title</title>
    </LogoSlack32>
  ));
