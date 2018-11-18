import React from 'react';
import { storiesOf } from '@storybook/react';
import LogoSlack20 from '../../../es/logo--slack/20.js';

storiesOf('LogoSlack20', module)
  .add('default', () => <LogoSlack20 />)
  .add('with accessibility label', () => (
    <LogoSlack20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LogoSlack20 aria-label="Icon label">
      <title>Icon title</title>
    </LogoSlack20>
  ));
