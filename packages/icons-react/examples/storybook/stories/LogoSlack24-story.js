import React from 'react';
import { storiesOf } from '@storybook/react';
import LogoSlack24 from '../../../es/logo--slack/24.js';

storiesOf('LogoSlack24', module)
  .add('default', () => <LogoSlack24 />)
  .add('with accessibility label', () => (
    <LogoSlack24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LogoSlack24 aria-label="Icon label">
      <title>Icon title</title>
    </LogoSlack24>
  ));
