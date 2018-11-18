import React from 'react';
import { storiesOf } from '@storybook/react';
import LogoSnapchat20 from '../../../es/logo--snapchat/20.js';

storiesOf('LogoSnapchat20', module)
  .add('default', () => <LogoSnapchat20 />)
  .add('with accessibility label', () => (
    <LogoSnapchat20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LogoSnapchat20 aria-label="Icon label">
      <title>Icon title</title>
    </LogoSnapchat20>
  ));
