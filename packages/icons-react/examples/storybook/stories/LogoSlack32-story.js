import React from 'react';
import { storiesOf } from '@storybook/react';
import LogoSlack32 from '../../../es/logo--slack/32.js';

storiesOf('LogoSlack32', module)
  .add('default', () => <LogoSlack32 />)
  .add('with accessibility label', () => (
    <LogoSlack32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LogoSlack32 aria-label="Icon label">
      <title>Icon title</title>
    </LogoSlack32>
  ));
