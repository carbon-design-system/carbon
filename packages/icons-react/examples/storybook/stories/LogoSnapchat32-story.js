import React from 'react';
import { storiesOf } from '@storybook/react';
import LogoSnapchat32 from '../../../es/logo--snapchat/32.js';

storiesOf('LogoSnapchat32', module)
  .add('default', () => <LogoSnapchat32 />)
  .add('with accessibility label', () => (
    <LogoSnapchat32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LogoSnapchat32 aria-label="Icon label">
      <title>Icon title</title>
    </LogoSnapchat32>
  ));
