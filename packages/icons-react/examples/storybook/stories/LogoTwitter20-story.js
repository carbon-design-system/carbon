import React from 'react';
import { storiesOf } from '@storybook/react';
import LogoTwitter20 from '../../../es/logo--twitter/20.js';

storiesOf('LogoTwitter20', module)
  .add('default', () => <LogoTwitter20 />)
  .add('with accessibility label', () => (
    <LogoTwitter20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LogoTwitter20 aria-label="Icon label">
      <title>Icon title</title>
    </LogoTwitter20>
  ));
